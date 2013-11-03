var dateFormat = require('dateformat'),
    fs = require('fs'),
    path = require('path'),
    resolve = path.resolve,
    basename = path.basename;


exports.cleanBackup = function (maxcount, bk_dirpath, callback) {
    fs.readdir(bk_dirpath, function (err, filenames) {
        if (err) {
            callback(err);
            return;
        }
        filenames.reverse().forEach(function (filename, i) {
            if (filename.match(/^\./)) return;
            var filepath = resolve(bk_dirpath, filename);
            if (maxcount <= i) {
                fs.unlinkSync(filepath);
            }
        });
        callback && callback();
    });
};

exports.fileBackup = function (filepath, bk_dirpath, callback) {
    var prefix = dateFormat(new Date, 'yyyymmdd-HHMMss');
    var bk_filepath = resolve(bk_dirpath, [prefix, basename(filepath)].join('.'));

    var r = fs.createReadStream(filepath),
        w = fs.createWriteStream(bk_filepath);
    r.on('error', function (err) {
        callback(err);
        callback = null;
    });
    w.on('error', function (err) {
        callback(err);
        callback = null;
    });
    w.on('close', function () {
        callback && callback(null, bk_filepath);
    });
    r.pipe(w);
};