/**
 * Created by okunishitaka on 10/7/13.
 */
var util = require('../../../util/u.obj.js'),
    toIdMap = util['toIdMap'],
    distinctAttr = util.distinctAttr,
    should = require('should');

exports.toIdMapTest = function (test) {
    toIdMap([
        {_id: 1, name: 'abc'}
    ]).should.have.property('1');
    test.done();
};
exports.distinctAttrTest = function (test) {
    var data = distinctAttr([
        {name: 'name1'},
        {name: 'name2'},
        {name: 'name3'},
        {name: 'name1'}
    ], 'name');
    data.should.be.lengthOf(3);
    test.done();
};