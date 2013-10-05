/**
 * Created by okunishitaka on 10/5/13.
 */

var config = require('../../../app.config.js');
exports.base = 'http://localhost:' + config.set.port + '/';
exports.top = exports.base;