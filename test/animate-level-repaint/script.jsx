let o = karas.render(
  <canvas width="360" height="360">
    <div
      ref="t"
      style={{width:100,height:100,background:'#F00'}}>
    </div>
  </canvas>,
  '#test'
);
let t = o.ref.t;
let animation = t.animate([
  {
    transform: 'translateX(0)',
  },
  {
    transform: 'translateX(100px)',
  }
], {
  duration: 200,
  fill: 'forwards',
});
let input = document.querySelector('input');
input.value = o.__refreshLevel;
