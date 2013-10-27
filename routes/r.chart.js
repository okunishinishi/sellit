var tek = require('tek'),
    copy = tek['meta']['copy'],
    util = require('../util'),
    findAllModels = util['mdl']['findAllModels'],
    toIdMap = util['obj']['toIdMap'],
    db = require('../db'),
    models = db.models,
    Product = models['Product'],
    Client = models['Client'];


/**
 * show index page
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
    findAllModels([Client, Product], function (clients, products) {
        var productMap = toIdMap(products);
        var rows = clients.map(function (client) {
            var product_ids = client.product_ids || '';
            if (product_ids instanceof Array) {
                product_ids = product_ids.join(',');
            }
            var products = product_ids.split(',').map(function (product_id) {
                var product = productMap[product_id];
                return product && product.name;
            });
            return [
                {
                    text: client.name,
                    href: ['/client/' + client._id, 't=' + res.locals.time].join('?')
                }
            ].concat(products)
        });

        res.render('chart/index.jade', {
            rows: rows
        });
    });
};

