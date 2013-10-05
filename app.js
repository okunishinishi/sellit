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
            hit = client._id = clientId;
            if (hit) return client;
        }
        return null;
    };
})(app.response.__proto__.render);


http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
