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

var Industry = module.exports = defineModel({
    //properties
});

Industry.schema = new Schema({
    //schemas

});

Industry.prototype.validate = function () {
    var s = this;
    return Industry.schema.validate(s);
};
