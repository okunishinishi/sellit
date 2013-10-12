/**
 * Created by okunishitaka on 10/12/13.
 */


var url = require('./url'),
    webdriver = require('selenium-webdriver'),
    By = webdriver['By'],
    Key = webdriver['Key'];

exports.editMode = function (rider, callback) {
    rider.findById('edit-btn').click().then(function () {
        callback();
    });
};

exports.update = function (rider, values, callback) {
    rider.findById('client-detail-form')
        .then(function (form) {
            Object.keys(values).forEach(function (name) {
                var value = values[name];
                form.findByName(name).then(function (input) {
                    rider.setValue(input, value);
                });
            });
            form.findById('save-btn').click();
            return form;
        })
        .then(function (form) {
            rider.waitToClassRemove(form, 'tk-loading')
        })
        .then(function () {
            callback();
        });
};

exports.goTop = function (rider, callback) {
    rider.findBySelector('header .logo a').click().then(function () {
        callback();
    });
};