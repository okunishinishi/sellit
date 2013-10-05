/**
 * Created by okunishitaka on 10/5/13.
 */

var url = require('./url');

exports.goTop = function (rider, callback) {
    rider.get(url.top);
    callback();
};