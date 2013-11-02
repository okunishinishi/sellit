var tek = require('tek'),
    copy = tek['meta']['copy'],
    util = require('../util'),
    findAllModels = util['mdl']['findAllModels'],
    obj = util['obj'],
    toNameMap = obj['toNameMap'],
    toIdMap = obj['toIdMap'],
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
    exports.getData(clients, function (data) {
        res.render('chart/index.jade', {
            headRow: data.headRow,
            rows: data.rows
        });
    });
};
exports.getData = function (clients, callback) {
    var system_names = Client.listSystemNames(clients);
    findAllModels([Developer], function (developers) {
        var rows = clients.map(function (client) {
            var systems = client.systems || [],
                systemsMap = toNameMap(systems),
                developersMap = toIdMap(developers);
            return [
                {
                    text: client.name,
                    href: ['/client/' + client._id, 't=' + new Date().getTime()].join('?')
                }
            ].concat(
                    system_names.map(function (name) {
                        var system = systemsMap[name] || {};
                        var provider = developersMap[system.provider];
                        system.provider_name = provider && provider.name;
                        return  system;
                    }));
        });
        callback({
            headRow: system_names,
            rows: rows
        });
    });
};
