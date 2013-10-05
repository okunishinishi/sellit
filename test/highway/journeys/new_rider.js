/**
 * User: okunishitaka
 * Date: 9/19/13
 * Time: 4:17 PM
 */

var webdriver = require('selenium-webdriver'),
    By = webdriver['By'],
    tek = require('tek'),
    copy = tek['meta']['copy'];

var methods = {
    findBy: function (by, value) {
        var s = this;
        return s.findElement(by(value));
    },
    findAllBy: function (by, value) {
        var s = this;
        return s.findElements(by(value));
    },
    findByName: function (name) {
        var s = this;
        return s.findBy(By.name, name);
    },
    findAllByName: function (name) {
        var s = this;
        return s.findAllBy(By.name, name);
    },
    findById: function (id) {
        var s = this;
        return s.findBy(By.id, id);
    },
    findBySelector: function (selector) {
        var s = this;
        return s.findBy(By.css, selector)
    },
    findAllBySelector: function (selector) {
        var s = this;
        return s.findAllBy(By.css, selector)
    }
};
copy(methods, webdriver.WebDriver.prototype);
copy(methods, webdriver.WebElement.prototype);

module.exports = function () {
    return new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
};