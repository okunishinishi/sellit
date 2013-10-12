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
    var listItem = null;
    rider.findById('client-list-form')
        .then(function (form) {
            rider.waitToClassRemove(form, 'tk-loading')
        })
        .then(function () {
            rider.findById('client-add-btn').click();
            rider.findAllBySelector('ul#client_list li').then(function (li) {
                listItem = li[li.length - 1];
                listItem.findByName('edit-form')
                    .then(function (form) {
                        Object.keys(values).forEach(function (name) {
                            var value = values[name],
                                input = form.findByName(name);
                            rider.setValue(input, value);
                            input.sendKeys(Key.ENTER);
                        });
                        return form;
                    })
                    .then(function (form) {
                        rider.waitToClassRemove(form, 'tk-loading');
                    });
            })
        })
        .then(function () {
            callback(listItem);
        })
    ;
};

exports.goDetail = function (rider, li, callback) {
    li.findBySelector('[data-role="detail-link"]').click().then(function () {
        callback();
    })
};

exports.destroyLastModel = function (rider, callback) {
    rider.findById('client-list-form')
        .then(function (form) {
            rider.waitToClassRemove(form, 'tk-loading')
        })
        .then(function () {
            rider.findAllBySelector('ul#client_list li').then(function (li) {
                var last = li[li.length - 1];
                last.findByName('destroy-form')
                    .then(function (form) {
                        form.findBySelector('[data-role="submit-btn"]').click();
                        rider.findBySelector('[for="confirm-dialog-check"]').click();
                        rider.findBySelector('.confirm-dialog form input[type="submit"]').click();
                        rider.waitToClassRemove(form, 'tk-loading')
                    })

            })
        })
        .then(callback);
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

exports.goChart = function (rider, callback) {
    rider.findAllBySelector('header nav .nav-item')
        .then(function (items) {
            items[0].click()

        })
        .then(callback);
};