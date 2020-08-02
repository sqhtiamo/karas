var path = require('path');
var fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,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')
      .end();
  }
};