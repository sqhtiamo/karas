import css from '../style/css';
import unit from '../style/unit';
import util from '../util/util';
import inject from '../util/inject';
import Event from '../util/Event';
import frame from './frame';
import easing from './easing';
import level from './level';
import repaint from './repaint';

const KEY_COLOR = [
  'backgroundColor',
  'borderBottomColor',
  'borderLeftColor',
  'borderRightColor',
  'borderTopColor',
  'color',
  'fill',
  'stroke'
];

const KEY_LENGTH = [
  'fontSize',
  'borderBottomWidth',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'bottom',
  'left',
  'right',
  'top',
  'flexBasis',
  'width',
  'height',
  'lineHeight',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'strokeWidth'
];

const COLOR_HASH = {};
KEY_COLOR.forEach(k => {
  COLOR_HASH[k] = true;
});

const LENGTH_HASH = {};
KEY_LENGTH.forEach(k => {
  LENGTH_HASH[k] = true;
});

// css模式rgb和init的颜色转换为rgba数组，方便加减运算
function color2array(style) {
  KEY_COLOR.forEach(k => {
    if(!style.hasOwnProperty(k)) {
      return;
    }
    style[k] = util.rgb2int(style[k]);
  });
  let bgi = style.backgroundImage;
  if(bgi) {
    bgi.v.forEach(item => {
      item[0] = util.rgb2int(item[0]);
    });
  }
}

function equalStyle(k, a, b) {
  if(k === 'transform') {
    if(a.length !== b.length) {
      return false;
    }
    for(let i = 0, len = a.length; i < len; i++) {
      let k1 = a[i][0];
      let k2 = b[i][0];
      if(k1 !== k2) {
        return false;
      }
      else {
        let v1 = a[i][1];
        let v2 = b[i][1];
        if(k1 === 'matrix') {
          if(v1[0] !== v2[0]
            || v1[1] !== v2[1]
            || v1[2] !== v2[2]
            || v1[3] !== v2[3]
            || v1[4] !== v2[4]
            || v1[5] !== v2[5]) {
            return false;
          }
        }
        else if(v1.value !== v2.value || v1.unit !== v2.unit) {
          return false;
        }
      }
    }
    return true;
  }
  else if(LENGTH_HASH.hasOwnProperty(k)) {
    return a.value === b.value && a.unit === b.unit;
  }
  else if(repaint.GEOM.hasOwnProperty(k)) {
    if(k === 'points' || k === 'controls') {
      if(a.length !== b.length) {
        return false;
      }
      for(let i = 0, len = a.length; i < len; i++) {
        if(a[i] === b[i]) {
          continue;
        }
        if(a[i][0] !== b[i][0] || a[i][1] !== b[i][1]) {
          return false;
        }
      }
      return true;
    }
    else if(k === 'controlA' || k === 'controlB') {
      if(a.length !== b.length) {
        return false;
      }
      return a[0] === b[0] && a[1] === b[1];
    }
  }
  return a === b;
}

// 反向将颜色数组转换为css模式，同时计算target及其孩子的computedStyle
function stringify(style, lastStyle, target) {
  if(lastStyle) {
    let res = false;
    for(let i in style) {
      if(style.hasOwnProperty(i) && lastStyle.hasOwnProperty(i)) {
        if(!equalStyle(i, style[i], lastStyle[i])) {
          res = true;
          break;
        }
      }
      // 不同的属性说明要更新提前跳出
      else if(style.hasOwnProperty(i) || lastStyle.hasOwnProperty(i)) {
        res = true;
        break;
      }
    }
    // 防止last有style没有
    for(let i in lastStyle) {
      if(lastStyle.hasOwnProperty(i) && !style.hasOwnProperty(i)) {
        res = true;
        break;
      }
    }
    if(!res) {
      return false;
    }
  }
  let animateStyle = target.animateStyle;
  for(let i in style) {
    if(style.hasOwnProperty(i)) {
      if(repaint.GEOM.hasOwnProperty(i)) {
        target['__' + i] = style[i];
      }
      else if(COLOR_HASH.hasOwnProperty(i)) {
        let v = style[i];
        if(v[3] === 1) {
          animateStyle[i] = `rgb(${v[0]},${v[1]},${v[2]})`;
        }
        else {
          animateStyle[i] = `rgba(${v[0]},${v[1]},${v[2]},${v[3]})`;
        }
      }
      else if(i === 'backgroundImage') {
        let v = style[i];
        animateStyle[i] = {
          k: v.k,
          v: v.v.map(item => {
            let arr = [];
            let c = item[0];
            if(c[3] === 1) {
              arr.push(`rgb(${c[0]},${c[1]},${c[2]})`);
            }
            else {
              arr.push(`rgba(${c[0]},${c[1]},${c[2]},${c[3]})`);
            }
            if(item[1]) {
              arr.push(util.clone(item[1]));
            }
            return arr;
          }),
          d: v.d,
        };
      }
      else {
        animateStyle[i] = style[i];
      }
    }
  }
  return true;
}

