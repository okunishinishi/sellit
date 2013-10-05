/**
 * User: okunishitaka
 * Date: 9/21/13
 * Time: 6:57 PM
 */

var tek = require('tek'),
    tekWeb = require('tek-web'),
    DB = tekWeb['DB'],
    Schema = DB['Schema'],
    defineModel = DB['defineModel'];

var Product = module.exports = defineModel({
    //properties
});

Product.schema = new Schema({
    //schemas

});

Product.prototype.validate = function () {
    var s = this;
    return Product.schema.validate(s);
};
