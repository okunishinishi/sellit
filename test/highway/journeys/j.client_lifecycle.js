/**
 * Created by okunishitaka on 10/5/13.
 */
var tek = require('tek'),
    define = tek['meta']['define'],
    driveway = require('../driveway'),
    should = require('should'),
    JobQueue = tek['JobQueue'],
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
                index = driveway.index,
                client = driveway.client;
            new JobQueue()
                .push(function (next) {
                    index.goTop(rider, next);
                })
                .push(function (next) {
                    index.searchClient(rider, '商事', function (data) {
                        data.forEach(function (text) {
                            should.exist(text.match('商事'));
                        });
                        next();
                    });
                })
                .push(function (next) {
                    index.addModel(rider, {name: 'やまだhighway'}, function (li) {
                        index.goDetail(rider, li, function () {
                            next();
                        });
                    })
                })
                .push(function (next) {
                    rider.getCurrentUrl().then(function (url) {
                        client.editMode(rider, function(){

                        });
                        console.log('url', url);
                        next();
                    });
                })
                .execute(callback);
        }
    }
});