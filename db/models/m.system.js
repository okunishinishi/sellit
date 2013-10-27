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

var System = module.exports = defineModel({
    //properties
    parent_id: null,
    children_ids: []
});

System.schema = new Schema({
    //schemas

});

System.prototype.validate = function () {
    var s = this;
    return System.schema.validate(s);
};
