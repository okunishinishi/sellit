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
        var body = $(document.body),
            q = new tek.Query(location.search.replace('?', '') || '');

        var chartListSection = $('#chart-list-section', body).chartListSection(),
            chartListCell = $('.ss-cell', chartListSection);

        chartListSection.colorize = function (base, type, order) {
            var cellMap = chartListSection.cellMap;
            if (!cellMap) return;


            var
                values = Object.keys(cellMap).sort(function (a, b) {
                    switch (order) {
                        case 'random':
                            return Math.random() - Math.random();
                        case 'string':
                            return a && a.localeCompare(b);
                    }
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
                    darkenColor = $.darkenColor(color);
                var cell = cellMap[value];
                var content = cell.css({
                    color: color,
                    borderColor: color,
                    backgroundColor: '#FFF'
                }).children('.chart-cell-content');
                content
                    .children('.chart-cell-color-mark').css({
                        borderColor: color
                    });
                content
                    .children('.chart-cell-color-mark-hover').css({
                        backgroundColor: color
                    })
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
        var controlForm = $('#chart-control-form');

        var tabs = $('#chart-list-tabs', body).chartListTabs(function (filter, data) {

            var settings = controlForm.getFormValue();
            chartListSection.decolorize();
            if (eval(settings.colorize)) {
                chartListSection.colorize(data.colorbase, data.colortype, data.colororder);
            }

            chartListSection.attr('data-filter', filter);
            chartListSection.trigger('ss-resize');
            chartListSection.cellMap = chartListCell.chartCellMap(filter);

            $('.empty-cell', chartListSection).removeClass('empty-cell');
            var emptyCells = chartListSection.cellMap.__empty__;
            if (emptyCells) {
                emptyCells.addClass('empty-cell');
            }
        });

        if (q.filter) {
            var tab = $('#' + q.filter);
            if (tab.size()) {
                tab.click();
            } else {
                tabs.first().click();
            }
        } else {
            tabs.first().click();
        }

        controlForm.chartControlForm(function (settings) {
            chartListSection.decolorize();
            if (eval(settings.colorize)) {
                var tab = tabs.filter('.tab-selected');
                if (tab.size()) {
                    var data = tab.data();
                    chartListSection.colorize(data.colorbase, data.colortype, data.colororder);
                }
            }
        });


        $('#colorize-input-on').click();//FIXME remove
    });
})(jQuery, Handlebars, window['l']);
