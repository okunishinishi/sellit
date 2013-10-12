/**
 * Created by okunishitaka on 10/5/13.
 */

var url = require('./url'),
    webdriver = require('selenium-webdriver'),
    should = require('should'),
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
        .then(function (form) {
            waitFormLoading(form)
                .then(function () {
                    rider.findByName('search_word').then(function (input) {
                        rider.setValue(input, '商事');
                        form.submit();
                    });
                });
            waitFormLoading(form)
                .then(function () {
                    rider.findAllBySelector('.client-list-item').then(function (li) {
                        li.forEach(function (li) {
                            li.getText().then(function (text) {
                                should.exist(text.match('商事'));
                            });
                        });
                    });
                })
                .then(callback);
        })
};