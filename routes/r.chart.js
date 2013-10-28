var tek = require('tek'),
    copy = tek['meta']['copy'],
    util = require('../util'),
    findAllModels = util['mdl']['findAllModels'],
    toIdMap = util['obj']['toIdMap'],
    db = require('../db'),
    models = db.models,
    System = models['System'],
    Client = models['Client'];


/**
 * show index page
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
    findAllModels([Client, System], function (clients, systems) {
        var systemMap = toIdMap(systems);
        var rows = clients.map(function (client) {
            var system_ids = client.system_ids || '';
            if (system_ids instanceof Array) {
                system_ids = system_ids.join(',');
            }
            var systems = system_ids.split(',').map(function (system_id) {
                var system = systemMap[system_id];
                return system && system.name;
            });
            return [
                {
                    text: client.name,
                    href: ['/client/' + client._id, 't=' + res.locals.time].join('?')
                }
            ].concat(systems)
        });

        res.render('chart/index.jade', {
            rows: rows
        });
    });
};

