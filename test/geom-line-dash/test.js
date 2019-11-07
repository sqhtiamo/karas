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
