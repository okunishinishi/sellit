#! /usr/bin/env node

var journeys = require('./journeys'),
    tek = require('tek'),
    JobQueue = tek['JobQueue'];

exports.masterTest = function (test) {
    var Journey = journeys['master'],
        journey = new Journey().quiteDelay(500);
    journey.takeoff(function () {
        journey.gohome(function () {
            test.done();
        });
    });
};

exports.clientTest = function (test) {
    var Journey = journeys['client'],
        journey = new Journey().quiteDelay(500);
    journey.takeoff(function () {
        journey.gohome(function () {
            test.done();
        });
    });
};

exports.chartTest = function (test) {
    var Journey = journeys['chart'],
        journey = new Journey().quiteDelay(500);
    journey.takeoff(function () {
        journey.gohome(function () {
            test.done();
        });
    });
};