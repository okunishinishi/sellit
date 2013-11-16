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
    config = require('../app.config'),
    l = require('../locale')[config.lang || 'en'],
    path = require('path'),
    resolve = path['resolve'];


var publicDir = require('../app.config')['publicDir'];


exports.generateWorkbook = function (client_group_id, callback) {
    var createWorkbook = excelbuilder.createWorkbook;
    require('./r.chart.js').getData(client_group_id, function (data, groupHierarchy, topLv) {
        if (!data) {
            callback('excel data not found');
            return;
        }
        var dirpath = config.excelDir,
            filename = topLv.name.replace(/\s/g, '_') + '.xlsx';
        var workbook = createWorkbook(dirpath + "/", filename);
        var cols = data.headRow.length + 1,
            rows = data.rows.length + 1;
        'code,initial_provider,current_provider,scale,freeword,all'.split(',').forEach(function (key) {
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
                    case 'initial_provider':
                        return data['initial_provider_name'];
                    case 'current_provider':
                        return data['current_provider_name'];
                    default:
                        return data[key] || '';
                }
            }

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

function handleErr(err) {
    console.error(err);
}

exports.download = function (req, res) {
    var q = req.query,
        client_group_id = q['client_group_id'];
    exports.generateWorkbook(client_group_id, function (err, filepath) {
        if (err) {
            err && handleErr(err);
            res.redirect('/404');
        } else {
            res.redirect(resolve('/', path.relative(publicDir, filepath)));
        }
    });
};