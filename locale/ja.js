var tek = require('tek'),
    copy = tek.meta.copy,
    en = require('./en');

copy.deep(en, exports);

var l = exports;

var app = exports.app = exports.app || {};

var msg = exports.msg = exports.msg || {};

var err = exports.err = exports.err || {};


var lbl = exports.lbl = exports.lbl || {};
lbl.cd = 'システム名称';
lbl.provider = '担当会社';
lbl.scale = '開発規模';
lbl.freeword = '営業情報';
lbl.scale_unit = '人月';
lbl.all = '全表示';
lbl.code = lbl.cd;
lbl.start_at = '導入時期';
lbl.initial_provider = '初期開発会社';
lbl.current_provider = '現担当会社　';

l.msg.send_issue = {
    prefix: 'このシステムに対する改善要望・不具合報告は',
    link_text: 'こちら',
    suffix: 'まで。'
};


l.btn = exports.btn || {};
l.btn.to_page_top = 'ページの先頭へ';

var plh = exports.plh = exports.plh || {};

var alt = exports.alt = exports.alt || {};