var db = require('../db'),
    toNameMap = require('../util/u.obj')['toNameMap'],
    Salesman = db.models['Salesman'];


module.exports = function (req, res) {
    var data = req.body;
    Salesman.findAll(function (salesmen) {
        var salesman = toNameMap(salesmen)[data.username];
        if (salesman) {
            res.redirect(res.locals.url('/chart'));
        } else {
            res.render('index.jade', {
                login_err: true,
                salesmen: salesmen
            });
        }
    });
};