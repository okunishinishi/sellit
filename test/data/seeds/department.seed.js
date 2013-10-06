Object.prototype.repeat = function (count) {
    this._repeat = count;
    return this;
};

module.exports = {
    /** データ定義 **/
    entries: [
        {
            _id: "1${padZero(rownum, 23)}",
            client_id: "${padZero(parseInt(rownum/10), 24)}",
            name: '${fruit}部門',
            product_ids:"2${padZero(parseInt(rownum/20), 23)},2${padZero(parseInt(rownum/20)+1, 23)}"
        }.repeat(100)
    ]
};