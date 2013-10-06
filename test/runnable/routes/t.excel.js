var should = require('should'),
    route = require('../../../routes/r.excel');

exports.csvDataTest = function (test) {
    route.csvData(function (data) {
        should.exist(data);
        test.done();
    });
};