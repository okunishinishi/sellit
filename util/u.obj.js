/**
 * Created by okunishitaka on 10/7/13.
 */

exports.toIdMap = function (data) {
    var result = {};
    data && data.forEach(function (data) {
        result[data._id] = data;
    });
    return result;
};