// 将变化写的样式格式化，提取出offset属性，提取出变化的key，初始化变化过程的存储
function framing(current) {
  let keys = [];
  let st = {};
  for(let i in current) {
    if(current.hasOwnProperty(i) && !{
      offset: true,
      easing: true,
    }.hasOwnProperty(i)) {
      keys.push(i);
      st[i] = current[i];
    }
  }
  return {
    style: st,
    offset: current.offset,
    easing: current.easing,
    keys,
    transition: [],
  };
}

// 计算两帧之间的差，必须都含有某个属性，单位不同的以后面为准
function calDiff(prev, next, k, target) {
  if(!prev.hasOwnProperty(k) || !next.hasOwnProperty(k)) {
    return;
  }
  let res = {
    k,
  };
  if(k === 'transform') {
    if(!prev[k] || !next[k]) {
      return;
    }
    // transform每项以[k,v]存在，新老可能每项不会都存在，顺序也未必一致，不存在的认为是0
    let pExist = {};
    prev[k].forEach(item => {
      pExist[item[0]] = item[1];
    });
    let nExist = {};
    next[k].forEach(item => {
      nExist[item[0]] = item[1];
    });
    res.v = [];
    let computedStyle = target.computedStyle;
    let key = k;
    next[k].forEach(item => {
      let [k, v] = item;
      // 都存在的计算差值
      if(pExist.hasOwnProperty(k)) {
        let p = pExist[k];
        let n = nExist[k];
        if(k === 'matrix') {
          let t = [];
          for(let i = 0; i < 6; i++) {
            t[i] = n[i] - p[i];
          }
          res.v.push({
            k,
            v: t,
          });
        }
        else if(p.unit === n.unit) {
          res.v.push({
            k,
            v: v.value - p.value,
          });
        }
        else if(p.unit === unit.PX && n.unit === unit.PERCENT) {
          if(k === 'translateX') {
            p.value = p.value * 100 / computedStyle.width;
          }
          else if(k === 'translateY') {
            p.value = p.value * 100 / computedStyle.height;
          }
          p.unit = unit.PERCENT;
          res.v.push({
            k,
            v: n.value - p.value,
          });
        }
        else if(p.unit === unit.PERCENT && n.unit === unit.PX) {
          if(k === 'translateX') {
            p.value = p.value * 0.01 * computedStyle.width;
          }
          else if(k === 'translateY') {
            p.value = p.value * 0.01 * computedStyle.width;
          }
          p.unit = unit.PX;
          res.v.push({
            k,
            v: n.value - p.value,
          });
        }
      }
      // matrix老的不存在的项默认为单位矩阵
      else if(k === 'matrix') {
        let id = [1, 0, 0, 1, 0, 0];
        prev[key].push([k, id]);
        let t = [];
        for(let i = 0; i < 6; i++) {
          t[i] = v[i] - id[i];
        }
        res.v.push({
          k,
          v: t,
        });
      }
      // 老的不存在的项默认为0
      else {
        prev[key].push([k, {
          value: 0,
          unit: v.unit,
        }]);
        res.v.push({
          k,
          v: v.value,
        });
      }
    });
    prev[k].forEach(item => {
      let [k, v] = item;
      // 新的不存在的项默认为0或单位矩阵
      if(!nExist.hasOwnProperty(k)) {
        if(k === 'matrix') {
          let id = [1, 0, 0, 1, 0, 0];
          next[key].push([k, id]);
          let t = [];
          for(let i = 0; i < 6; i++) {
            t[i] = id[i] - v[i];
          }
          res.v.push({
            k,
            v: t,
          });
        }
        else {
          next[key].push([k, {
            value: 0,
            unit: v.unit,
          }]);
          res.v.push({
            k,
            v: -v.value,
          });
        }
      }
    });
  }
  else if(k === 'transformOrigin') {
    res.v = [];
    let computedStyle = target.computedStyle;
    for(let i = 0; i < 2; i++) {
      let p = prev[k][i];
      let n = next[k][i];
      if(p.unit === n.unit) {
        res.v.push(n.value - p.value);
      }
      else if(p.unit === unit.PX && n.unit === unit.PERCENT) {
        p.value = p.value * 100 / computedStyle[i ? 'outerHeight' : 'outerWidth'];
        p.unit = unit.PERCENT;
        res.v = n.value - p.value;
      }
      else if(p.unit === unit.PERCENT && n.unit === unit.PX) {
        p.value = p.value * 0.01 * computedStyle[i ? 'outerHeight' : 'outerWidth'];
        p.unit = unit.PX;
        res.v = n.value - p.value;
      }
    }
  }
  else if(k === 'backgroundImage') {
    let p = prev[k];
    let n = next[k];
    let pv = p.v;
    let nv = n.v;
    // 渐变种类或值为空则无法比较
    if(p.k !== n.k || !pv.length || !nv.length) {
      return;
    }
    res.v = [];
    for(let i = 0, len = Math.min(pv.length, nv.length); i < len; i++) {
      let a = pv[i];
      let b = nv[i];
      let t = [];
      t.push([
        b[0][0] - a[0][0],
        b[0][1] - a[0][1],
        b[0][2] - a[0][2],
        b[0][3] - a[0][3]
      ]);
      if(a[1] && b[1] && a[1].unit === b[1].unit) {
        t.push(b[1].value - a[1].value);
      }
      res.v.push(t);
    }
    if(p.k === 'linear' && n.k === 'linear' && p.d !== undefined && n.d !== undefined) {
      res.d = n.d - p.d;
    }
  }
  else if(COLOR_HASH.hasOwnProperty(k)) {
    let p = prev[k];
    let n = next[k];
    res.v = [
      n[0] - p[0],
      n[1] - p[1],
      n[2] - p[2],
      n[3] - p[3]
    ];
  }
  else if(LENGTH_HASH.hasOwnProperty(k)) {
    let p = prev[k];
    let n = next[k];
    // auto不做动画
    if(p.unit === unit.AUTO || n.unit === unit.AUTO) {
      return;
    }
    let parentComputedStyle = (target.parent || target).computedStyle;
    if(p.unit === n.unit) {
      res.v = n.value - p.value;
    }
    else if(p.unit === unit.PX && n.unit === unit.PERCENT) {
      p.value = p.value * 100 / parentComputedStyle[k];
      p.unit = unit.PERCENT;
      res.v = n.value - p.value;
    }
    else if(p.unit === unit.PERCENT && n.unit === unit.PX) {
      p.value = p.value * 0.01 * parentComputedStyle[k];
      p.unit = unit.PX;
      res.v = n.value - p.value;
    }
    else {
      return;
    }
  }
  else if(repaint.GEOM.hasOwnProperty(k)) {
    let p = prev[k];
    let n = next[k];
    if(k === 'points' || k === 'controls') {
      res.v = [];
      for(let i = 0, len = Math.min(p.length, n.length); i < len; i++) {
        let pv = p[i];
        let nv = n[i];
        if(util.isNil(pv) || util.isNil(nv)) {
          res.v.push(pv);
        }
        else {
          let v = [];
          for(let j = 0, len2 = Math.max(pv.length, nv.length); j < len2; j++) {
            if(util.isNil(pv[j]) || util.isNil(nv[j])) {
              v.push(pv[j]);
            }
            else {
              v.push(nv[j] - pv[j]);
            }
          }
          res.v.push(v);
        }
      }
    }
    else if(k === 'controlA' || k === 'controlB') {
      res.v = [
        n[0] - p[0],
        n[1] - p[1]
      ];
    }
    else {
      res.v = n - p;
    }
  }
  else {
    res.v = prev[k];
  }
  return res;
}

