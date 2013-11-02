var should = require('should'),
    en = require('../../../locale/en'),
    ja = require('../../../locale/ja');

exports.exportsTest = function (test) {
    should.exist(ja.app.name);
    test.done();
};