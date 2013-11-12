/**
 * Created by okunishitaka on 10/29/13.
 */
var should = require('should'),
    Client = require('../../../db').models['Client'];

exports.listPropertiesTest = function (test) {
    var properties = Client.listProperties([
        {
            key1: 1,
            key2: 2
        },
        {
            key2: 2,
            key3: 3
        }
    ]);
    properties.should.be.lengthOf(3);
    test.done();
};


exports.listTopLevelGroupsTest = function (test) {
    var groups = Client.listTopLevelGroups([
        new Client({
            name: 'alone',
            children_ids: null
        }),
        new Client({
            name: 'top level',
            children_ids: '[4,5,6]'
        }),
        new Client({
            name: 'middle',
            parent_id: '1',
            children_ids: '[1,2,3]'
        })
    ]);
    groups.should.be.lengthOf(1);
    groups[0].name.should.equal('top level');
    test.done();
};