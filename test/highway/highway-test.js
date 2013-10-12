#! /usr/bin/env node

var journeys = require('./journeys'),
    tek = require('tek'),
    JobQueue = tek['JobQueue'];

exports.doTest = function (test) {
    new JobQueue()
        .timeout(50000)
        .pushAll(Object.keys(journeys).map(function (name) {
            var journey = new journeys[name]().quiteDelay(1000);
            return function (next) {
                console.log('new journey:', name, 'start');
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