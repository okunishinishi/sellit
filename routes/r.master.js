var tek = require('tek'),
    copy = tek['meta']['copy'],
    util = require('../util'),
    toIdMap = util['obj']['toIdMap'],
    db = require('../db');

exports.index = function (req, res) {
    res.render('master/index.jade', {});
};

exports.sort = function (req, res) {
    var body = req.body,
        Model = db.models[body.model];
    if (Model) {
        var sortMap = toIdMap(body.data);
        Model.findAll(function (models) {
            models = models
                .map(function (model) {
                    var data = sortMap[model._id],
                        sort_num = data && data.sort_num;
                    if (!sort_num) return null;
                    if (sort_num === model.sort_num) return null;
                    model.sort_num = parseInt(sort_num);
                    return model;
                }).filter(function (model) {
                    return !!model;
                });
            Model.updateAll(models, function () {
                res.json({
                    cnt: models.length
                })
            });
        });
    } else {
        res.json({
            cnt: 0
        });
    }
};