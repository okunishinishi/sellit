Object.prototype.repeat = function (count) {
    var s = this;
    s._repeat = count;
    return s;
};

module.exports = {
    /** データ定義 **/
    entries: [
        {
            _id: "7${padZero(rownum, 23)}",
            name: '${animal}${choice("開発,ディベロップ,情報,グループ".split(","))}'
        }.repeat(10)
    ]
};