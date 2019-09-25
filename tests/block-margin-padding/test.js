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
