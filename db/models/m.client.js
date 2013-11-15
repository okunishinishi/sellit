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
    return !!s.getChildrenIds();
};

Client.prototype.isAncestorsOf = function (client, clientMap) {
    if (!client) return false;
    var s = this,
        _id = s._id.toString();
    while (!!client.parent_id) {
        client = clientMap[client.parent_id];
        if (!client) return false;
        if (_id == client._id) return true;
    }
    return false;
};

Client.prototype.getChildrenIds = function () {
    var s = this;
    if (!s.children_ids) return null;
    try {
        return JSON.parse(s.children_ids);
    } catch (e) {
        return null;
    }
};
Client.prototype.getChildren = function (clientMap) {
    var s = this,
        childrenIds = s.getChildrenIds();
    return childrenIds && childrenIds
        .map(function (children_id) {
            return clientMap[children_id];
        })
        .filter(function (child) {
            return !!child;
        });
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


Client.listTopLvGroups = function (clients) {
    return clients.filter(function (client) {
        return client.isGroup() && !client.parent_id;
    }) || [];
};

Client.getGroupHierarchy = function (allClientMap) {
    var allClients = Object.keys(allClientMap).map(function (key) {
        return allClientMap[key];
    });
    var topLvs = Client.listTopLvGroups(allClients);

    function toGroupHierarchy(array) {
        return array.map(function (client) {
            var children = client.getChildren(allClientMap)
                .filter(function (chlid) {
                    return chlid.isGroup();
                });
            return {
                name: client.name,
                _id: client._id,
                parent_id: client.parent_id,
                children: toGroupHierarchy(children)
            }
        });
    }

    return toGroupHierarchy(topLvs);
};