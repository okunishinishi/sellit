var tek = require('tek'),
    copy = tek['meta']['copy'],
    util = require('../util'),
    findAllModels = util['mdl']['findAllModels'],
    toNameMap = util['obj']['toNameMap'],
    db = require('../db'),
    models = db.models,
    Client = models['Client'],
    Developer = models['Developer'];


/**
 * show index page
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
    var clients = res.locals.clients;
    var system_names = Client.listSystemNames(clients).filter(function (e, i, arr) {
        return arr.lastIndexOf(e) === i;
    });
    findAllModels([Developer], function (developers) {
        var rows = clients.map(function (client) {
            var systems = client.systems || [],
                systemsMap = toNameMap(systems);
            return [
                {
                    text: client.name,
                    href: ['/client/' + client._id, 't=' + res.locals.time].join('?')
                }
            ].concat(system_names.map(function (name) {
                    return systemsMap[name] || {};
                }));
        });
        res.render('chart/index.jade', {
            headRow: system_names,
            rows: rows,
            properties: Client.listProperties(clients)
        });
    });
};

