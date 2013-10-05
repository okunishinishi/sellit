/**
 * Created by okunishitaka on 10/5/13.
 */
var tek = require('tek'),
    define = tek['meta']['define'],
    driveway = require('../sellit_driveway'),
    Journey = require('./journey');

module.exports = define({
    init: function () {
        var s = this;
        s.rider = s.newRider();
    },
    prototype: Journey,
    properties: {
        takeoff: function (callback) {
            var s = this,
                rider = s.rider,
                index = driveway.index;
            index.goTop(rider, function () {
                callback && callback.call(s);
            });
        }
    }
});