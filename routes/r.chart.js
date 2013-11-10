var tek = require('tek'),
    copy = tek['meta']['copy'],
    util = require('../util'),
    findAllModels = util['mdl']['findAllModels'],
    obj = util['obj'],
    toNameMap = obj['toNameMap'],
    toIdMap = obj['toIdMap'],
    db = require('../db'),
    resolve = require('path').resolve,
    config = require('../app.config'),
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
    findAllModels([Developer, Client], function (developers, all_clients) {
        var clientMap = toIdMap(all_clients);
        var rows = clients.map(function (client) {
            client.parent_names = client.listParentNames(clientMap) || [];
            var systems = client.systems || [],
                systemsMap = toNameMap(systems),
                developersMap = toIdMap(developers);
            var href = resolve('/', config.context || '', 'client/' + client._id);
            return [
                {
                    prefix: client.parent_names.length && client.parent_names.join('  ') || null,
                    text: client.name,
                    href: [ href, 't=' + new Date().getTime()].join('?')
                }
            ].concat(
                    system_names.map(function (name) {
                        var system = systemsMap[name] || {name:name};
                        var initial_provider = developersMap[system.initial_provider];
                        system.initial_provider_name = initial_provider && initial_provider.name;
                        var current_provider = developersMap[system.current_provider];
                        system.current_provider_name = current_provider && current_provider.name;
                        system.client_id = client._id;
                        return  system;
                    }));
        });
        callback({
            headRow: system_names,
            rows: rows
        });
    });
};
