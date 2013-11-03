var tdprinter = require('test-data-printer');

Object.prototype.repeat = function (count) {
    this._repeat = count;
    return this;
};
function repeat(data, count) {
    for (var i = 0; i < count; i++) {
        data = data.concat(data);
    }
    return data;
}
module.exports = {
    /** データ定義 **/
    entries: [
        {
            _id: "${padZero(rownum, 24)}",
            name: '${flower}${choice("商事,コーポレーション,株式会社,グループ".split(","))}',
            parent_id: '',
            children_ids: "${choice(null,null,'[]')}",
            systems: repeat([
                {
                    "index": "",
                    "name": "${fruit}システム",
                    "code": "${randomAlpha(2).toUpperCase()}${padZero(rownum,4)}",
                    "scale": "12",
                    "provider": "7${padZero((rownum + choice(1,2,3,4)) % 5, 23)}",
                    "freeword": "${choice('いまいち,あと一押し,絶望的,余裕'.split(','))}"
                }
            ], 5)
        }.repeat(30)
    ]
};