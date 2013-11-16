/**
 * User: okunishitaka
 * Date: 9/19/13
 * Time: 11:11 PM
 */

var path = require('path'),
    http = require('http'),
    express = require('express'),
    util = require('./util'),
    NODE_ENV = process.env.NODE_ENV,
    config = require('./app.config'),
    locale = require('./' +
        'locale');


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

    var publish = require('./util/u.publish');
    Object.keys(locale).forEach(function (lang) {
        if (lang == 'default') return;
        var filename = 'locale/' + ['l', lang, 'js'].join('.');
        publish(filename, 'l', locale[lang]);
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
        var isAPI = req.path.match(/^\/api/);
        if (isAPI) {
            next();
            return;
        }
        console.log('req', req.path);
        res.locals.time = new Date().getTime();
        var lang = util['lang'];
        res.locals.lang = lang.fromRequest(req);
        res.locals.lang = 'ja';//TODO
        res.locals.login_username = req.session && req.session.login_username;
        res.locals.url = app.locals.url;
        next();
    });


(function (routes) {
    Object.keys(routes).forEach(function (method) {
        routes[method].forEach(function (route) {
            app[method](route[0], route[1]);
        });
    });
})(require('./app.route'));


(function (render, redirect) {
    //exports locale for view as 'l';
    app.response.__proto__.render = function (view, options, fn) {
        var s = this;
        s.locals['l'] = locale[s.locals.lang];
        return render.call(s, view, options, fn);
    };

    app.response.__proto__.redirect = function (newpath) {
        var s = this;
        newpath = require('path').resolve('/', app.locals.context, newpath);
        return redirect.call(s, newpath);
    };
})(app.response.__proto__.render, app.response.__proto__.redirect);


(function () {
    var resolve = require('path')['resolve'],
        excel = require('./routes/r.excel');
    var takeBackup = function () {
        var db_filepath = resolve(config.db.host, config.db.name),
            excel_filepath = resolve(config.excelDir, config.excelFileName),
            bk_dirpath = config.backup.dirpath;

        function execute(filepath, callback) {
            util.backup.fileBackup(filepath, bk_dirpath, function (err, bk_filepath) {
                if (err) {
                    console.error('failed to take backup');
                } else {
                    console.log('backup saved to :', bk_filepath);
                }
                callback();
            });
        }

        function clean() {
            util.backup.cleanBackup(config.backup.maxcount * 2, bk_dirpath, function (err) {
                if (err) {
                    console.error('failed to clean backup');
                } else {
                    console.log('backup clean done');
                }
            });
        }

        execute(db_filepath, function () {
            execute(excel_filepath, function () {
                clean();
            });
        });
    };
    setInterval(takeBackup, config.backup.interval);
    takeBackup();
})();

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
