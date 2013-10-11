/**
 * User: okunishitaka
 * Date: 9/20/13
 * Time: 6:37 AM
 */

var r = require('./routes');

exports = module.exports = {
    get: [],
    post: []
};

function get(path, handler) {
    exports.get.push([path, handler]);
}
function post(path, handler) {
    exports.post.push([path, handler]);
}

get('/', r.index);
get('/404', function (req, res) {
    res.status('404');
    res.render('404');
});

var upload = r['upload'];
get('/upload', upload.index);
post('/upload/save', upload.save);

var client = r['client'];
get('/client/:client_id', client.index);
post('/api/client/save', client.api.save);
post('/api/client/destroy', client.api.destroy);
get('/api/client.json', client.api.list);
get('/api/client/:_id', client.api.one);

var product = r['product'];
get('/product', product.index);
post('/api/product/save', product.api.save);
post('/api/product/destroy', product.api.destroy);
get('/api/product.json', product.api.list);
get('/api/product/:_id', product.api.one);

var excel = r['excel'];
get('/excel/download', excel.download);

var master = r['master'];
get('/master', master.index);
post('/master/sort', master.sort);

var industry = r['industry'];
get('/industry', industry.index);
post('/api/industry/save', industry.api.save);
post('/api/industry/destroy', industry.api.destroy);
get('/api/industry.json', industry.api.list);
get('/api/industry/:_id', industry.api.one);

var rank = r['rank'];
get('/rank', rank.index);
post('/api/rank/save', rank.api.save);
post('/api/rank/destroy', rank.api.destroy);
get('/api/rank.json', rank.api.list);
get('/api/rank/:_id', rank.api.one);


var chart = r['chart'];
get('/chart', chart.index);
