var tek = require('tek'),
    copy = tek['meta']['copy'],
    db = require('../db'),
    Industry = db.models['Industry'];

/**
 * find single model
 * @param _id
 * @param callback
 * @returns {*}
 */
function findOne(_id, callback) {
    return Industry.findById(_id, callback);
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
    return Industry.findByCondition(condition,function (models) {
        callback(models.splice(skip, limit));
    }).limit(limit).skip(skip);
}

/**
 * show index page
 * @param req
 * @param res
 */
exports.index = function (req, res) {
    res.render('industry/index.jade', {});
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
            res.json(models.sort(function (a, b) {
                return a.sort_num - b.sort_num;
            }));
        });
    },

    /**
     * save data
     * @param req
     * @param res
     */
    save: function (req, res) {
        var industry = new Industry(req.body);
        var result = industry.validate();
        if (!result.valid) {
            res.json(result);
            return;
        }
        findOne(industry._id, function (duplicate) {
            var action = duplicate ? 'update' : 'save';
            industry[action](function (industry) {
                res.json({
                    valid: true,
                    model: industry,
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
        findOne(_id, function (industry) {
            if (industry) {
                industry.remove(function () {
                    res.json({count: 1});
                });
            } else {
                res.json({count: 0});
            }
        });
    }
};
