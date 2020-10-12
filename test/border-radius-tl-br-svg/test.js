let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M2.9289321881345245,2.9289321881345254C4.804295972614871,1.053568403654177 7.347835101604559,-1.7763568394002505e-15 10,0L10,9.999999999999998L0,0M10,0L20,0L20,20L10,9.999999999999998M20,0L120,0L120,20L20,20M120,0L140,0L140,0L120,20"],["fill","rgba(0,0,0,1)"]]},{"type":"item","tagName":"path","props":[["d","M140,0L140,0L140,20L120,20M120,20L140,20L140,120L120,120M120,120L140,120L140,130L130,130M140,130C140,132.65216489839545 138.94643159634583,135.19570402738512 137.07106781186548,137.07106781186548L140,140L130,130"],["fill","rgba(0,0,0,1)"]]},{"type":"item","tagName":"path","props":[["d","M0,140L20,120L20,140L0,140M20,120L120,120L120,140L20,140M120,120L130,130L130,140L120,140M130,140C132.65216489839545,140 135.19570402738512,138.94643159634583 137.07106781186548,137.07106781186548L140,140L130,130"],["fill","rgba(0,0,0,1)"]]},{"type":"item","tagName":"path","props":[["d","M2.9289321881345245,2.9289321881345254C1.053568403654177,4.80429597261487 -1.7763568394002505e-15,7.347835101604559 0,10L10.000000000000002,10L0,0M0,10L10.000000000000002,10L20,20L0,20M0,20L20,20L20,120L0,120M0,120L20,120L0,140L0,140"],["fill","rgba(255,0,0,1)"]]}],"children":[],"type":"dom"}],"type":"dom","defs":[]}')
      .end();
  }
};
