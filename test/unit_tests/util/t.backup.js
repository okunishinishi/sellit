/**
 * Created by okunishitaka on 11/3/13.
 */
var should = require('should'),
    path = require('path'),
    resolve = path.resolve,
    backup = require('../../../util/u.backup');

var mockDir = resolve(__dirname, '../../mock'),
    bkDir = resolve(mockDir, 'bk');

exports.fileBackupTest = function (test) {
    var filepath = resolve(mockDir, 'hbs/the-world/stop-time.hbs');
    backup.fileBackup(filepath, bkDir, function (err) {
        should.not.exist(err);
        test.done();
    });
};
exports.cleanBackupTest = function (test) {
    backup.cleanBackup(2, bkDir, function(err){
        should.not.exist(err);
        test.done();
    });
};