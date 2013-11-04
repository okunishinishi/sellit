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
Client.prototype.listParentNames = function (clientMap) {
    var s = this,
        result = [];
    var client = s;
    while (!!client.parent_id) {
        client = clientMap[client.parent_id];
        if (client) {
            result.unshift(client.name);
        } else {
            break;
        }
    }
    return result;
};
Client.prototype.validate = function () {
    var s = this;
    return Client.schema.validate(s);
};
Client.listSystemNames = function (clients) {
    return Client.listSystemAttr(clients, 'name');
};
Client.listSystemScales = function (clients) {
    return Client.listSystemAttr(clients, 'scale');
};
Client.listSystemStartAts = function (clients) {
    return Client.listSystemAttr(clients, 'start_at');
};
Client.listSystemCode = function (clients) {
    return Client.listSystemAttr(clients, 'code');
};

Client.listSystemAttr = function (clients, key) {
    return [].concat((clients || [])
        .map(function (client) {
            return distinctAttr(client.systems || [], key)
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
