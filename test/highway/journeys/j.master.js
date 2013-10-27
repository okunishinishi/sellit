/**
 * Created by okunishitaka on 10/13/13.
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
        _priority: 1000,
        takeoff: function (callback) {
            var s = this,
                rider = s.rider,
                index = driveway.index,
                rank = driveway.rank,
                product = driveway.product;
            new JobQueue()
                .timeout(500000)
                .push(function (next) {
                    index.goTop(rider, next);
                })
                .push(function (next) {
                    index.goMaster(rider, next);
                })
                .pushAll([

                    //rank tests

                    function (next) {
                        var searchWord = 'S';
                        rank.searchModel(rider, searchWord, function (result) {
                            rider.executeScript("location.href='#rank_list'");
                            result && result.forEach(function (text) {
                                should.exist(text.match(searchWord));
                            });
                            next();
                        });
                    }, function (next) {
                        rank.addModel(rider, {name: 'new_rank'}, function () {
                            next();
                        });
                    }, function (next) {
                        rank.updateModel(rider, {name: 'new_rank_renamed'}, function () {
                            next();
                        })
                    },
                    function (next) {
                        rank.removeModel(rider, function () {
                            next();
                        });
                    }
                ])
                .pushAll([

                    //product tests

                    function (next) {
                        rider.executeScript("location.href='#product_list'");
                        var searchWord = '緑';
                        product.searchModel(rider, searchWord, function (result) {
                            result && result.forEach(function (text) {
                                should.exist(text.match(searchWord));
                            });
                            next();
                        });
                    },
                    function (next) {
                        product.addModel(rider, {name: 'new_product'}, function () {
                            next();
                        });
                    },
                    function (next) {
                        product.updateModel(rider, {name: 'new_product_renamed'}, function () {
                            next();
                        });
                    },
                    function (next) {
                        product.removeModel(rider, function () {
                            next();
                        });
                    }
                ])
                .execute(callback);
        }
    }
})
;