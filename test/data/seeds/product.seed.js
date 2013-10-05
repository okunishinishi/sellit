Object.prototype.repeat = function (count) {
    this._repeat = count;
    return this;
};

module.exports = {
    /** データ定義 **/
    entries: [
        {
            _id: "2${padZero(rownum, 23)}",
            name: '${animal}'
        }.repeat(10)
    ]
};