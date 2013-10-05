var tek = require('tek'),
    copy = tek['meta']['copy'],
    db = require('../db'),
    Department = db.models['Department'];

/**
 * find single model
 * @param _id
 * @param callback
 * @returns {*}
 */
function findOne(_id, callback) {
    return Department.findById(_id, callback);
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
    return Department.findByCondition(condition,function (models) {
        callback(models.splice(skip, limit));
    }).limit(limit).skip(skip);
}

/**
 * show index page
 * @param req
 * @param res
 */
exports.index = function (req, res) {
    res.render('department/index.jade', {});
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
            client_id = parameters.client_id,
            search_word = parameters.search_word,
            condition = {};

        if (search_word) {
            var search_fields = ['name'];
            search_fields.forEach(function (field) {
                condition[field] = search_word;
            });
            condition = new db.AmbiguousCondition(condition);
        }
        condition.client_id = client_id;

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
        var department = new Department(req.body);
        var result = department.validate();
        if (!result.valid) {
            res.json(result);
            return;
        }
        findOne(department._id, function (duplicate) {
            var action = duplicate ? 'update' : 'save';
            department[action](function (department) {
                res.json({
                    valid: true,
                    model: department,
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
        findOne(_id, function (department) {
            if (department) {
                department.remove(function () {
                    res.json({count: 1});
                });
            } else {
                res.json({count: 0});
            }
        });
    }
};