function calFrame(prev, current, target) {
  let next = framing(current);
  next.keys.forEach(k => {
    let ts = calDiff(prev.style, next.style, k, target);
    // 可以形成过渡的才会产生结果返回
    if(ts) {
      prev.transition.push(ts);
    }
  });
  return next;
}

function binarySearch(i, j, now, frames) {
  if(i === j) {
    let frame = frames[i];
    if(frame.time > now) {
      return i - 1;
    }
    return i;
  }
  else {
    let middle = i + ((j - i) >> 1);
    let frame = frames[middle];
    if(frame.time === now) {
      return middle;
    }
    else if(frame.time > now) {
      return binarySearch(i, Math.max(middle - 1, i), now, frames);
    }
    else {
      return binarySearch(Math.min(middle + 1, j), j, now, frames);
    }
  }
}

function calStyle(frame, percent) {
  let style = util.clone(frame.style);
  let timingFunction = easing[frame.easing] || easing.linear;
  if(timingFunction !== easing.linear) {
    percent = timingFunction(percent);
  }
  frame.transition.forEach(item => {
    let { k, v, d } = item;
    if(k === 'transform') {
      let transform = style.transform;
      let hash = {};
      transform.forEach(item => {
        hash[item[0]] = item[1];
      });
      v.forEach(item => {
        let { k, v } = item;
        if(k === 'matrix') {
          for(let i = 0; i < 6; i++) {
            hash[k][i] += v[i] * percent;
          }
        }
        else {
          hash[k].value += v * percent;
        }
      });
    }
    else if(k === 'transformOrigin') {
      style[k][0].value += v[0] * percent;
      style[k][1].value += v[1] * percent;
    }
    else if(k === 'backgroundImage') {
      let item = style[k];
      for(let i = 0, len = Math.min(item.v.length, v.length); i < len; i++) {
        let a = item.v[i];
        let b = v[i];
        a[0][0] += b[0][0] * percent;
        a[0][1] += b[0][1] * percent;
        a[0][2] += b[0][2] * percent;
        a[0][3] += b[0][3] * percent;
        if(a[1] && b[1]) {
          a[1].value += b[1] * percent;
        }
      }
      if(item.k === 'linear' && item.d !== undefined && d !== undefined) {
        item.d += d * percent;
      }
    }
    // color可能超限[0,255]，但浏览器已经做了限制，无需关心
    else if(COLOR_HASH.hasOwnProperty(k)) {
      let item = style[k];
      item[0] += v[0] * percent;
      item[1] += v[1] * percent;
      item[2] += v[2] * percent;
      item[3] += v[3] * percent;
    }
    else if(LENGTH_HASH.hasOwnProperty(k)) {
      style[k].value += v * percent;
    }
    else if(repaint.GEOM.hasOwnProperty(k)) {
      let st = style[k];
      if(k === 'points' || k === 'controls') {
        for(let i = 0, len = Math.min(st.length, v.length); i < len; i++) {
          if(util.isNil(st[i]) || !st[i].length) {
            continue;
          }
          for(let j = 0, len2 = Math.min(st[i].length, v[i].length); j < len2; j++) {
            if(!util.isNil(st[i][j]) && !util.isNil(v[i][j])) {
              st[i][j] += v[i][j] * percent;
            }
          }
        }
      }
      else if(k === 'controlA' || k === 'controlB') {
        st[0] += v[0] * percent;
        st[1] += v[1] * percent;
      }
      else {
        style[k] += v * percent;
      }
    }
    else {
      style[k] = v;
    }
  });
  return style;
}

