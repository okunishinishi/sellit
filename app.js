/**
 * User: okunishitaka
 * Date: 9/19/13
 * Time: 11:11 PM
 */

var path = require('path'),
    http = require('http'),
    db = require('./db'),
    express = require('express'),
    util = require('./util'),
    NODE_ENV = process.env.NODE_ENV,
    config = require('./app.config'),
    locale = require('./locale');


var app = express();

//noinspection JSUnresolvedFunction
app.configure('all', function () {
    Object.keys(config.set).forEach(function (key) {
        app.set(key, config.set[key]);
    });

    config.use.forEach(function (use) {
        app.use(use);
    });

    app.use(app['router']);
});

//noinspection JSUnresolvedFunction
app.configure('development', function () {
    var errorHandler = express['errorHandler'];
    app.use(errorHandler());

    var hbs = require('./util/u.hbs');
    hbs.precompileAll(config.hbsDir, config.hbsTemplateFile, function () {
        console.log('precompile templates file:', config.hbsTemplateFile);
    });
});

app.locals({
    version: config.package.version,
    context: config.context || '',
    url: util.url.publicResolver(config),
    NODE_ENV: NODE_ENV
});

app.all('*',
    function (req, res, next) {
        var login_username = req.session.login_username;
        var needsLogin = !login_username && (req.path != '/' && !req.path.match('login'));
        if (needsLogin) {
            res.redirect('/');
        }
        next();
    },
    function (req, res, next) {
        var Client = db.models.Client;
        Client.findByCondition({}, function (clients) {
            res.locals.clients = clients.filter(function (client) {
                return !client.isGroup();
            });
            res.locals.time = new Date().getTime();

            var lang = util['lang'];
            res.locals.lang = lang.fromRequest(req);
            res.locals.lang = 'ja';//TODO
            res.locals.url = app.locals.url;
            next();
        });
    });


(function (routes) {
    Object.keys(routes).forEach(function (method) {
        routes[method].forEach(function (route) {
            app[method](route[0], route[1]);
        });
    });
})(require('./app.route'));


(function (render) {
    //exports locale for view as 'l';
    app.response.__proto__.render = function (view, options, fn) {
        var s = this;
        s.locals['l'] = locale[s.locals.lang];
        return render.call(s, view, options, fn);
    };
    app.response.__proto__.getClient = function (clientId) {
        var s = this,
            clients = s.locals.clients;
        if (!clients) return null;
        if (!clientId) return null;
        var hit = false, client;
        for (var i = 0, len = clients.length; i < len; i++) {
            client = clients[i];
            hit = client._id == clientId;
            if (hit) return client;
        }
        return null;
    };
})(app.response.__proto__.render);


(function () {
    var backup = config['backup'],
        db = config['db'];
    var tek = require('tek'),
        fs = require('fs'),
        padZero = tek['string']['padZero'],
        resolve = require('path')['resolve'],
        excel = require('./routes/r.excel');
    var takeBackup = function () {
        var now = (function (date) {
            return [
                date.getFullYear(),
                padZero(date.getMonth() + 1, 2),
                padZero(date.getDate())
            ].join('') + '-' + [
                padZero(date.getHours(), 2),
                padZero(date.getMinutes(), 2),
                padZero(date.getSeconds(), 2)
            ].join('');
        })(new Date);
        var dirpath = backup.dirpath,
            filename = [now, 'xlsx'].join('.');
        fs.readdirSync(dirpath).reverse().forEach(function (filename, i) {
            if (filename.match(/^\./)) return;
            var filepath = resolve(dirpath, filename);
            if ((backup.max_count - 1) * 2 <= i) {
                fs.unlinkSync(filepath);
            }
        });
        var db_filepath = resolve(db.host, db.name);
        fs.readFile(db_filepath, function (err, buffer) {
            if (err) console.error(err);
            var bk_filepath = resolve(dirpath, now + '.db');
            fs.writeFile(bk_filepath, buffer, function (err) {
                if (err) console.error(err);
                excel.generateWorkbook(dirpath, filename, function () {
                    console.log('back up saved to :', resolve(dirpath, filename));
                });
            });
        });
    };
    setInterval(takeBackup, backup.interval);
    takeBackup();
})();

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
