var tek = require('tek'),
    copy = tek['meta']['copy'],
    util = require('../util'),
    findAllModels = util['mdl']['findAllModels'],
    toIdMap = util['obj']['toIdMap'],
    db = require('../db'),
    models = db.models,
    Client = models['Client'],
    Rival = models['Rival'];


/**
 * show index page
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
    var clients = res.locals.clients;
    console.log('clients', clients);
    findAllModels([Rival], function (rivals) {
        var rows = clients.map(function (client) {
            return [
                {
                    text: client.name,
                    href: ['/client/' + client._id, 't=' + res.locals.time].join('?')
                }
            ]
        });

        res.render('chart/index.jade', {
            rows: rows
        });
    });
};

