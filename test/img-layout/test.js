var path = require('path');
var fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,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AIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTkCgO0tLBAgQSAUEOuU0RoAAgU5AoDtLSwQIEEgFBDrlNEaAAIFOQKA7S0sECBBIBQQ65TRGgACBTuB/AUiga4dxDKEHAAAAAElFTkSuQmCC')
      .end();
  }
};