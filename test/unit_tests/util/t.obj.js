/**
 * Created by okunishitaka on 10/7/13.
 */
var util = require('../../../util/u.obj.js'),
    toIdMap = util['toIdMap'],
    should = require('should');

exports.toIdMapTest = function (test) {
    toIdMap([
        {_id: 1, name: 'abc'}
    ]).should.have.property('1');
    test.done();
};