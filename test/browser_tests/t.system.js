var tek = require('tek'),
    define = tek['meta']['define'],
    driveway = require('./driveway'),
    new_rider = require('./new_rider'),
    should = require('should');

var system = driveway['system'],
    rider = new_rider();

exports.tearDown = function (done) {
    done()
};
exports.goIndexTest = function (test) {
    system.goIndex(rider, function () {
        test.done();
    });
};
exports.addModelTest = function (test) {
    system.addModel(rider, {
        name: 'hello_system'
    }, function () {
        test.done();
    });
};
exports.updateModelTest = function (test) {
    system.updateModel(rider, {
        name: 'next_system'
    }, function () {
        test.done();
    });
};
exports.searchModelTest = function (test) {
    system.searchModel(rider, "system", function (result) {
        should.exist(result);
        test.done();
    });
};
exports.removeModelTest = function (test) {
    system.removeModel(rider, function () {
        test.done();
    });
};