var path = require('path');
var fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,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DhAgQKBUQEGXDkYsAgQIKGg7QIAAgVIBBV06GLEIECCgoO0AAQIESgUUdOlgxCJAgICCtgMECBAoFVDQpYMRiwABAgraDhAgQKBUQEGXDkYsAgQIKGg7QIAAgVIBBV06GLEIECCgoO0AAQIESgUUdOlgxCJAgICCtgMECBAoFVDQpYMRiwABAgraDhAgQKBUQEGXDkYsAgQIKGg7QIAAgVIBBV06GLEIECCgoO0AAQIESgUUdOlgxCJAgICCtgMECBAoFVDQpYMRiwABAgraDhAgQKBUQEGXDkYsAgQIKGg7QIAAgVIBBV06GLEIECCgoO0AAQIESgUUdOlgxCJAgICCtgMECBAoFVDQpYMRiwABAgraDhAgQKBUQEGXDkYsAgQIKGg7QIAAgVIBBV06GLEIECCgoO0AAQIESgUUdOlgxCJAgICCtgMECBAoFVDQpYMRiwABAgraDhAgQKBUQEGXDkYsAgQIKGg7QIAAgVIBBV06GLEIECCgoO0AAQIESgUUdOlgxCJAgICCtgMECBAoFVDQpYMRiwABAgraDhAgQKBUQEGXDkYsAgQIKGg7QIAAgVIBBV06GLEIECCgoO0AAQIESgUUdOlgxCJAgICCtgMECBAoFVDQpYMRiwABAgraDhAgQKBUQEGXDkYsAgQIKGg7QIAAgVIBBV06GLEIECCgoO0AAQIESgUUdOlgxCJAgICCtgMECBAoFVDQpYMRiwABAgraDhAgQKBUQEGXDkYsAgQIKGg7QIAAgVIBBV06GLEIECCgoO0AAQIESgUUdOlgxCJAgICCtgMECBAoFVDQpYMRiwABAgraDhAgQKBUQEGXDkYsAgQIKGg7QIAAgVIBBV06GLEIECCgoO0AAQIESgUUdOlgxCJAgICCtgMECBAoFVDQpYMRiwABAgraDhAgQKBUQEGXDkYsAgQIKGg7QIAAgVIBBV06GLEIECCgoO0AAQIESgUUdOlgxCJAgICCtgMECBAoFVDQpYMRiwABAgraDhAgQKBUQEGXDkYsAgQIKGg7QIAAgVIBBV06GLEIECCgoO0AAQIESgUUdOlgxCJAgICCtgMECBAoFVDQpYMRiwABAgraDhAgQKBUQEGXDkYsAgQIKGg7QIAAgVIBBV06GLEIECCgoO0AAQIESgUUdOlgxCJAgICCtgMECBAoFVDQpYMRiwABAgraDhAgQKBUQEGXDkYsAgQIKGg7QIAAgVIBBV06GLEIECCgoO0AAQIESgUUdOlgxCJAgICCtgMECBAoFVDQpYMRiwABAgraDhAgQKBUQEGXDkYsAgQIKGg7QIAAgVIBBV06GLEIECCgoO0AAQIESgUUdOlgxCJAgICCtgMECBAoFVDQpYMRiwABAgraDhAgQKBUQEGXDkYsAgQIKGg7QIAAgVIBBV06GLEIECCgoO0AAQIESgUUdOlgxCJAgICCtgMECBAoFVDQpYMRiwABAgraDhAgQKBUQEGXDkYsAgQIKGg7QIAAgVIBBV06GLEIECCgoO0AAQIESgUUdOlgxCJAgICCtgMECBAoFVDQpYMRiwABAgraDhAgQKBUQEGXDkYsAgQIKGg7QIAAgVIBBV06GLEIECCgoO0AAQIESgUUdOlgxCJAgICCtgMECBAoFVDQpYMRiwABAgraDhAgQKBUQEGXDkYsAgQIKGg7QIAAgVIBBV06GLEIECCgoO0AAQIESgUUdOlgxCJAgICCtgMECBAoFVDQpYMRiwABAgraDhAgQKBUQEGXDkYsAgQIKGg7QIAAgVIBBV06GLEIECCgoO0AAQIESgUUdOlgxCJAgICCtgMECBAoFVDQpYMRiwABAgraDhAgQKBUQEGXDkYsAgQIKGg7QIAAgVIBBV06GLEIECCgoO0AAQIESgUUdOlgxCJAgICCtgMECBAoFVDQpYMRiwABAgraDhAgQKBUQEGXDkYsAgQIKGg7QIAAgVIBBV06GLEIECCgoO0AAQIESgUUdOlgxCJAgICCtgMECBAoFVDQpYMRiwABAgraDhAgQKBUQEGXDkYsAgQIKGg7QIAAgVIBBV06GLEIECCgoO0AAQIESgUUdOlgxCJAgICCtgMECBAoFVDQpYMRiwABAgraDhAgQKBUQEGXDkYsAgQIKGg7QIAAgVIBBV06GLEIECCgoO0AAQIESgUUdOlgxCJAgICCtgMECBAoFVDQpYMRiwABAgraDhAgQKBUQEGXDkYsAgQIKGg7QIAAgVIBBV06GLEIECCgoO0AAQIESgUUdOlgxCJAgICCtgMECBAoFVDQpYMRiwABAgraDhAgQKBUQEGXDkYsAgQIKGg7QIAAgVIBBV06GLEIECCgoO0AAQIESgUUdOlgxCJAgICCtgMECBAoFVDQpYMRiwABAgraDhAgQKBUQEGXDkYsAgQIKGg7QIAAgVIBBV06GLEIECCgoO0AAQIESgUUdOlgxCJAgICCtgMECBAoFVDQpYMRiwABAgraDhAgQKBUQEGXDkYsAgQIKGg7QIAAgVIBBV06GLEIECCgoO0AAQIESgUUdOlgxCJAgICCtgMECBAoFVDQpYMRiwABAgraDhAgQKBUQEGXDkYsAgQIKGg7QIAAgVIBBV06GLEIECCgoO0AAQIESgUUdOlgxCJAgICCtgMECBAoFVDQpYMRiwABAgraDhAgQKBUQEGXDkYsAgQIKGg7QIAAgVIBBV06GLEIECCgoO0AAQIESgUUdOlgxCJAgICCtgMECBAoFVDQpYMRiwABAl8GOuPA09a6AiUAAAAASUVORK5CYII=')
      .end();
  }
};