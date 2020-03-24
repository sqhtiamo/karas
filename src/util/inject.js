import Text from '../node/Text';const spf = 1000 / 60;let inject = {  measureText(cb) {    let { list, data } = Text.MEASURE_TEXT;    let html = '';    let keys = [];    let chars = [];    Object.keys(data).forEach(i => {      let { key, style, s } = data[i];      if(s) {        let inline = `position:absolute;font-family:${style.fontFamily};font-size:${style.fontSize}px`;        for(let j = 0, len = s.length; j < len; j++) {          keys.push(key);          let char = s.charAt(j);          chars.push(char);          html += `<span style="${inline}">${char.replace(/</, '&lt;').replace(' ', '&nbsp;')}</span>`;        }      }    });    if(!html) {      cb();      return;    }    let div = document.createElement('div');    div.style.position = 'absolute';    div.style.left = '99999px';    div.style.top = '-99999px';    div.style.visibility = 'hidden';    document.body.appendChild(div);    div.innerHTML = html;    let cns = div.childNodes;    let { CHAR_WIDTH_CACHE, MEASURE_TEXT } = Text;    for(let i = 0, len = cns.length; i < len; i++) {      let node = cns[i];      let key = keys[i];      let char = chars[i];      let css = window.getComputedStyle(node, null);      CHAR_WIDTH_CACHE[key][char] = parseFloat(css.width);    }    list.forEach(text => text.__measureCb());    cb();    MEASURE_TEXT.list = [];    MEASURE_TEXT.data = {};    document.body.removeChild(div);  },  measureImg(url, cb) {    let img = new Image();    img.onload = function() {      cb({        success: true,        width: img.width,        height: img.height,        source: img,      });    };    img.onerror = function() {      cb({        success: false,      });    };    if(url.substr( 0, 5 ) !== 'data:') {      let host = /^(?:\w+:)?\/\/([^/:]+)/.exec(url);      if(host) {        if(location.hostname !== host[1]) {          img.crossOrigin = 'anonymous';        }      }    }    img.src = url;  },  warn(s) {    console.warn(s);  },  requestAnimationFrame(cb) {    let res;    if(typeof requestAnimationFrame !== 'undefined') {      inject.requestAnimationFrame = requestAnimationFrame.bind(window);      res = requestAnimationFrame(cb);    }    else {      res = setTimeout(cb, spf);      inject.requestAnimationFrame = function(cb) {        return setTimeout(cb, spf);      };    }    return res;  },  cancelAnimationFrame(id) {    if(typeof cancelAnimationFrame !== 'undefined') {      inject.cancelAnimationFrame = cancelAnimationFrame.bind(window);      cancelAnimationFrame(id);    }    else {      clearTimeout(id);      inject.clearTimeout = function(cb) {        clearTimeout(id);      };    }  },  now() {    if(typeof performance !== 'undefined') {      inject.now = performance.now.bind(performance);      return performance.now();    }    inject.now = Date.now.bind(Date);    return Date.now();  },};export default inject;