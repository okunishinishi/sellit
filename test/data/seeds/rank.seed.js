Object.prototype.repeat = function (count) {
    this._repeat = count;
    return this;
};

module.exports = {
    /** データ定義 **/
    entries: [
        {
            _id: "6${padZero(rownum, 23)}",
            name: '${"SABCDEFG"[rownum%8]}級'
        }.repeat(8)
    ]
};