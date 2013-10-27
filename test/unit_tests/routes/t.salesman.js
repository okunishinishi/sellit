var should = require('should'),
    salesman = require('../../../routes/r.salesman.js');

exports.indexTest = function (test) {
    salesman.index(null, {
        render: function (view) {
            view.should.equal('salesman/index.jade');
            test.done();
        }
    });
};