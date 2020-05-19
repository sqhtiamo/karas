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