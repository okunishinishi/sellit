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

exports.addModel = function (rider, values, callback) {
    rider.findById('client-list-form')
        .then(function (form) {
            rider.waitToClassRemove(form, 'tk-loading')
        })
        .then(function () {
            rider.findById('client-add-btn').click();
            rider.findAllBySelector('ul#client_list li').then(function (li) {
                var last = li[li.length - 1];
                Object.keys(values).forEach(function (name) {
                    var value = values[name],
                        input = last.findByName(name);
                    rider.setValue(input, value);
                    input.sendKeys(Key.ENTER);
                });
            })
                .then(function () {
                    callback();
                })
        })
    ;
};


exports.searchClient = function (rider, searchWord, callback) {
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

    var result = [];
    rider.findById('client-list-form')
        .then(function (form) {
            waitFormLoading(form)
                .then(function () {
                    rider.findByName('search_word').then(function (input) {
                        rider.setValue(input, searchWord);
                        form.submit();
                    });
                });
            waitFormLoading(form)
                .then(function () {
                    rider.findAllBySelector('.client-list-item').then(function (li) {
                        li.forEach(function (li) {
                            li.getText().then(function (text) {
                                result.push(text);
                            });
                        });
                    });
                })
                .then(function () {
                    callback && callback(result);
                });
        })
};