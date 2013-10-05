var tek = require('tek'),
    copy = tek['meta']['copy'],
    db = require('../db'),
    __ModelName__ = db.models['__ModelName__'];

/**
 * find single model
 * @param _id
 * @param callback
 * @returns {*}
 */
function findOne(_id, callback) {
    return __ModelName__.findById(_id, callback);
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
    return __ModelName__.findByCondition(condition,function (models) {
        callback(models.splice(skip, limit));
    }).limit(limit).skip(skip);
}

/**
 * show index page
 * @param req
 * @param res
 */
exports.index = function (req, res) {
    res.render('__model_name__/index.jade', {});
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
        var __modelName__ = new __ModelName__(req.body);
        var result = __modelName__.validate();
        if (!result.valid) {
            res.json(result);
            return;
        }
        findOne(__modelName__._id, function (duplicate) {
            var action = duplicate ? 'update' : 'save';
            __modelName__[action](function (__modelName__) {
                res.json({
                    valid: true,
                    model: __modelName__,
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
        findOne(_id, function (__modelName__) {
            if (__modelName__) {
                __modelName__.remove(function () {
                    res.json({count: 1});
                });
            } else {
                res.json({count: 0});
            }
        });
    }
};
