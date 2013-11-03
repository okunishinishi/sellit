var tek = require('tek'),
    copy = tek.meta.copy,
    en = require('./en');

copy.deep(en, exports);

var app = exports.app = exports.app || {};

var msg = exports.msg = exports.msg || {};

var err = exports.err = exports.err || {};

var btn = exports.btn = exports.btn || {};

var lbl = exports.lbl = exports.lbl || {};
lbl.cd = 'PJコード';
lbl.provider = '担当会社';
lbl.scale = '開発規模';
lbl.freeword = '営業情報';
lbl.scale_unit = '人月';
lbl.all = '全表示';

var plh = exports.plh = exports.plh || {};

var alt = exports.alt = exports.alt || {};