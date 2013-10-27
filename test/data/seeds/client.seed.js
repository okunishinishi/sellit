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
            product_ids: "2${padZero(parseInt(rownum%10), 23)},2${padZero(parseInt(rownum/8), 23)}"
        }.repeat(40)
    ]
};