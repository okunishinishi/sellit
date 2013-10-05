#!/usr/bin/env node

var tek = require('tek'),
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





