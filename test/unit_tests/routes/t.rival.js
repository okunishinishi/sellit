var should = require('should'),
    rival = require('../../../routes/r.rival.js');

exports.indexTest = function (test) {
    rival.index(null, {
        render: function (view) {
            view.should.equal('rival/index.jade');
            test.done();
        }
    });
};