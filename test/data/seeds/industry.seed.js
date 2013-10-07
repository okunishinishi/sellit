Object.prototype.repeat = function (count) {
    this._repeat = count;
    return this;
};

module.exports = {
    /** データ定義 **/
    entries: [
        {
            _id: "5${padZero(rownum, 23)}",
            name: '${atom}界',
            product_ids: "2${padZero(parseInt(rownum/4), 23)},2${padZero(parseInt(rownum/3), 23)}"
        }.repeat(10)
    ]
};