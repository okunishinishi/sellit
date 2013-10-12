#! /usr/bin/env node

var journeys = require('./journeys'),
    tek = require('tek'),
    JobQueue = tek['JobQueue'];

exports.doTest = function (test) {
    new JobQueue()
        .timeout(50000)
        .pushAll(
            Object.keys(journeys)
                .map(function (name) {
                    var Journey = journeys[name];
                    Journey.journey_name = name;
                    return Journey;
                }).sort(function (a, b) {
                    return b._priority - a._priority;
                }).map(function (Journey) {
                    return function (next) {
                        var journey = new Journey().quiteDelay(100);
                        console.log('new journey:', Journey.journey_name, 'start');
                        journey.takeoff(function () {
                            console.log(' takeoff done.');
                            journey.gohome(function () {
                                console.log(' gohome done.');
                                next();
                            });
                        });
                    };
                }))
        .execute(function () {
            test.done();
        });
};