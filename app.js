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
    locale = require('./locale');


var app = express();

app.configure('all', function () {
    var config = require('./app.config');
    Object.keys(config.set).forEach(function (key) {
        app.set(key, config.set[key]);
    });

    config.use.forEach(function (use) {
        app.use(use);
    });

    app.use(app['router']);
});

app.configure('development', function () {
    var errorHandler = express['errorHandler'];
    app.use(errorHandler());

    var config = require('./app.config');

    var hbs = require('./util/u.hbs');
    hbs.precompileAll(config.hbsDir, config.hbsTemplateFile, function () {
        console.log('precompile templates file:', config.hbsTemplateFile);
    });
});

app.all('*', function (req, res, next) {
    var Client = db.models.Client;
    Client.findByCondition({}, function (clients) {
        res.locals.clients = clients;

        //    var lang = util['lang'];
//    res.locals.lang = lang.fromRequest(req);
        res.locals.lang = 'en';//FIXME
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


(function (backup) {
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
            if (backup.max_count - 1 <= i) {
                fs.unlinkSync(filepath);
            }
        });
        excel.generateWorkbook(dirpath, filename, function () {
            console.log('back up saved to :', resolve(dirpath, filename));
        });
    };
    setInterval(takeBackup, backup.interval);
    takeBackup();
})(require('./app.config')['backup']);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
