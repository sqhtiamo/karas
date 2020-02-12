let o = karas.render(
  <canvas width="360" height="360">
    <span ref="t">123</span>
  </canvas>,
  '#test'
);
let t = o.ref.t;
let animation = t.animate([
  {
    fontSize: 16,
  },
  {
    fontSize: 60,
  }
], {
  duration: 200,
  fill: 'forwards',
});
let input = document.querySelector('input');
animation.pause();
animation.play(function() {
  input.value += 'play';
});
let n = 0;
animation.on(karas.Event.KARAS_ANIMATION_FRAME, () => {
  if(n++ === 0) {
    input.value += '/' + t.computedStyle.fontSize + ',' + t.computedStyle.lineHeight;
  }
});
animation.on(karas.Event.KARAS_ANIMATION_FINISH, () => {
  input.value += '/' + t.computedStyle.fontSize + ',' + t.computedStyle.lineHeight;
});
