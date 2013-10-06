/**
 * Created by okunishitaka on 10/6/13.
 */

var db = require('../db'),
    models = db['models'],
    Client = models['Client'],
    Department = models['Department'],
    Product = models['Product'];


function toIdMap(data) {
    var result = {};
    data && data.forEach(function (data) {
        result[data._id] = data;
    });
    return result;
}
exports.csvData = function (callback) {
    var result = [];
    Product.findAll(function (products) {
        products = toIdMap(products);
        Client.findAll(function (clients) {
            clients = toIdMap(clients);
            Department.findAll(function (departments) {
                departments.forEach(function (department) {
                    var client = clients[department.client_id];
                    (department.product_ids || '').split(',').forEach(function (productId) {
                        var product = products[productId];
                        result.push([client.name, department.name, product.name]);
                    });
                });
                callback(result);
            });
        })
    });
};
exports.download = function (req, res) {
    exports.csvData(function (data) {
        res.json(data);//TODO
    });
};