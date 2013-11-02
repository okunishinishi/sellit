Object.prototype.repeat = function (count) {
    this._repeat = count;
    return this;
};

module.exports = {
    /** データ定義 **/
    entries: [
        {
            _id: "${padZero(rownum, 24)}",
            name: '${flower}${choice("商事,コーポレーション,株式会社,グループ".split(","))}',
            parent_id: '',
            children_ids: "${choice(null,null,'[]')}",
            systems: [
                {
                    "index": "",
                    "name": "${fruit}システム",
                    "code": "${randomAlpha(2).toUpperCase()}${padZero(rownum,4)}",
                    "scale": "12",
                    "provider": "7${padZero(rownum, 23)}",
                    "freeword": "${choice('いまいち,あと一押し,絶望的,余裕'.split(','))}"
                }
            ]
        }.repeat(10)
    ]
};