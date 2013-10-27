/**
 * User: okunishitaka
 * Date: 9/20/13
 * Time: 6:44 AM
 */

var lessMiddleware = require('less-middleware'),
    express = require('express'),
    path = require('path'),
    env = process['env'],
    resolve = path['resolve'];


exports.viewDir = resolve(__dirname, 'views');
exports.publicDir = resolve(__dirname, 'public');
exports.uploadDir = resolve(exports.publicDir, 'uploaded');
exports.jsDir = resolve(exports.publicDir, 'javascripts');
exports.imgDir = resolve(exports.publicDir, 'images');
exports.cssDir = resolve(exports.publicDir, 'stylesheets');

exports.hbsDir = resolve(exports.publicDir, 'hbs');
exports.hbsTemplateFile = resolve(exports.publicDir, "javascripts/templates.js");

exports.set = {
    'port': env['PORT'] || eval('3066'),
    'views': exports.viewDir,
    'view engine': 'jade'
};

exports.use = [
    express['favicon'](),
    express.logger('dev'),
    express['bodyParser'](),
    express['methodOverride'](),
    lessMiddleware({src: exports.publicDir}),
    express.static(exports.publicDir)
];

exports.db = {
    kind: 'sqlite3',
    host: resolve(__dirname),
    name: 'sellit'.replace(/\./g, '_') + ".db"
};

exports.backup = {
    interval: 24 * 60 * 60 * 1000,
    max_count: 3,
    dirpath: resolve(__dirname, 'backup')
};

exports.context = '';
exports.package = require('./package.json');