let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAFoCAYAAAB65WHVAAAWLUlEQVR4Xu3dDazeZXnH8R+dw9WiGdhJTGqWkUxljEpsZTrkRV2kOsHBMDLmWBG2ONnA6OTFGB0wuoFMp45IUND4ioRgFjdkIkh4kchAmU7mZLiBRAgwdQ5qNbVd7vNS7eG0nHouHi7Y50lMQM+5nruf++43//zP/zzuFC8CBAgQaCmwU8tVWRQBAgQIRKAdAgIECDQVEOimG2NZBAgQEGhngAABAk0FBLrpxlgWAQIEBNoZIECAQFMBgW66MZZFgAABgXYGCBAg0FRAoJtujGURIEBAoJ0BAgQINBUQ6KYbY1kECBAQaGeAAAECTQUEuunGWBYBAgQE2hkgQIBAUwGBbroxlkWAAAGBdgYIECDQVECgm26MZREgQECgnQECBAg0FRDophtjWQQIEBBoZ4AAAQJNBQS66cZYFgECBATaGSBAgEBTAYFuujGWRYAAAYF2BggQINBUQKCbboxlESBAQKCdAQIECDQVEOimG2NZBAgQEGhngAABAk0FBLrpxlgWAQIEBNoZIECAQFMBgW66MZZFgAABgXYGCBAg0FRAoJtujGURIEBAoJ0BAgQINBUQ6KYbY1kECBAQaGeAAAECTQUEuunGWBYBAgQE2hkgQIBAUwGBbroxlkWAAAGBdgYIECDQVECgm26MZREgQECgnQECBAg0FRDophtjWQQIEBBoZ4AAAQJNBQS66cZYFgECBATaGSBAgEBTAYFuujGWRYAAAYF2BggQINBUQKCbboxlESBAQKCdAQIECDQVEOimG2NZBAgQEGhngAABAk0FBLrpxlgWAQIEBNoZIECAQFMBgW66MZZFgAABgXYGCBAg0FRAoJtujGURIEBAoJ0BAgQINBUQ6KYbY1kECBAQaGeAAAECTQUEuunGWBYBAgQE2hkgQIBAUwGBbroxlkWAAAGBdgYIECDQVECgm26MZREgQECgnQECBAg0FRDophtjWQQIEBBoZ4AAAQJNBQS66cZYFgECBATaGSBAgEBTAYFuujGWRYAAAYF2BggQINBUQKCbboxlESBAQKCdAQIECDQVEOimG2NZBAgQEGhngAABAk0FBLrpxlgWAQIEBNoZIECAQFMBgW66MZZFgAABgXYGCBAg0FRAoJtujGURIEBAoJ0BAgQINBUQ6KYbY1kECBAQaGeAAAECTQUEuunGWBYBAgQE2hkgQIBAUwGBbroxlkWAAAGBdgYIECDQVECgm26MZREgQECgnQECBAg0FRDophtjWQQIEBBoZ4AAAQJNBQS66cZYFgECBATaGSBAgEBTAYFuujGWRYAAAYF2BggQINBUQKCbboxlESBAQKCdAQIECDQVEOimG2NZBAgQEGhngAABAk0FBLrpxlgWAQIEBNoZIECAQFMBgW66MZZFgAABgXYGCBAg0FRAoJtujGURIEBAoJ0BAgQINBUQ6KYbY1kECBAQaGeAAAECTQUEuunGWBYBAgQE2hkgQIBAUwGBbroxlkWAAAGBdgYIECDQVECgm26MZREgQECgnQECBAg0FRDophtjWQQIEBBoZ4AAAQJNBQS66cZYFgECBATaGSBAgEBTAYFuujGWRYAAAYF2BggQINBUQKCbboxlESBAQKCdAQIECDQVEOimG2NZBAgQEGhngAABAk0FBLrpxlgWAQIEBNoZIECAQFMBgW66MZZFgAABgXYGCBAg0FRAoJtujGURIEBAoJ0BAgQINBUQ6KYbY1kECBAQaGeAAAECTQUEuunGWBYBAgQE2hkgQIBAUwGBbroxlkWAAAGBdgYIECDQVECgm26MZREgQECgnQECBAg0FRDophtjWQQIEBBoZ4AAAQJNBQS66cZYFgECBATaGSBAgEBTAYFuujGWRYAAAYF2BggQINBUQKCbboxlESBAQKCdAQIECDQVEOimG2NZBAgQEGhngAABAk0FBLrpxlgWAQIEBNoZIECAQFMBgW66MZZFgAABgXYGCBAg0FRAoJtujGURIEBAoJ0BAgQINBUQ6KYbY1kECBAQaGeAAAECTQUEuunGWBYBAgQE2hkgQIBAUwGBbroxlkWAAAGBdgYIECDQVECgm26MZREgQECgnQECBAg0FRDophtjWQQIEBBoZ4AAAQJNBQS66cZYFgECBATaGSBAgEBTAYFuujGWRYAAAYF2BggQINBUQKCbboxlESBAQKCdAQIECDQVEOimG2NZBAgQEGhngAABAk0FBLrpxlgWAQIEBNoZIECAQFMBgW66MZZFgAABgXYGCBAg0FRAoJtujGURIEBAoJ0BAgQINBUQ6KYbY1kECBAQaGfgcSVw0003bX5c/YEm/4f53urVq3ed/Nt6x/kEBNq5eFwJCPSit1Og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')
      .end();
  }
};
