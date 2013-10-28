var color = require('onecolor');


exports.rainbow = function (saturation, value, length) {
    var result = [];
    if (!saturation) saturation = .5;
    if (!value) value = .5;
    if (!length) length = 7;
    for (var i = 0; i < length; i++) {
        var hue = (360 / 7 * (i % 7)) / 360;
        result.push(
            color('#ff0000')
                .saturation(saturation, true)
                .value(value, true)
                .hue(hue, true)
                .hex());
    }
    return result;
};