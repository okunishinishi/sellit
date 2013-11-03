var db = require('../db'),
    Salesman = db.models['Salesman'];


module.exports = function (req, res) {
    Salesman.findAll(function (salesmen) {
        res.render('index.jade', {
            username_list:Salesman.listNames(salesmen)
        });
    });
};