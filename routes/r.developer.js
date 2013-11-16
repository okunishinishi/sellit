var tek = require('tek'),
    copy = tek['meta']['copy'],
    db = require('../db'),
    Client = db.models['Client'],
    Developer = db.models['Developer'];

/**
 * find single model
 * @param _id
 * @param callback
 * @returns {*}
 */
function findOne(_id, callback) {
    return Developer.findById(_id, callback);
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
    return Developer.findByCondition(condition,function (models) {
        callback(models.splice(skip, limit));
    }).limit(limit).skip(skip);
}

/**
 * show index page
 * @param req
 * @param res
 */
exports.index = function (req, res) {
    res.render('developer/index.jade', {});
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
        var developer = new Developer(req.body);
        var result = developer.validate();
        if (!result.valid) {
            res.json(result);
            return;
        }
        findOne(developer._id, function (duplicate) {
            var action = duplicate ? 'update' : 'save';
            if (duplicate) {
                var vr = developer._vr,
                    conflict = vr && (vr != duplicate._vr);
                if (conflict) {
                    res.json({
                        valid: false,
                        errors: [res.l("err.conflict")]
                    });
                    return;
                }
            }
            developer[action](function (developer) {
                res.json({
                    valid: true,
                    model: developer,
                    action: action
                });
            });
        });
    },

    /**
     * destroy data
     * @param req
     * @param res
     */
    destroy: function (req, res) {
        var _id = req.body['_id'];
        findOne(_id, function (developer) {
            if (developer) {
                removeFromClient(developer, function () {
                    developer.remove(function () {
                        res.json({count: 1});
                    });
                });
            } else {
                res.json({count: 0});
            }
        });
    }
};

function removeFromClient(developer, callback) {
    var id = developer._id;
    Client.findAll(function (clients) {
        clients = (clients || [])
            .map(function (client) {
                var changed = false;
                (client.systems || []).forEach(function (system) {
                    if(system.current_provider == id){
                        system.current_provider = undefined;
                        changed = true;
                    }
                    if(system.initial_provider == id){
                        system.initial_provider = undefined;
                        changed = true;
                    }
                });
                return changed && client || false;
            })
            .filter(function (client) {
                return !!client;
            });
        Client.updateAll(clients, callback);
    });
}