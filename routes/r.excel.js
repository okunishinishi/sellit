/**
 * Created by okunishitaka on 10/6/13.
 */

var excelbuilder = require('msexcel-builder'),
    db = require('../db'),
    util = require('../util'),
    toIdMap = util['obj']['toIdMap'],
    models = db['models'],
    Client = models['Client'],
    Industry = models['Industry'],
    l = require('../locale')['en'],
    Product = models['Product'],
    resolve = require('path')['resolve'];


exports.csvData = function (callback) {
    var result = {
        clients: [],
        products: []
    };
    Industry.findAll(function (industries) {
        var industryMap = toIdMap(industries);
        Product.findAll(function (products) {
            products.forEach(function (product) {
                var line = [product.name];
                result.products.push(line);
            });
            var productMap = toIdMap(products);
            Client.findAll(function (clients) {
                result.clients.push([
                    l.lbl.client,
                    l.lbl.industry
                ]);
                result.clients = result.clients.concat(
                    clients.map(function (client) {
                        var industry = industryMap[client.industry_id];
                        return [
                            client.name,
                            industry && industry.name || ''
                        ];
                    })
                );
                callback(result);
            });
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
            var sheet = workbook.createSheet(sheetName, data[0].length + 2, data.length + 2);
            data.forEach(function (data, i) {
                data.forEach(function (data, j) {
                    var col = j + 1,
                        row = i + 1;
                    sheet.set(col, row, data);
                    sheet.border(col, row, {left: 'thin', top: 'thin', right: 'thin', bottom: 'thin'});
                });
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