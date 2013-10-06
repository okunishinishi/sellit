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


exports.generateWorkbook = function (dirpath, filename, callback) {
    exports.csvData(function (data) {
        var createWorkbook = excelbuilder.createWorkbook,
            workbook = createWorkbook(dirpath + "/", filename);
        var sheet1 = workbook.createSheet('all', data[0].length + 2, data.length + 2);
        'client,department,product'.split(',').forEach(function (header, i) {
            var col = i + 1, row = 1;
            sheet1.width(i, 30);
            sheet1.set(col, row, header);
            sheet1.fill(col, row, {
                type:'solid',fgColor:'8',bgColor:'64'
            });
            sheet1.border(col, row, {
                left:'thin',top:'thin',right:'thin',bottom:'medium'
            });
        });
        data.forEach(function (data, i) {
            data.forEach(function (data, j) {
                var col = j + 1,
                    row = i + 2;
                sheet1.set(col, row, data);
                sheet1.border(col, row, {left:'thin',top:'thin',right:'thin',bottom:'thin'});
            });
        });
        workbook.save(function (err) {
            if (err) {
                workbook.cancel();
                callback(err);
            } else {
                callback(err, resolve(dirpath, filename));
            }
        });
    });
};

exports.download = function (req, res) {
    var filename = 'sellit.xlsx';
    exports.generateWorkbook(publicDir, filename, function (err) {
        if (err) {
            res.redirect('/404');
        } else {
            res.redirect('/' + filename);
        }
    });
};