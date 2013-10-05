Object.prototype.repeat = function (count) {
    this._repeat = count;
    return this;
};

module.exports = {
    /** データ定義 **/
    entries: [
        {
            _id: "1${padZero(rownum, 23)}",
            client_id: "${padZero(parseInt(rownum/5), 24)}",
            name: '${fruit}部門'
        }.repeat(50)
    ]
};