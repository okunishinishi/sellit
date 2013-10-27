var tek = require('tek'),
    define = tek['meta']['define'],
    driveway = require('./driveway'),
    new_rider = require('./new_rider'),
    should = require('should');

var salesman = driveway['salesman'],
    rider = new_rider();

exports.tearDown = function (done) {
    done()
};
exports.goIndexTest = function (test) {
    salesman.goIndex(rider, function () {
        test.done();
    });
};
exports.addModelTest = function (test) {
    salesman.addModel(rider, {
        name: 'hello_salesman'
    }, function () {
        test.done();
    });
};
exports.updateModelTest = function (test) {
    salesman.updateModel(rider, {
        name: 'next_salesman'
    }, function () {
        test.done();
    });
};
exports.searchModelTest = function (test) {
    salesman.searchModel(rider, "salesman", function (result) {
        should.exist(result);
        test.done();
    });
};
exports.removeModelTest = function (test) {
    salesman.removeModel(rider, function () {
        test.done();
    });
};