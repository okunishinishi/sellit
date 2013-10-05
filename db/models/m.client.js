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

var Client = module.exports = defineModel({
    //properties
});

Client.schema = new Schema({
    //schemas

});

Client.prototype.validate = function () {
    var s = this;
    return Client.schema.validate(s);
};
