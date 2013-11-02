(function ($, Hbs, l) {

    var ss = $.spreadsheet;
    var tmpl = {
        cartTbodyThContent: Hbs.templates['chart-tbody-th-content']
    };
    $.fn.extend({
        chartListSection: function () {
            var section = $(this),
                data = section.data();

            var headData = new ss.HeadData(data['headrow']),
                bodyData = data['rows'].map(function (row) {
                    var label = tmpl.cartTbodyThContent(row.shift());
                    return new ss.RowData(label, row.map(function (data) {
                        return data;
                    }));
                });
            var sheetData = new ss.SheetData('',headData, bodyData);
            return section.spreadsheet(sheetData);
        },
        chartListTabs: function (callback) {
            var tabs = $(this);
            return tabs.find('.tab').click(function () {
                var clicked = $(this),
                    key = clicked.data('key');
                clicked
                    .addClass('tab-selected')
                    .siblings('.tab-selected')
                    .removeClass('tab-selected');
                callback && callback();
            });
        }
    });

    $(function () {
        var body = $(document.body);

        var table = $('#chart-list-section', body).chartListSection();

        $('#chart-list-tabs', body).chartListTabs(function (key) {
        });
    });
})(jQuery, Handlebars, window['l']);
