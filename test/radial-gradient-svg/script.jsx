let o = karas.render(
  <svg width="360" height="360">
    <div style={{marginBottom:1,width:50,height:50,background:'radial-gradient(#F00, #00F)'}} />
    <div style={{marginBottom:1,width:50,height:50,background:'radial-gradient(at 10px 10px, #F00, #00F)'}} />
    <div style={{marginBottom:1,width:50,height:50,background:'radial-gradient(at 10px 30px, #F00, #00F)'}} />
    <div style={{marginBottom:1,width:50,height:50,background:'radial-gradient(at 30px 30px, #F00, #00F)'}} />
    <div style={{width:50,height:50,background:'radial-gradient(at 30px 10px, #F00, #00F)'}} />
  </svg>,
  '#test'
);
var input = document.querySelector('#base64');
input.value = JSON.stringify(o.virtualDom);
