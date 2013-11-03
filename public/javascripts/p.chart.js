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

                if (history.pushState) {
                    var query = new tek.Query(location.search.replace('?', ''));
                    query.filter = id;
                    var new_url = [location.path, $.param(query)].join('?');
                    history.pushState(null, null, new_url);
                } else {
                    location.hash = '__' + id;
                }

                clicked
                    .addClass('tab-selected')
                    .siblings('.tab-selected')
                    .removeClass('tab-selected');
                callback && callback(id, clicked.data());
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
        chartControlForm: function (callback) {
            var form = $(this);
            form.find(':radio,:checkbox').change(function () {
                form.submit();
            });
            form
                .submit(function (e) {
                    e.preventDefault();
                    var values = form.getFormValue();
                    callback(values.toObj());
                });
            return form;
        }
    });

    $(function () {
        var body = $(document.body);

        var chartListSection = $('#chart-list-section', body).chartListSection(),
            chartListCell = $('.ss-cell', chartListSection);

        chartListSection.colorize = function (base, type) {
            var cellMap = chartListSection.cellMap;
            if (!cellMap) return;


            var
                values = Object.keys(cellMap).sort(function (a, b) {
                    return Number(a) - Number(b);
                });
            var colors = null;
            switch (type || 'rainbow') {
                case 'rainbow':
                    colors = $.rainbowColor(base, values.length);
                    break;
            }
            values && values.forEach(function (value, i) {
                if (value === '__empty__') return;
                var color = colors[i],
                    back = $.backColor(color);
                cellMap[value].css({
                    color: color,
                    backgroundColor: back,
                    borderColor: $.darkenColor(back)
                });
            });
            chartListSection.addClass('colorized');
        };
        chartListSection.decolorize = function () {
            chartListSection.removeClass('colorized');
            chartListCell.removeAttr('style');
        };


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

        var tabs = $('#chart-list-tabs', body).chartListTabs(function (filter, data) {
            chartListSection.decolorize();
            chartListSection.colorize(data.colorbase, data.colortype);

            chartListSection.attr('data-filter', filter);
            chartListSection.trigger('ss-resize');
            chartListSection.cellMap = chartListCell.chartCellMap(filter);

            $('.empty-cell', chartListSection).removeClass('empty-cell');
            var emptyCells = chartListSection.cellMap.__empty__;
            if (emptyCells) {
                emptyCells.addClass('empty-cell');
            }
        });
        tabs.first().click();

        $('#chart-control-form').chartControlForm(function (settings) {
            chartListSection.decolorize();
            if (eval(settings.colorize)) {
                var tab = tabs.filter('.tab-selected');
                if (tab.size()) {
                    var data = tab.data();
                    chartListSection.colorize(data.colorbase, data.colortype);
                }
            }
        });


//        $('#colorize-input-on').click();//FIXME remove
    });
})(jQuery, Handlebars, window['l']);
