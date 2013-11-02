var tek = require('tek'),
    copy = tek.meta.copy,
    en = require('./en');

copy.deep(en, exports);
console.log('en', en);
console.log('exports', exports);

var app = exports.app = exports.app || {};

var msg = exports.msg = exports.msg || {};

var err = exports.err = exports.err || {};

var btn = exports.btn = exports.btn || {};

var lbl = exports.lbl = exports.lbl || {};
lbl.scale_unit = '人月';

var plh = exports.plh = exports.plh || {};

var alt = exports.alt = exports.alt || {};