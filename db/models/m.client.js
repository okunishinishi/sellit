/**
 * User: okunishitaka
 * Date: 9/21/13
 * Time: 6:57 PM
 */

var tek = require('tek'),
    tekWeb = require('tek-web'),
    DB = tekWeb['DB'],
    Schema = DB['Schema'],
    obj = require('../../util').obj,
    distinctAttr = obj['distinctAttr'],
    defineModel = DB['defineModel'];

var Client = module.exports = defineModel({
    //properties
});

Client.schema = new Schema({
    //schemas

});
Client.prototype.isGroup = function () {
    var s = this;
    try {
        var children_ids = JSON.parse(s.children_ids);
        return !!children_ids;
    } catch (e) {
        return '';
    }
};
Client.prototype.validate = function () {
    var s = this;
    return Client.schema.validate(s);
};
Client.listSystemNames = function (clients) {
    return [].concat((clients || [])
        .map(function (client) {
            return distinctAttr(client.systems || [], 'name')
        })
        .reduce(function (a, b) {
            return a.concat(b);
        }).filter(function (e, i, arr) {
            return arr.lastIndexOf(e) === i;
        })).sort();
};
Client.listProperties = function (clients) {
    var hash = {};
    clients && clients.forEach(function (client) {
        Object.keys(client).forEach(function (key) {
            hash[key] = true;
        });
    });
    return Object.keys(hash);
};