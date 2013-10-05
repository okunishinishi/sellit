/**
 * User: okunishitaka
 * Date: 9/19/13
 * Time: 4:17 PM
 */

var webdriver = require('selenium-webdriver');

module.exports = function () {
    return new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
};