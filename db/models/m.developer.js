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

var Developer = module.exports = defineModel({
    //properties
    parent_id: null,
    children_ids: []
});

Developer.schema = new Schema({
    //schemas

});

Developer.prototype.validate = function () {
    var s = this;
    return Developer.schema.validate(s);
};
