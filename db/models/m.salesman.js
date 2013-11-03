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

var Salesman = module.exports = defineModel({
    //properties
    parent_id: null,
    children_ids: []
});

Salesman.schema = new Schema({
    //schemas

});

Salesman.prototype.validate = function () {
    var s = this;
    return Salesman.schema.validate(s);
};

Salesman.listNames = function (salesmen) {
    return salesmen
        .map(function (salesman) {
            return salesman && salesman.name;
        })
        .filter(function (username) {
            return !!username;
        });
};