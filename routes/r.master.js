var tek = require('tek'),
    copy = tek['meta']['copy'],
    db = require('../db');

exports.index = function (req, res) {
    res.render('master/index.jade', {});
};

