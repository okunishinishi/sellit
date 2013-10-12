/**
 * Created by okunishitaka on 10/12/13.
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
        _priority: 10,
        takeoff: function (callback) {
            var s = this,
                rider = s.rider,
                index = driveway.index,
                chart = driveway.chart;
            new JobQueue()
                .timeout(500000)
                .push(function (next) {
                    index.goTop(rider, next);
                })
                .push(function (next) {
                    index.goChart(rider, next);
                })
                .push(function (next) {
                    chart.sortByCol(rider, 0, function (data) {
                        (data[0].localeCompare(data[1]) >= 0).should.be.true;
                        (data[1].localeCompare(data[2]) >= 0).should.be.true;
                        next();
                    });
                })
                .push(function (next) {
                    chart.sortByCol(rider, 0, function (data) {
                        (data[0].localeCompare(data[1]) <= 0).should.be.true;
                        (data[1].localeCompare(data[2]) <= 0).should.be.true;
                        next();
                    });
                })
                .push(function (next) {
                    chart.sortByCol(rider, 1, function (data) {
                        (data[0].localeCompare(data[1]) >= 0).should.be.true;
                        (data[1].localeCompare(data[2]) >= 0).should.be.true;
                        next();
                    });
                })
                .push(function (next) {
                    chart.sortByCol(rider, 2, function (data) {
                        (data[0].localeCompare(data[1]) >= 0).should.be.true;
                        (data[1].localeCompare(data[2]) >= 0).should.be.true;
                        next();
                    });
                })
                .execute(callback);
        }
    }
});