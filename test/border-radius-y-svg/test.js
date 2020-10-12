let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M15,60C15,35.147186257614294 21.715728752538098,15 30,15L240,15C248.2842712474619,15 255,35.147186257614294 255,60L255,170C255,194.8528137423857 248.2842712474619,215 240,215L30,215C21.715728752538098,215 15,194.8528137423857 15,170"],["fill","rgba(255,0,0,1)"]]},{"type":"item","tagName":"path","props":[["d","M11.999999999999996,12.000000000000007C13.439798411730983,9.840302382403529 14.973848573737909,7.944112101268402 16.58359213500126,6.334368540005052L21.9772961574757,21.9772961574757C21.9772961574757,21.9772961574757 22.912219354634807,20.20189618549044 21.9772961574757,21.9772961574757M16.58359213500126,6.334368540005052C20.749255169844815,2.1687055051614976 25.342647141365873,7.105427357601002e-15 30,0L30,15C26.02175265240684,15 22.206443958922307,19.7410578164438 21.9772961574757,21.9772961574757M30,0L240,0L240,15L30,15M240,0C244.6573528586341,7.105427357601002e-15 249.25074483015518,2.1687055051614976 253.41640786499875,6.334368540005052L248.0227038425243,21.9772961574757C247.7935560410777,19.7410578164438 243.97824734759317,15 240,15M253.41640786499875,6.334368540005052C255.0261514262621,7.944112101268402 256.560201588269,9.840302382403529 258,12.000000000000007L248.0227038425243,21.9772961574757C247.0877806453652,20.20189618549044 248.0227038425243,21.9772961574757 248.0227038425243,21.9772961574757"],["fill","rgba(0,0,0,0.5)"]]},{"type":"item","tagName":"path","props":[["d","M258,12.000000000000007C260.2741699796952,15.411254969542789 262.2943725152286,19.451660040609603 264,23.999999999999993L250.6066017177982,28.18019484660536C249.82419881215003,25.832986129660796 248.95762703968342,23.75269612946095 248.0227038425243,21.9772961574757M264,23.999999999999993C267.89466384404113,34.38577025077628 270,47.017787186529645 270,59.99999999999999L255,60C255,48.06525795722052 253.41964739451873,36.619331876766914 250.6066017177982,28.18019484660536M255,60L270,60L270,170L255,170M270,170C270,182.98221281347037 267.89466384404113,195.6142297492237 264,206L250.6066017177982,201.81980515339464C253.41964739451873,193.38066812323308 255,181.93474204277948 255,170M264,206C262.2943725152286,210.5483399593904 260.2741699796952,214.5887450304572 258,218L248.0227038425243,208.0227038425243C248.95762703968342,206.24730387053904 249.82419881215003,204.1670138703392 250.6066017177982,201.81980515339464"],["fill","rgba(0,0,255,0.5)"]]},{"type":"item","tagName":"path","props":[["d","M11.999999999999996,218C13.439798411730983,220.15969761759646 14.973848573737909,222.0558878987316 16.58359213500126,223.66563145999496L21.9772961574757,208.0227038425243C21.9772961574757,208.0227038425243 22.912219354634807,209.79810381450955 21.9772961574757,208.0227038425243M16.58359213500126,223.66563145999496C20.749255169844815,227.83129449483852 25.342647141365873,230 30,230L30,215C26.02175265240684,215 22.206443958922307,210.2589421835562 21.9772961574757,208.0227038425243M30,215L240,215L240,230L30,230M240,230C244.6573528586341,230 249.25074483015518,227.83129449483852 253.41640786499875,223.66563145999496L248.0227038425243,208.0227038425243C247.7935560410777,210.2589421835562 243.97824734759317,215 240,215M253.41640786499875,223.66563145999496C255.0261514262621,222.0558878987316 256.560201588269,220.15969761759646 258,218L248.0227038425243,208.0227038425243C247.0877806453652,209.79810381450955 248.0227038425243,208.0227038425243 248.0227038425243,208.0227038425243"],["fill","rgba(255,0,0,0.5)"]]},{"type":"item","tagName":"path","props":[["d","M11.999999999999996,12.000000000000007C9.725830020304805,15.411254969542789 7.705627484771398,19.451660040609603 6.0000000000000036,23.999999999999993L19.393398282201787,28.18019484660536C20.175801187849977,25.832986129660796 21.04237296031659,23.75269612946095 21.9772961574757,21.9772961574757M6.0000000000000036,23.999999999999993C2.105336155958895,34.38577025077628 0,47.017787186529645 0,59.99999999999999L15,60C15,48.06525795722052 16.580352605481266,36.619331876766914 19.393398282201787,28.18019484660536M0,60L15,60L15,170L0,170M0,170C0,182.98221281347037 2.105336155958895,195.6142297492237 6.0000000000000036,206L19.393398282201787,201.81980515339464C16.580352605481266,193.38066812323308 15,181.93474204277948 15,170M6.0000000000000036,206C7.705627484771398,210.5483399593904 9.725830020304805,214.5887450304572 11.999999999999996,218L21.9772961574757,208.0227038425243C21.04237296031659,206.24730387053904 20.175801187849977,204.1670138703392 19.393398282201787,201.81980515339464"],["fill","rgba(0,255,0,0.5)"]]}],"children":[],"type":"dom"}],"type":"dom","defs":[]}')
      .end();
  }
};
