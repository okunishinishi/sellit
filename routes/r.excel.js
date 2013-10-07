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
    Industry = models['Industry'],
    findAllModels = util['mdl']['findAllModels'],
    l = require('../locale')['en'],
    Product = models['Product'],
    Rank = models['Rank'],
    resolve = require('path')['resolve'];


exports.csvData = function (callback) {
    var result = {
        clients: [],
        products: []
    };
    findAllModels([Industry, Product, Rank], function (industries, products, ranks) {
        var industryMap = toIdMap(industries),
            ranksMap = toIdMap(ranks);
        products.forEach(function (product) {
            var line = [product.name];
            result.products.push(line);
        });
        var productMap = toIdMap(products);
        Client.findAll(function (clients) {
            result.clients.push([
                l.lbl.client,
                l.lbl.industry,
                l.lbl.rank
            ]);
            result.clients = result.clients.concat(
                clients.map(function (client) {
                    var industry = industryMap[client.industry_id],
                        rank = ranksMap[client.rank_id],
                        product_ids = client.product_ids || '';
                    if (product_ids instanceof Array) {
                        product_ids = product_ids.join(',');
                    }
                    return [
                        client.name,
                        industry && industry.name || '',
                        rank && rank.name || ''
                    ]
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
            var rows = data.length + 2,
                cols = teK.math.max(data.map(function (data) {
                    return data.length || 0
                })) + 2;
            var sheet = workbook.createSheet(sheetName, cols, rows);
            data.forEach(function (data, i) {
                data.forEach(function (data, j) {
                    var col = j + 1,
                        row = i + 1;
                    sheet.set(col, row, data || '');
                    sheet.width(col, 24);
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