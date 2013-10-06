/**
 * Created by okunishitaka on 10/6/13.
 */

var excelbuilder = require('msexcel-builder'),
    db = require('../db'),
    models = db['models'],
    Client = models['Client'],
    Department = models['Department'],
    Product = models['Product'],
    resolve = require('path')['resolve'];


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

var publicDir = require('../app.config')['publicDir'];
exports.download = function (req, res) {
    exports.csvData(function (data) {
        var createWorkbook = excelbuilder.createWorkbook,
            filename = 'sellit.xlsx',
            workbook = createWorkbook(publicDir + "/", filename);
        var rows = data.length,
            cols = data[0].length;
        var sheet1 = workbook.createSheet('all', cols + 2, rows);
        for (var row = 0; row < rows; row++) {
            for (var col = 0; col < cols; col++) {
                sheet1.set(col+1, row+1, data[row][col]);
            }
        }
        workbook.save(function (err) {
            if (err) {
                workbook.cancel();
                res.json(data);
            } else {
                res.redirect('/' + filename);
            }
        });
    });
};