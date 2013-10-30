var tek = require('tek'),
    copy = tek.meta.copy,
    en = require('./en');

exports = copy.deep(en, exports);

var app = exports.app = {};

var msg = exports.msg = {};

var err = exports.err = {};

var btn = exports.btn = {};

var lbl = exports.lbl = {};

var plh = exports.plh = {};

var alt = exports.alt = {};