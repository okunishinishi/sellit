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
