var path = require('path');
var fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAFoCAYAAAB65WHVAAAD40lEQVR4nO3bP2sUQRwG4DcaTPxXBAvBRmwVFVFBEC0shGDjBxA/gOInEANiIQoWEkQQBZsgppAgYiGENIFAwMIihYVVqrT5AlrsLLfZkM3JHSiX54GB25nf7N007w17cwkAAPD3JpLs/9cfAoCtjib5nWRmwPtcK/eZLteLSVYHvCfAnjasgL6erQG9lOT7gPcE2NMENMB/qg7op0meJFlL8ivJqySTjbrxJA9TPbZYT/I+ydnG+G4BPZXkTZm7meRbkktDXQnAiKkDum5zSTbK62eNus+l70eS2UbN5TLeFdCTSX6W8dlUXwbrrfkAtNQBvZnkeOmbSBWgK+V6utQ8TzJW+k6Wvvly3RXQ98vY3cb71vOXhrcUgNFSB/S7Vv9CqtBOkpel5maSU4220qjpCuhPZexY6z0WS/9YANimDujHrf4P6YXv12x9DNJu4+kO6LVUjzjaXpc5U0NYB8DI2ekURzOgP5aaq0nOtNrpUtMV0PVOu/1nmOXYQQPsqJ+Anik1txvj+1LtrBfKdVdAvy1j5xvzD5a+5YFXADCi+gnoE6VmI9UPfreSfCl990pNV0BfKGOrSa6kOl43n+2hD0DDkVRB+ajVP5deQCfJjfSO1tXtRaqddLL7X73vZPuz6wfDWgTAXncgyblUu+D2iYx+HE517vlikkND/FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0Jc/KKiVymOsDdUAAAAASUVORK5CYII=')
      .end();
  }
};