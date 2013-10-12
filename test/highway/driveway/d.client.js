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