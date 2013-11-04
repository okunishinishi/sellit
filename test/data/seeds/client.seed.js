var tdprinter = require('test-data-printer');

Object.prototype.repeat = function (count) {
    this._repeat = count;
    return this;
};
function repeat(data, count) {
    var result = [];
    for (var i = 0; i < count; i++) {
        result = result.concat(data);
    }
    return result;
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
                    "name": "${fruit}",
                    "code": "${randomAlpha(2).toUpperCase()}${padZero(rownum,4)}",
                    "start_at":"${2000 + rownum%10}年",
                    "scale": "${choice(10,20,30,40,50,60,70,80,90)}",
                    "provider": "7${padZero((rownum + choice(1,2,3,4)) % 5, 23)}",
                    "freeword": "${choice('いまいち,あと一押し,絶望的,余裕'.split(','))}"
                }
            ], 10)
        }.repeat(20)
    ]
};