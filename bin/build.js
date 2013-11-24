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


(function minifyJs(config) {
    var minify = tekHTML.minify;
    var jsDir = config.jsDir,
        libDir = resolve(jsDir, 'lib'),
        libAllJs = resolve(jsDir, 'lib.min.js');
    minify.minifyAllJS(libDir, libAllJs, function () {
        console.log('lib js minified to :', libAllJs);
    }, [/jquery\.js$/, /jquery/, /handlebars/, /tek\.js$/, /tek/]);
})(config);


