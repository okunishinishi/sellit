var url = require('./url'),
    webdriver = require('selenium-webdriver'),
    By = webdriver['By'],
    Key = webdriver['Key'];

exports.sortByCol = function (rider, index, callback) {
    rider.findAllBySelector('.sortable-th')
        .then(function (th) {
            th[index].click();
        })
        .then(function () {
            var result = [];
            return rider.findAllBySelector('#chart-list-table tbody tr')
                .then(function (tr) {
                    tr.forEach(function (tr, i) {
                        if (i > 2) return;
                        tr.findAllBySelector('td').then(function (td) {
                            td[index].getText().then(function (text) {
                                result.push(text);
                            });
                        });
                    });
                    return result;
                })
        })
        .then(function (result) {
            callback(result);
        });
};

