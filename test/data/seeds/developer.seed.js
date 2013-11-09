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
            name: "${'日立ソリューションズ,NECソフト,東芝ソリューション,NTTデータ,野村総合研究所,新日鉄住金ソリューションズ,NSOL,どこか,その他,不明'.split(',')[rownum]}"
        }.repeat(10)
    ]
};