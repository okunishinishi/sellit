/**
 * Created by okunishitaka on 10/7/13.
 */

var tek = require('tek'),
    JobQueue = tek['JobQueue'];


exports.findAllModels = function (models, callback) {
    var s = this,
        jobQueue = new JobQueue().timeout(500000),
        result = [];
    models.forEach(function (Model) {
        jobQueue.push(function (next) {
            Model.findAll(function (models) {
                result.push(models);
                next();
            });
        });
    });
    jobQueue.execute(function () {
        callback.apply(s, result);
    });
};