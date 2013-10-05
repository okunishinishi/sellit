/**
 * Created by okunishitaka on 10/5/13.
 */
var tek = require('tek'),
    define = tek['meta']['define'];

module.exports = define({
    attrAccessor: "quiteDelay".split(','),
    properties: {
        _quiteDelay: 5000,
        newRider: require('./new_rider'),
        takeoff: function (callback) {
            var s = this;
            callback && callback.call(s);
        },
        gohome: function (callback) {
            var s = this;
            setTimeout(function () {
                s.rider.quit(function(){
                    console.log('quit');
                });
                callback && callback();
            }, s._quiteDelay);
        }
    }
});