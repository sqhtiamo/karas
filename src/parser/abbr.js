import reset from '../style/reset';

let fullCssProperty = {
  skewX: 'kx',
  skewY: 'ky',
  transform: 'tf',
  fontSize: 'fz',
  offset: 'os',
  easing: 'e',
  filter: 'ft',
  boxShadow: 'bd',
};

let abbrCssProperty = {
  os: 'offset',
  e: 'easing',
  ft: 'filter',
  bd: 'boxShadow',
};

let fullAnimate = {
  value: 'v',
  options: 'o',
};

let abbrAnimate = {};

let fullAnimateOption = {
  duration: 'dt',
  delay: 'd',
  endDelay: 'ed',
  iterations: 'i',
  direction: 'dc',
  fill: 'f',
  fps: 'fp',
  playbackRate: 'p',
  spfLimit: 'sl',
};

let abbrAnimateOption = {};

reset.dom.concat(reset.geom).forEach(item => {
  let k = item.k;
  if(fullCssProperty.hasOwnProperty(k)) {
    abbrCssProperty[fullCssProperty[k]] = k;
    return;
  }
  let v = k.charAt(0) + k.replace(/[a-z]/g, '').toLowerCase();
  fullCssProperty[k] = v;
  abbrCssProperty[v] = k;
});

Object.keys(fullAnimate).forEach(k => {
  abbrAnimate[fullAnimate[k]] = k;
});

Object.keys(fullAnimateOption).forEach(k => {
  abbrAnimateOption[fullAnimateOption[k]] = k;
});

export default {
  fullCssProperty,
  abbrCssProperty,
  fullAnimate,
  abbrAnimate,
  fullAnimateOption,
  abbrAnimateOption,
};
