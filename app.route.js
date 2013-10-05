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

var department = r['department'];
get('/department', department.index);
post('/api/department/save', department.api.save);
post('/api/department/destroy', department.api.destroy);
get('/api/department.json', department.api.list);
get('/api/department/:_id', department.api.one);