function getLevel(style) {
  for(let i in style) {
    if(style.hasOwnProperty(i)) {
      if(!repaint.STYLE.hasOwnProperty(i) && !repaint.GEOM.hasOwnProperty(i)) {
        return level.REFLOW;
      }
    }
  }
  return level.REPAINT;
}

let uuid = 0;

class Animation extends Event {
  constructor(target, list, options) {
    super();
    this.__id = uuid++;
    this.__target = target;
    this.__list = list || [];
    // 动画过程另外一种形式，object描述k-v形式
    if(!Array.isArray(this.__list)) {
      let nl = [];
      let l = this.__list;
      for(let k in l) {
        if(l.hasOwnProperty(k)) {
          let v = l[k];
          if(Array.isArray(v)) {
            for(let i = 0, len = v.length; i < len; i++) {
              let o = nl[i] = nl[i] || {
                offset: i / (len - 1),
              };
              o[k] = v[i];
            }
          }
        }
      }
      this.__list = nl;
    }
    if(util.isNumber(options)) {
      this.__options = {
        duration: options,
      };
    }
    this.__options = options || {};
    this.__frames = [];
    this.__startTime = 0;
    this.__offsetTime = 0;
    this.__pauseTime = 0;
    this.__lastTime = 0;
    this.__pending = false;
    this.__playState = 'idle';
    this.__playCount = 0;
    this.__cb = null;
    this.__isDestroyed = true;
    this.__init();
  }

