(function ($, Hbs, l) {

    var ss = $.spreadsheet;
    var tmpl = {
        chartTbodyThContent: Hbs.templates['chart-tbody-th-content'],
        chartCellContent: Hbs.templates['chart-cell-content']
    };
    $.fn.extend({
        chartListSection: function () {
            var section = $(this),
                data = section.data();

            var headData = new ss.HeadData(data['headrow']),
                bodyData = data['rows'].map(function (row) {
                    var label = tmpl.chartTbodyThContent(row.shift());
                    return new ss.RowData(label, row.map(function (data) {
                        return tmpl.chartCellContent(data);
                    }));
                });
            var sheetData = new ss.SheetData('', headData, bodyData);
            return section.spreadsheet(sheetData);
        },
        chartListTabs: function (callback) {
            var tabs = $(this);
            return tabs.find('.tab').click(function () {
                var clicked = $(this),
                    id = clicked.attr('id');
                clicked
                    .addClass('tab-selected')
                    .siblings('.tab-selected')
                    .removeClass('tab-selected');
                callback && callback(id);
            });
        },
        chartCellMap: function (filter) {
            var map = {};
            this.each(function () {
                var cell = $(this),
                    label = cell.findByAttr('for', filter),
                    value = label.data('value') || '__empty__';
                if (!map[value]) map[value] = $();
                map[value] = map[value].add(cell);
            });
            return map;
        },
        rainbowText: function () {
            var text = $(this);
            text.html(text.text().split('').map(function (c) {
                return '<span style="color:' + $.randomColor()+ ';">' + c + '</span>'
            }));
            return text;
        }
    });

    $(function () {
        var body = $(document.body);

        var chartListSection = $('#chart-list-section', body).chartListSection(),
            chartListCell = $('.ss-cell', chartListSection);

        chartListCell
            .hover(function () {
                var cellMap = chartListSection.cellMap;
                var cell = $(this),
                    value = cell.find('label:visible').data('value');
                if (!value) return;
                var syncCell = cellMap && cellMap[value];
                if (syncCell && syncCell.size() > 1) {
                    syncCell.addClass('hover-sync');
                }
            }, function () {
                chartListCell.filter('.hover-sync').removeClass('hover-sync');
            });

        $('#chart-list-tabs', body).chartListTabs(function (filter) {
            chartListSection.attr('data-filter', filter);
            chartListSection.trigger('ss-resize');
            chartListSection.cellMap = chartListCell.chartCellMap(filter);

            $('.empty-cell', chartListSection).removeClass('empty-cell');
            var emptyCells = chartListSection.cellMap.__empty__;
            if (emptyCells) {
                emptyCells.addClass('empty-cell');
            }
        }).first().click();

        var colorizeBtn = $('#colorize-btn').rainbowText(),
            decolorizeBtn = $('#decolorize-btn').hide();
        colorizeBtn.click(function () {
            colorizeBtn.hide();
            decolorizeBtn.show();
        });
        decolorizeBtn.click(function () {
            colorizeBtn.show();
            decolorizeBtn.hide();
        });
    });
})(jQuery, Handlebars, window['l']);
