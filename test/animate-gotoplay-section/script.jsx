let o = karas.render(
  <canvas width="360" height="360">
    <span ref="t" style={{background:'#F00'}}>123</span>
  </canvas>,
  '#test'
);
let t = o.ref.t;
let animation = t.animate([
  {
    height: 100,
  },
  {
    height: 200,
  }
], {
  duration: 200,
  fill: 'forwards',
});
let input = document.querySelector('input');
let n = 0;
animation.gotoAndPlay(100);
animation.on(karas.Event.FRAME, () => {
  if(n++ === 0) {
    input.value = t.computedStyle.height;
  }
});
animation.on(karas.Event.FINISH, () => {
  input.value += '/' + t.computedStyle.height;
});
