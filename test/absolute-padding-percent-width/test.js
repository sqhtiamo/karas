var path = require('path');
var fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,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IBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJSDQLVnnEiBAIBQQ6BDQOAECBFoCAt2SdS4BAgRCAYEOAY0TIECgJfA/7w8teLvXus8AAAAASUVORK5CYII=')
      .end();
  }
};