var should = require('should'),
    system = require('../../../routes/r.system.js');

exports.indexTest = function (test) {
    system.index(null, {
        render: function (view) {
            view.should.equal('system/index.jade');
            test.done();
        }
    });
};