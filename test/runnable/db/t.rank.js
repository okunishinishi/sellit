/**
 * Created by okunishitaka on 10/7/13.
 */

var should = require('should'),
    Rank = require('../../../db/models/m.rank');

exports.RankTest = function (test) {
    var color = Rank.getColor();
    color.should.equal('#804040');
    test.done();
};
