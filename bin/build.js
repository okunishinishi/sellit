#!/usr/bin/env node

var tek = require('tek'),
    tekHTML = require('tek-html'),
    file = tek['file'],
    hbs = tek['hbs'],

    resolve = require('path')['resolve'];


(function compileHbs(precompileDir) {
    var publicDIr = resolve(__dirname, '../public'),
        hbsDir = resolve(publicDIr, 'hbs'),
        outpath = resolve(publicDIr, 'javascripts/templates.js');
    precompileDir(hbsDir, outpath, function () {
        console.log('hbs precompiled to :', outpath);
    });
})(hbs.precompileDir);


var config = require('../app.config'),
    JobQueue = tek['JobQueue'],
    publicDir = config.publicDir;

(function (js_filenames) {
    var out_dir = resolve(publicDir, 'javascripts', 'lib');
    var publishQueue = new JobQueue;
    js_filenames.forEach(function (filename) {
        publishQueue.push(function (next) {
            tekHTML.publish(filename, out_dir, next);
        });
    });
    publishQueue.execute(function () {
        console.log('js publish done');
    });
})([
        'tek.js',
        'tek.view.js',
        'jquery.treeview.js'
    ]);

(function (less_filenames) {
    var out_dir = resolve(publicDir, 'stylesheets', 'lib');
    var publishQueue = new JobQueue;
    less_filenames.forEach(function (filename) {
        publishQueue.push(function (next) {
            tekHTML.publish(filename, out_dir, next);
        });
    });
    publishQueue.execute(function () {
        console.log('less publish done');
    });
})([
        'tek-mixin.less',
        'tek-theme-clean.less',
        'jquery.treeview.less'
    ]);




