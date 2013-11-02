var tek = require('tek'),
    copy = tek['meta']['copy'],
    db = require('../db'),
    Client = db.models['Client'],
    Developer = db.models['Developer'],
    util = require('../util'),
    obj = util.obj,
    toIdMap = obj['toIdMap'],
    findAllModels = util['mdl']['findAllModels'],
    Salesman = db.models['Salesman'];


/**
 * find single model
 * @param _id
 * @param callback
 * @returns {*}
 */
function findOne(_id, callback) {
    return Client.findById(_id, callback);
}

/**
 * list models
 * @param condition
 * @param limit
 * @param skip
 * @param callback
 * @returns {*|Cursor}
 */
function find(condition, limit, skip, callback) {
    return Client.findByCondition(condition,function (models) {
        findAllModels([], function () {
            var result = models.splice(skip, limit).map(function (model) {
                return model;
            });
            callback(result);
        });
    }).limit(limit).skip(skip);
}


function notFound(res) {
    res.redirect('/404');
}

/**
 * show index page
 * @param req
 * @param res
 */
exports.index = function (req, res) {
    var p = req.params,
        clientId = p['client_id'];
    var client = clientId && res.getClient(clientId);
    if (!client) {
        notFound(res);
        return;
    }
    function ids_string(ids) {
        if (!ids) ids = [];
        if (ids instanceof Array) {
            return ids.join(',');
        }
        return ids;
    }

    var system_names = Client.listSystemNames(res.locals.clients) || [];
    findAllModels([Salesman, Developer, Client], function (salesmen, developers, clients) {
        client.salesman_ids = ids_string(client.salesman_ids) || '';
        client.parent_names = client.listParentNames(toIdMap(clients)) || [];
        res.render('client/index.jade', {
            login_username: req.session.login_username,
            salesmen: salesmen,
            developers: developers,
            selected_client: client,
            rainbow: util.color.rainbow(.2, .9, 40),
            system_names: system_names
        });
    });
};
exports.index.first = function (req, res) {
    var clients = res.locals.clients;
    var client = clients && clients[0];
    res.redirect('/client/' + (client && client._id || '0'));
};

exports.api = {
    /**
     * one data
     * @param req
     * @param res
     */
    one: function (req, res) {
        var p = req['param'];
        findOne(p._id, function (model) {
            res.json(model);
        });
    },

    /**
     * list data
     * @param req
     * @param res
     */
    list: function (req, res) {
        var parameters = {
            skip: 0,
            limit: 500,
            search_word: null
        };
        copy(eval(req.query), parameters);

        var skip = Number(parameters.skip),
            limit = Number(parameters.limit),
            search_word = parameters.search_word,
            condition = {};

        if (search_word) {
            var search_fields = ['name'];
            search_fields.forEach(function (field) {
                condition[field] = search_word;
            });
            condition = new db.AmbiguousCondition(condition);
        }

        find(condition, limit, skip, function (models) {
            res.json(models);
        });
    },

    /**
     * save data
     * @param req
     * @param res
     */
    save: function (req, res) {
        var client = new Client(req.body);
        var result = client.validate();
        if (!result.valid) {
            res.json(result);
            return;
        }

        function doAction(client, action) {
            client[action](function (client) {
                res.json({
                    valid: true,
                    model: client,
                    action: action
                });
            });
        }

        findOne(client._id, function (duplicate) {
            if (duplicate) {
                var parentChange = duplicate.parent_id != client.parent_id;
                copy.fallback(duplicate, client);
                if (parentChange) {
                    Client.findById(duplicate.parent_id, function (oldParent) {
                        var children_ids = oldParent && oldParent.children_ids;
                        if (children_ids) {
                            try {
                                children_ids = JSON.parse(children_ids).filter(function (_id) {
                                    return _id != client._id;
                                });
                                oldParent.children_ids = JSON.stringify(children_ids);
                                oldParent.update(function () {
                                    doAction(client, 'update');
                                });
                            } catch (e) {
                                console.error(e);
                            }
                        } else {
                            doAction(client, 'update');
                        }
                    });
                } else {
                    doAction(client, 'update');
                }
            } else {
                doAction(client, 'save');
            }
        });
    },

    /**
     * destroy data
     * @param req
     * @param res
     */
    destroy: function (req, res) {
        var _id = req.body['_id'];
        findOne(_id, function (client) {
            if (client) {
                client.remove(function () {
                    res.json({count: 1});
                });
            } else {
                res.json({count: 0});
            }
        });
    }
};
