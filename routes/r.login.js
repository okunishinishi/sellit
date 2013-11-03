var db = require('../db'),
    toNameMap = require('../util/u.obj')['toNameMap'],
    Salesman = db.models['Salesman'];


exports = module.exports = function (req, res) {
    var data = req.body;
    Salesman.findAll(function (salesmen) {
        var salesman = toNameMap(salesmen)[data.username];
        if (salesman) {
            req.session.login_username = salesman.name;
            res.redirect(res.locals.url('/chart'));
        } else {
            res.render('index.jade', {
                login_err: true,
                username_list:Salesman.listNames(salesmen)
            });
        }
    });
};