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
            name: '${flower}${choice("商事,HD,株式会社,グループ".split(","))}',
            parent_id: '',
            children_ids: "${choice(null,null,'[]')}",
            last_update_by: "${name}",
            systems: repeat([
                {
                    "index": "",
                    "name": "${choice('人事,給与,会計,入稿,生産管理,工程管理,POS,会議室,Web,メインデータセンタ,サブデータセンター'.split(','))}",
                    "code": "${supernatural}",
                    "start_at": "${2000 + rownum%(choice(1,2,3,5,7,11))}年",
                    "scale": "${choice(10,20,30,40,50,60,70,80,90)}",
                    "current_provider": "7${padZero((rownum + choice(1,2,3,4)) % 5, 23)}",
                    "initial_provider": "7${padZero((rownum + choice(4,3,2,1)) % 5, 23)}",
                    "freeword": "${choice('いまいち,あと一押し,絶望的,余裕'.split(','))}"
                }
            ], 10)
        }.repeat(20)
    ]
};