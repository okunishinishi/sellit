/**
 * Created by okunishitaka on 10/5/13.
 */

var url = require('./url'),
    webdriver = require('selenium-webdriver'),
    By = webdriver['By'],
    Key = webdriver['Key'];


exports.goTop = function (rider, callback) {
    rider.get(url.top).then(callback);
};

exports.addClient = function (rider, name, callback) {
    function waitFormLoading(form) {
        rider.wait(function () {
            return form.getAttribute('class').then(function (styleClass) {
                return !styleClass.match('tk-loading');
            });
        }, 1000);
        return form;
    }

    function waitUntilVisible(element) {
        rider.wait(function () {
            return element.isDisplayed().then(function (displayed) {
                return displayed;
            });
        }, 1000);
        return element;
    }

    rider.findById('client-list-form')
        .then(waitFormLoading)
        .then(function () {
            rider.findById('client-add-btn').click();
            rider.findAllBySelector("#client_list li").then(function (li) {
                var lastLi = li[li.length - 1];
                lastLi.findByName('name').then(function (input) {
                    waitUntilVisible(input);
                    input.sendKeys(name);
                    input.sendKeys(Key.RETURN)
                });
                lastLi.findByName('edit-form').then(function (form) {
                    form.submit();
                    waitFormLoading(form);
                });
            });
        })
        .then(callback);
};