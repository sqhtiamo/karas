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
