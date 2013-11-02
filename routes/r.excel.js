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
    config = require('../app.config'),
    resolve = require('path')['resolve'];


var publicDir = require('../app.config')['publicDir'];


exports.generateWorkbook = function (clients, callback) {
    var createWorkbook = excelbuilder.createWorkbook;
    require('./r.chart.js').getData(clients, function (data) {
        var dirpath = config.excelDir,
            filename = config.excelFileName;
        var workbook = createWorkbook(dirpath + "/", filename);
        var cols = data.headRow.length + 1,
            rows = data.rows.length + 1;
        'code,provider,scale,freeword,all'.split(',').forEach(function (key) {
            var sheetName = (l.lbl[key] || key).replace(/\//g, '-'),
                sheet = workbook.createSheet(sheetName, cols, rows);
            [''].concat(data.headRow).forEach(function (data, i) {
                var row = 1, col = i + 1;
                sheet.set(col, row, data || '');
                sheet.width(col, 10);
                sheet.border(col, row, {left: 'thin', top: 'thin', right: 'thin', bottom: 'thick'});
            });
            function getText(data, key) {
                if (data.text) return data.text;
                switch (key) {
                    case 'all':
                        return Object.keys(data).map(function (key) {
                            if (key === 'all') return;
                            if (key === 'name') return;
                            return data[key] || '';
                        }).join("\n");
                    case 'provider':
                        return data['provider_name'];
                    default:
                        return data[key] || '';
                }
            };
            data.rows.forEach(function (data, i) {
                var row = i + 2;
                data.forEach(function (data, j) {
                    var col = j + 1;
                    sheet.set(col, row, getText(data, key));
                    var width = col === 1 ? 20 : 12;
                    sheet.width(col, width);
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
    var clients = res.locals.clients;
    exports.generateWorkbook(clients, function (err) {
        if (err) {
            res.redirect('/404');
        } else {
            res.redirect('/' + filename);
        }
    });
};