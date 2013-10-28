/**
 * User: okunishitaka
 * Date: 9/21/13
 * Time: 6:29 PM
 */

var should = require('should'),
    db = require('../../../db');

exports.tearDown = function (done) {
    db.close();
    done();
};