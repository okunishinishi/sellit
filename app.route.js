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


var excel = r['excel'];
get('/excel/download', excel.download);

var master = r['master'];
get('/master', master.index);
post('/master/sort', master.sort);



var chart = r['chart'];
get('/chart', chart.index);

var salesman = r['salesman'];
get('/salesman', salesman.index);
post('/api/salesman/save', salesman.api.save);
post('/api/salesman/destroy', salesman.api.destroy);
get('/api/salesman.json', salesman.api.list);
get('/api/salesman/:_id', salesman.api.one);

var rival = r['rival'];
get('/rival', rival.index);
post('/api/rival/save', rival.api.save);
post('/api/rival/destroy', rival.api.destroy);
get('/api/rival.json', rival.api.list);
get('/api/rival/:_id', rival.api.one);

var system = r['system'];
get('/system', system.index);
post('/api/system/save', system.api.save);
post('/api/system/destroy', system.api.destroy);
get('/api/system.json', system.api.list);
get('/api/system/:_id', system.api.one);
