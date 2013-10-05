/**
 * User: okunishitaka
 * Date: 9/21/13
 * Time: 6:24 PM
 */

var tek = require('tek'),
    tekWeb = require('tek-web'),
    DB = tekWeb['DB'],
    connectors = DB['connectors'],
    models = require('./models'),
    config = require('../app.config')['db'];

function newDB() {
    var url = [config.host, config.name].join('/');
    return new DB(url, models, connectors[config.kind]);
}

exports = module.exports = newDB();


exports.newDB = newDB;


