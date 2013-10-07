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
            industry_id:"5${padZero(rownum, 23)}",
            product_ids: "2${padZero(parseInt(rownum/4), 23)},2${padZero(parseInt(rownum/3), 23)}"
        }.repeat(40)
    ]
};