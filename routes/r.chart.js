var tek = require('tek'),
    copy = tek['meta']['copy'],
    util = require('../util'),
    findAllModels = util['mdl']['findAllModels'],
    toIdMap = util['obj']['toIdMap'],
    db = require('../db'),
    models = db.models,
    Industry = models['Industry'],
    Product = models['Product'],
    Rank = models['Rank'],
    Client = models['Client'];


/**
 * show index page
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
    findAllModels([Client, Rank, Industry, Product], function (clients, rank, industries, products) {
        var rankMap = toIdMap(rank),
            industryMap = toIdMap(industries),
            productMap = toIdMap(products);
        var rows = clients.map(function (client) {
            var rank = rankMap[client.rank_id],
                industry = industryMap[client.industry_id],
                product_ids = client.product_ids || '';
            if (product_ids instanceof Array) {
                product_ids = product_ids.join(',');
            }
            var products = product_ids.split(',').map(function (product_id) {
                var product = productMap[product_id];
                return product && product.name;
            });
            return [
                client.name,
                rank && rank.name,
                industry && industry.name,
            ].concat(products)
        });
        res.render('chart/index.jade', {
            rows: rows
        });
    });
};

