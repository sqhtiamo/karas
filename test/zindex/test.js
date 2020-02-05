var path = require('path');
var fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAFoCAYAAAB65WHVAAAR5UlEQVR4Xu3d4Ypk1RJE4e73f+iWRlFwkKmWiDo7d37+vXOjcq8MFokcmc+Pj4+vD/8gcA+Bz3ue4iXbCXyXmaC3t+Cu9xP0Xftc/RqCXr3+Kx9P0FeudeejCHrn3m9+NUHfvN1lbyPoZQtf8FyCXrDkLU8k6C2b3vNOgt6z6+tfStDXr3jdAwl63crvfTBB37vbrS8j6K2bv/DdBH3hUpc/iaCXF+Cm5xP0Tdv0lm8CBK0H1xAg6GtW6SF/ESBoVbiGAEFfs0oPIWgduI0AQd+2Ue9xQevANQQI+ppVeogLWgduI0DQt23Ue1zQOnANAYK+ZpUe4oLWgdsIEPRtG/UeF7QOXEOAoK9ZpYe4oHXgNgIEfdtGvccFrQPXECDoa1bpIS5oHbiNQEHQ/gat20qy+z2fLvLdBXj09QT9KH4/fj4Bgj5/R/dOSND37tbLIgQIOoJRyP8iQND/C5v/0x4CBL1n1+e9lKDP24mJjiJA0EetY9kwBL1s4Z77UwIE/VNi/nyOAEHnWEq6kgBBX7nWIY8i6CGLMuZTBAj6KfJ+98+/Hij84XI4zpYQeJQAQT+Kf/mPE/TyAnj+7wgQ9O8I+d97BB4T9Je/27O3VclvJ/DpL6t9O/MNP0jQG7bsjXUCBF1HvPIHCHrl2j06TYCg00TlfRMgaD1AIECAoAMQRfxCgKCVAoEAAYIOQBRB0DqAQIMAQTeoynRB6wACAQIEHYAowgWtAwg0CBB0g6pMF7QOIBAgQNABiCJc0DqAQIMAQTeoynRB6wACAQIEHYAowgWtAwg0CBB0g6pMF7QOIBAgQNABiCJc0DqAQIMAQTeoynRB6wACAQIEHYAowgWtAwg0CBB0g6pMF7QOIBAgQNABiCJc0DqAQIMAQTeoynRB6wACAQIEHYAowgWtAwg0CBB0g6pMF7QOIBAgQNABiCJc0DqAQIMAQTeoynRB6wACAQIEHYAowgWtAwg0CBB0g6pMF7QOIBAgQNABiCJc0DqAQIMAQTeoynRB6wACAQIEHYAowgWtAwg0CBB0g6pMF7QOIBAgQNABiCJc0DqAQIMAQTeoynRB6wACAQIEHYAowgWtAwg0CBB0g6pMF7QOIBAgQNABiCJc0DqAQIMAQTeoynRB6wACAQIEHYAowgWtAwg0CBB0g6pMF7QOIBAgQNABiCJc0DqAQIMAQTeoynRB6wACAQIEHYAowgWtAwg0CBB0g6pMF7QOIBAgQNABiCJc0DqAQIMAQTeoynRB6wACAQIEHYAowgWtAwg0CBB0g6pMF7QOIBAgQNABiCJc0DqAQIMAQTeoynRB6wACAQIEHYAowgWtAwg0CBB0g6pMF7QOIBAgQNABiCJc0DqAQIMAQTeoynRB6wACAQIEHYAowgWtAwg0CBB0g6pMF7QOIBAgQNABiCJc0DqAQIMAQTeoynRB6wACAQIEHYAowgWtAwg0CBB0g6pMF7QOIBAgQNABiCJc0DqAQIMAQTeoynRB6wACAQIEHYAowgWtAwg0CBB0g6pMF7QOIBAgQNABiCJc0DqAQIMAQTeoynRB6wACAQIEHYAowgWtAwg0CBB0g6pMF7QOIBAgQNABiCJc0DqAQIMAQTeoynRB6wACAQIEHYAowgWtAwg0CBB0g6pMF7QOIBAgQNABiCJc0DqAQIMAQTeoynRB6wACAQIEHYAowgWtAwg0CBB0g6pMF7QOIBAgQNABiCJc0DqAQIMAQTeoynRB6wACAQIEHYAowgWtAwg0CBB0g6pMF7QOIBAgQNABiCJc0DqAQIMAQTeoynRB6wACAQIEHYAowgWtAwg0CBB0g6pMF7QOIBAgQNABiCJc0DqAQIMAQTeoynRB6wACAQIEHYAowgWtAwg0CBB0g6pMF7QOIBAgQNABiCJc0DqAQIMAQTeoynRB6wACAQIEHYAowgWtAwg0CBB0g6pMF7QOIBAgQNABiCJc0DqAQIMAQTeoynRB6wACAQIEHYAowgWtAwg0CBB0g6pMF7QOIBAgQNABiCJc0DqAQIMAQTeoynRB6wACAQIEHYAowgWtAwg0CBB0g6pMF7QOIBAgQNABiCJc0DqAQIMAQTeoynRB6wACAQIEHYAowgWtAwg0CBB0g6pMF7QOIBAgQNABiCJc0DqAQIMAQTeoynRB6wACAQIEHYAowgWtAwg0CBB0g6pMF7QOIBAgQNABiCJc0DqAQIMAQTeoynRB6wACAQIEHYAowgWtAwg0CBB0g6pMF7QOIBAgQNABiCJc0DqAQIMAQTeoynRB6wACAQIEHYAowgWtAwg0CBB0g6pMF7QOIBAgQNABiCJc0DqAQIMAQTeoynRB6wACAQIEHYAo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')
      .end();
  }
};