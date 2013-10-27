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
    System = models['System'],
    resolve = require('path')['resolve'];


exports.csvData = function (callback) {
    var result = {
        clients: [],
        systems: []
    };
    findAllModels([System], function (systems) {
        systems.forEach(function (system) {
            var line = [system.name];
            result.systems.push(line);
        });
        var systemMap = toIdMap(systems);
        Client.findAll(function (clients) {
            result.clients.push([
                l.lbl.client,
                l.lbl.rank,
                l.lbl.systems
            ]);
            result.clients = result.clients.concat(
                clients.map(function (client) {
                    var system_ids = client.system_ids || '';
                    if (system_ids instanceof Array) {
                        system_ids = system_ids.join(',');
                    }
                    return [
                        client.name,
                    ]
                        .concat(system_ids.split(',').map(function (system_id) {
                            var system = systemMap[system_id];
                            return system && system.name || '';
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