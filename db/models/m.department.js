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

var Department = module.exports = defineModel({
    //properties
});

Department.schema = new Schema({
    //schemas

});

Department.prototype.validate = function () {
    var s = this;
    return Department.schema.validate(s);
};
