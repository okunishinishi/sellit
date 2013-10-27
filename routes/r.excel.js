/**
 * Created by okunishitaka on 10/6/13.
 */

var excelbuilder = require('msexcel-builder'),
    db = require('../db'),
    util = require('../util'),
    toIdMap = util['obj']['toIdMap'],
    models = db['models'],
    teK = require('tek'),
    Client = models['Client'],
    findAllModels = util['mdl']['findAllModels'],
    l = require('../locale')['en'],
    Product = models['Product'],
    resolve = require('path')['resolve'];


exports.csvData = function (callback) {
    var result = {
        clients: [],
        products: []
    };
    findAllModels([Product], function (products) {
        products.forEach(function (product) {
            var line = [product.name];
            result.products.push(line);
        });
        var productMap = toIdMap(products);
        Client.findAll(function (clients) {
            result.clients.push([
                l.lbl.client,
                l.lbl.rank,
                l.lbl.products
            ]);
            result.clients = result.clients.concat(
                clients.map(function (client) {
                    var product_ids = client.product_ids || '';
                    if (product_ids instanceof Array) {
                        product_ids = product_ids.join(',');
                    }
                    return [
                        client.name,
                    ]
                        .concat(product_ids.split(',').map(function (product_id) {
                            var product = productMap[product_id];
                            return product && product.name || '';
                        })).filter(function (v) {
                            return !!v;
                        })
                        ;
                })
            );
            callback(result);
        });
    });
};

var publicDir = require('../app.config')['publicDir'];


exports.generateWorkbook = function (dirpath, filename, callback) {
    exports.csvData(function (csvData) {
        var createWorkbook = excelbuilder.createWorkbook,
            workbook = createWorkbook(dirpath + "/", filename);
        Object.keys(csvData).forEach(function (sheetName) {
            var data = csvData[sheetName];
            if (!data.length) return;
            var rows = data.length + 1,
                cols = teK.math.max(data.map(function (data) {
                    return data.length || 0
                })) + 1;
            var sheet = workbook.createSheet(sheetName, cols, rows);
            data.forEach(function (data, i) {
                data.forEach(function (data, j) {
                    var col = j + 1,
                        row = i + 1;
                    sheet.set(col, row, data || '');
                    sheet.width(col, 24);
                });
            });
            for (var row = 1; row < rows; row++) {
                for (var col = 1; col < cols; col++) {
                    sheet.border(col, row, {left: 'thin', top: 'thin', right: 'thin', bottom: 'thin'});
                }
            }
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