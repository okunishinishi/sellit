/**
 * Created by okunishitaka on 11/3/13.
 */
var should = require('should'),
    db = require('../../../db'),
    Client = db.models.Client,
    excel = require('../../../routes/r.excel');

exports.generateWorkbookTest = function (test) {
    Client.findByCondition({}, function (clients) {
        clients = clients.filter(function (client) {
            return !client.isGroup();
        });
        excel.generateWorkbook(clients, function () {
            test.done();
        });
    });
};