  __init() {
    let { target, options } = this;
    let style = util.clone(target.style);
    let { duration, iterations } = options;
    // 没设置时间或非法时间或0，动画过程为空无需执行
    duration = parseFloat(duration);
    if(isNaN(duration) || duration <= 0) {
      return;
    }
    if(iterations === 'Infinity' || iterations === 'infinity') {
      iterations = Infinity;
    }
    else if(util.isNil(iterations)) {
      iterations = 1;
    }
    // 执行次数<1也无需执行
    if(iterations !== Infinity) {
      iterations = parseInt(iterations);
    }
    if(isNaN(iterations) || iterations < 1) {
      return;
    }
    options.duration = duration;
    options.iterations = iterations;
    target.__animateStyle = util.clone(style);
    // 转化style为计算后的绝对值结果
    color2array(style);
    // 过滤时间非法的，过滤后续offset<=前面的
    let list = this.list;
    let offset = -1;
    for(let i = 0, len = list.length; i < len; i++) {
      let current = list[i];
      if(current.hasOwnProperty('offset')) {
        current.offset = parseFloat(current.offset);
        // 超过区间[0,1]
        if(isNaN(current.offset) || current.offset < 0 || current.offset > 1) {
          list.splice(i, 1);
          i--;
          len--;
        }
        // <=前面的
        else if(current.offset <= offset) {
          list.splice(i, 1);
          i--;
          len--;
        }
        // 正常的标准化样式
        else {
          offset = current.offset;
          css.normalize(current);
          color2array(current);
        }
      }
      else {
        css.normalize(current);
        color2array(current);
      }
    }
    // 必须有2帧及以上描述
    if(list.length < 2) {
      return;
    }
    // 首尾时间偏移强制为[0, 1]
    let first = list[0];
    first.offset = 0;
    let last = list[list.length - 1];
    last.offset = 1;
    // 计算没有设置offset的时间
    for(let i = 1, len = list.length; i < len; i++) {
      let start = list[i];
      // 从i=1开始offset一定>0，找到下一个有offset的，均分中间无声明的
      if(!start.offset) {
        let end;
        let j = i + 1;
        for(; j < len; j++) {
          end = list[j];
          if(end.offset) {
            break;
          }
        }
        let num = j - i + 1;
        start = list[i - 1];
        let per = (end.offset - start.offset) / num;
        for(let k = i; k < j; k++) {
          let item = list[k];
          item.offset = start.offset + per * (k + 1 - i);
        }
        i = j;
      }
    }
    // 换算出60fps中每一帧，为防止空间过大，不存储每一帧的数据，只存储关键帧和增量
    let frames = this.frames;
    let length = list.length;
    let prev;
    // 第一帧要特殊处理
    prev = framing(first);
    frames.push(prev);
    for(let i = 1; i < length; i++) {
      let next = list[i];
      prev = calFrame(prev, next, target);
      frames.push(prev);
    }
    this.__isDestroyed = false;
  }

