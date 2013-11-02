var tek = require('tek'),
    define = tek['meta']['define'],
    driveway = require('./driveway'),
    new_rider = require('./new_rider'),
    should = require('should');

var developer = driveway['developer'],
    rider = new_rider();

exports.tearDown = function (done) {
    done()
};
exports.goIndexTest = function (test) {
    developer.goIndex(rider, function () {
        test.done();
    });
};
exports.addModelTest = function (test) {
    developer.addModel(rider, {
        name: 'hello_developer'
    }, function () {
        test.done();
    });
};
exports.updateModelTest = function (test) {
    developer.updateModel(rider, {
        name: 'next_developer'
    }, function () {
        test.done();
    });
};
exports.searchModelTest = function (test) {
    developer.searchModel(rider, "developer", function (result) {
        should.exist(result);
        test.done();
    });
};
exports.removeModelTest = function (test) {
    developer.removeModel(rider, function () {
        test.done();
    });
};