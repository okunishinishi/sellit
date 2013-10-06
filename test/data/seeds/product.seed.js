Object.prototype.repeat = function (count) {
    this._repeat = count;
    return this;
};

module.exports = {
    /** データ定義 **/
    entries: [
        {
            _id: "2${padZero(rownum, 23)}",
            name: '${color}の${choice("刀,剣,鎧,兜,槍,斧,盾,矛,弓".split(","))}'
        }.repeat(20)
    ]
};