  play() {
    if(this.isDestroyed) {
      return;
    }
    this.__cancelTask();
    this.__playState = 'running';
    // 从头播放还是暂停继续
    if(this.pending) {
      let now = inject.now();
      let diff = now - this.pauseTime;
      // 在没有performance时，防止乱改系统时间导致偏移向前，但不能防止改时间导致的偏移向后
      diff = Math.max(diff, 0);
      this.__offsetTime = diff;
    }
    else {
      let { duration, fps, iterations } = this.options;
      let { frames, target, playCount } = this;
      let length = frames.length;
      let first = true;
      this.__cb = () => {
        let now = inject.now();
        if(first) {
          this.__startTime = now;
          frames.forEach(frame => {
            frame.time = now + duration * frame.offset;
          });
        }
        let countTime = playCount * duration;
        let i = binarySearch(0, frames.length - 1,now + this.offsetTime - countTime, frames);
        let current = frames[i];
        let needRefresh;
        // 最后一帧结束动画
        if(i === length - 1) {
          needRefresh = stringify(current.style, this.__lastStyle, target);
          playCount = ++this.playCount;
          if(iterations !== Infinity && playCount >= iterations) {
            frame.offFrame(this.cb);
          }
        }
        // 否则根据目前到下一帧的时间差，计算百分比，再反馈到变化数值上
        else {
          // 增加的fps功能，当<60时计算跳帧
          if(!util.isNumber(fps) || fps < 0) {
            fps = 60;
          }
          if(!first && fps < 60) {
            let time = now - this.lastTime;
            if(time < 1000 / fps) {
              return;
            }
          }
          let total = frames[i + 1].time - current.time;
          let diff = now - countTime - current.time;
          let percent = diff / total;
          let style = calStyle(current, percent);
          needRefresh = stringify(style, this.__lastStyle, target);
        }
        this.__lastTime = now;
        this.__lastStyle = current.style;
        first = false;
        let root = target.root;
        // 两帧之间没有变化，不触发刷新
        if(root) {
          // 可能涉及字号变化，引发布局变更重新测量
          let task = this.__task = () => {
            this.emit(Event.KARAS_ANIMATION_FRAME);
            if(i === length - 1) {
              // 没到播放次数结束时继续
              if(iterations === Infinity || playCount < iterations) {
                this.emit(Event.KARAS_ANIMATION_FINISH);
                return;
              }
              this.__playState = 'finished';
              // 完全结束多触发complete
              let task = this.__task = () => {
                this.emit(Event.KARAS_ANIMATION_FRAME);
                this.emit(Event.KARAS_ANIMATION_FINISH);
                this.emit(Event.KARAS_ANIMATION_COMPLETE);
              };
              root.addRefreshTask(task);
            }
          };
          if(needRefresh) {
            root.setRefreshLevel(getLevel(current.style));
            root.addRefreshTask(task);
          }
          else {
            frame.nextFrame(task);
          }
        }
      };
    }
    // 先执行，本次执行调用refreshTask也是下一帧再渲染，frame的每帧都是下一帧
    this.cb();
    // 防止重复调用多次cb
    frame.offFrame(this.cb);
    frame.onFrame(this.cb);
    this.__pending = false;
    return this;
  }

  pause() {
    this.__pending = true;
    this.__pauseTime = inject.now();
    this.__playState = 'paused';
    frame.offFrame(this.cb);
    this.__cancelTask();
    this.emit(Event.KARAS_ANIMATION_PAUSE);
    return this;
  }

  finish() {
    let { fill } = this.options;
    frame.offFrame(this.cb);
    this.__cancelTask();
    let { target, lastStyle } = this;
    let root = target.root;
    if(root) {
      this.__playState = 'finished';
      // 停留在最后一帧
      if({
        forwards: true,
        both: true
      }.hasOwnProperty(fill)) {
        let last = this.frames[this.frames.length - 1];
        stringify(last.style, lastStyle, this.target);
      }
      let task = this.__task = () => {
        this.emit(Event.KARAS_ANIMATION_FRAME);
        this.emit(Event.KARAS_ANIMATION_FINISH);
        this.emit(Event.KARAS_ANIMATION_COMPLETE);
      };
      root.addRefreshTask(task);
    }
    return this;
  }

  cancel() {
    frame.offFrame(this.cb);
    this.__cancelTask();
    this.__playState = 'idle';
    let { target } = this;
    let root = target.root;
    if(root) {
      let task = this.__task = () => {
        this.emit(Event.KARAS_ANIMATION_CANCEL);
      };
      root.addRefreshTask(task);
    }
    return this;
  }

  __cancelTask() {
    if(this.__task && this.target.root) {
      this.target.root.delRefreshTask(this.__task);
    }
  }

  __destroy() {
    frame.offFrame(this.cb);
    this.__cancelTask();
    this.__playState = 'idle';
    this.__isDestroyed = true;
  }

  get id() {
    return this.__id;
  }
  get target() {
    return this.__target;
  }
  get list() {
    return this.__list;
  }
  get options() {
    return this.__options;
  }
  get frames() {
    return this.__frames;
  }
  get startTime() {
    return this.__startTime;
  }
  get lastTime() {
    return this.__lastTime;
  }
  get pending() {
    return this.__pending;
  }
  get offsetTime() {
    return this.__offsetTime;
  }
  get pauseTime() {
    return this.__pauseTime;
  }
  get playState() {
    return this.__playState;
  }
  get playCount() {
    return this.__playCount;
  }
  set playCount(v) {
    this.__playCount = v;
  }
  get cb() {
    return this.__cb;
  }
  get isDestroyed() {
    return this.__isDestroyed;
  }
  get lastStyle() {
    return this.__lastStyle;
  }
}

export default Animation;
