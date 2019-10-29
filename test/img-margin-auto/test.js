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
