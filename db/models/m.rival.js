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

var Rival = module.exports = defineModel({
    //properties
    parent_id: null,
    children_ids: []
});

Rival.schema = new Schema({
    //schemas

});

Rival.prototype.validate = function () {
    var s = this;
    return Rival.schema.validate(s);
};
