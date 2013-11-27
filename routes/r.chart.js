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
    var q = req.query,
        client_group_id = q['client_group_id'];

    exports.getData(client_group_id, function (data, groupHierarchy, topLv) {
        if (data) {
            res.render('chart/index.jade', {
                headRow: data.headRow,
                rows: data.rows,
                groupHierarchy: groupHierarchy
            });
        } else {
            var firstGroup = groupHierarchy.shift();
            if (firstGroup) {
                res.redirect('/chart?client_group_id=' + firstGroup._id.toString());
            } else {
                res.render('chart/index.jade');
            }
        }
    });
};
exports.getData = function (client_group_id, callback) {
    findAllModels([Developer, Client], function (developers, all_clients) {
        var allClientMap = toIdMap(all_clients) || {},
            groupHierarchy = Client.getGroupHierarchy(allClientMap);
        var topLv = client_group_id && allClientMap[client_group_id];
        if (!topLv) {
            callback(null, groupHierarchy);
            return;
        }

        var clients = all_clients.filter(function (client) {
            if (client.isGroup()) return false;
            return topLv.isAncestorsOf(client, allClientMap);
        });

        if (!clients.length) {
            callback({
                headRow: [],
                rows: []
            }, groupHierarchy);
            return;
        }

        var system_names = Client.listSystemNames(clients);
        var rows = clients
            .map(function (client) {
                client.parent_names = client.listParentNames(allClientMap) || [];
                client.parent_ids = client.listParentIds(allClientMap) || [];
                client.full_name = [client.parent_names, client.name].join(' ');
                return client;
            })
            .sort(function (a, b) {
                return (a.full_name || '').localeCompare(b.full_name || '');
            })
            .map(function (client) {
                var systems = client.systems || [],
                    systemsMap = toNameMap(systems),
                    developersMap = toIdMap(developers);
                var href = ['/', config.context || '', 'client/' + client._id].join('');
                var parent_names = client.parent_names;
                parent_names.shift(); //remove top level group name from display
                return [
                    {
                        prefix: parent_names.length && parent_names.join('  ') || null,
                        data_parent: JSON.stringify({
                            parent_names: parent_names,
                            parent_ids: client.parent_ids
                        }),
                        data_system: JSON.stringify({
                            system_names: Client.listSystemNames([client])
                        }),
                        client_id: client._id,
                        text: client.name,
                        href: [ href, 't=' + new Date().getTime()].join('?')
                    }
                ].concat(
                        system_names.map(function (name) {
                            var system = systemsMap[name] || {name: name};
                            var initial_provider = developersMap[system.initial_provider];
                            if (initial_provider) system.initial_provider_name = initial_provider.name;
                            var current_provider = developersMap[system.current_provider];
                            if (current_provider)system.current_provider_name = current_provider.name;
                            system.client_id = client._id;
                            return  system;
                        }));
            });
        callback({
            headRow: system_names,
            rows: rows
        }, groupHierarchy, topLv);
    });
};
