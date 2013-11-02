var should = require('should'),
    developer = require('../../../routes/r.developer.js');

exports.indexTest = function (test) {
    developer.index(null, {
        render: function (view) {
            view.should.equal('developer/index.jade');
            test.done();
        }
    });
};