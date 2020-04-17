import Dom from './node/Dom';
import Img from './node/Img';
import Root from './node/Root';
import mode from './util/mode';
import Geom from './geom/Geom';
import Line from './geom/Line';
import Polyline from './geom/Polyline';
import Polygon from './geom/Polygon';
import Sector from './geom/Sector';
import Rect from './geom/Rect';
import Circle from './geom/Circle';
import Ellipse from './geom/Ellipse';
import Component from './node/Component';
import Event from './util/Event';
import sort from './util/sort';
import util from './util/util';
import parse from './util/parse';
import inject from './util/inject';
import abbr from './util/abbr';
import css from './style/css';
import unit from './style/unit';
import reset from './style/reset';
import frame from './animate/frame';
import easing from './animate/easing';
import level from './animate/level';
import math from './math/index';

Geom.register('$line', Line);
Geom.register('$polyline', Polyline);
Geom.register('$polygon', Polygon);
Geom.register('$sector', Sector);
Geom.register('$rect', Rect);
Geom.register('$circle', Circle);
Geom.register('$ellipse', Ellipse);

let karas = {
  render(root, dom) {
    if(!(root instanceof Root)) {
      throw new Error('Render root must be "canvas" or "svg"');
    }
    if(dom) {
      root.appendTo(dom);
    }
    return root;
  },
  createVd(tagName, props, children) {
    if(['canvas', 'svg'].indexOf(tagName) > -1) {
      return new Root(tagName, props, children);
    }
    if(Dom.isValid(tagName)) {
      if(tagName === 'img') {
        return new Img(tagName, props);
      }
      return new Dom(tagName, props, children);
    }
    throw new Error('Can not use marker: ' + tagName);
  },
  createGm(tagName, props) {
    let klass = Geom.getRegister(tagName);
    return new klass(tagName, props);
  },
  createCp(cp, props, children) {
    return new cp(props, children);
  },
  parse(json, dom, options) {
    // 重载，在确定dom传入选择器字符串或html节点对象时作为渲染功能，否则仅创建vd返回
    if(dom) {
      if(util.isString(dom) || window.HTMLElement && (dom instanceof window.HTMLElement)) {}
      else {
        options = dom;
        dom = null;
      }
    }
    // 暂存所有动画声明，等root的生成后开始执行
    let animateList = [];
    let vd = parse(this, json, animateList, options);
    // 传入根节点渲染
    if(dom) {
      this.render(vd, dom);
      animateList.forEach(item => {
        let { target, animate } = item;
        if(Array.isArray(animate)) {
          animate.forEach(animate => {
            target.animate(animate.value, animate.options);
          });
        }
        else {
          target.animate(animate.value, animate.options);
        }
      });
    }
    else if(animateList.length) {
      // TODO: 传给后面创建的root
    }
    return vd;
  },
  Root,
  Dom,
  Img,
  Geom,
  mode,
  Component,
  Event,
  sort,
  util,
  inject,
  css,
  unit,
  reset,
  abbr,
  frame,
  easing,
  level,
  math,
};

if(typeof window !== 'undefined') {
  window.karas = karas;
}

export default karas;
