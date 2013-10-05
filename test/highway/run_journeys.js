#! /usr/bin/env node

var journeys = require('./journeys'),
    tek = require('tek'),
    JobQueue = tek['JobQueue'];

new JobQueue()
    .timeout(5000)
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
        console.log('all journeys done!');
    });