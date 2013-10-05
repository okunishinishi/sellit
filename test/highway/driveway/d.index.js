/**
 * Created by okunishitaka on 10/5/13.
 */

var url = require('./url'),
    webdriver = require('selenium-webdriver'),
    By = webdriver['By'];

exports.goTop = function (rider, callback) {
    rider.get(url.top).then(callback);
};

exports.addClient = function (rider, name, callback) {
    var waitFormLoading = function (form) {
        rider.wait(function () {
            return form.getAttribute('class').then(function (styleClass) {
                return !styleClass.match('tk-loading');
            });
        }, 1000);
        return form;
    };
    rider.findById('client-list-form')
        .then(waitFormLoading)
        .then(function () {
            rider.findById('client-add-btn').click();
            rider.findAllBySelector("#client_list li").then(function (li) {
                var lastLi = li[li.length - 1];
                lastLi.findByName('name').sendKeys(name);
                lastLi.findByName('edit-form').then(function (form) {
                    form.submit();
                    waitFormLoading(form);
                });
            });
        })
        .then(callback);
};