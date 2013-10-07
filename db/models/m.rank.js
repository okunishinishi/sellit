/**
 * User: okunishitaka
 * Date: 9/21/13
 * Time: 6:57 PM
 */

var color = require('onecolor'),
    HSV = color['HSV'],
    tek = require('tek'),
    tekWeb = require('tek-web'),
    DB = tekWeb['DB'],
    Schema = DB['Schema'],
    defineModel = DB['defineModel'];

var Rank = module.exports = defineModel({
    //properties
});

Rank.schema = new Schema({
    //schemas

});

Rank.prototype.validate = function () {
    var s = this;
    return Rank.schema.validate(s);
};

Rank.getColor = function (i) {
    var h = (25 * parseInt(i || 0) % 360) / 360;
    return new HSV(h, 0.5, 0.5).hex();
};
Rank.prototype.save = (function (save) {
    return function () {
        var s = this,
            arg = Array.prototype.splice.call(arguments, 0);
        Rank.findAll(function (ranks) {
            s.color = Rank.getColor(ranks.length);
            return save.apply(s, arg);
        });
    };
})(Rank.prototype.save);