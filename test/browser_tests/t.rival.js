var tek = require('tek'),
    define = tek['meta']['define'],
    driveway = require('./driveway'),
    new_rider = require('./new_rider'),
    should = require('should');

var rival = driveway['rival'],
    rider = new_rider();

exports.tearDown = function (done) {
    done()
};
exports.goIndexTest = function (test) {
    rival.goIndex(rider, function () {
        test.done();
    });
};
exports.addModelTest = function (test) {
    rival.addModel(rider, {
        name: 'hello_rival'
    }, function () {
        test.done();
    });
};
exports.updateModelTest = function (test) {
    rival.updateModel(rider, {
        name: 'next_rival'
    }, function () {
        test.done();
    });
};
exports.searchModelTest = function (test) {
    rival.searchModel(rider, "rival", function (result) {
        should.exist(result);
        test.done();
    });
};
exports.removeModelTest = function (test) {
    rival.removeModel(rider, function () {
        test.done();
    });
};