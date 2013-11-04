(function ($, Hbs, l) {

    var ss = $.spreadsheet;
    var tmpl = {
        chartTbodyThContent: Hbs.templates['chart-tbody-th-content'],
        chartCellContent: Hbs.templates['chart-cell-content']
    };
    $.fn.extend({
        openUp: function () {
            var elm = $(this),
                height = elm.height();
            elm
                .show()
                .height(0)
                .animate({
                    height: height
                }, 300, function () {
                    elm.removeAttr('style');
                });
        },
        closeDown: function () {
            var elm = $(this);
            elm.animate({
                height: 0,
                paddingTop: 0,
                paddingBottom: 0,
                marginTop: 0,
                marginBottom: 0
            }, 310, function () {
                elm.removeAttr('style');
                elm.hide();
            });
        },
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
        chartRowMap: function () {
            var map = {};
            $(this).each(function () {
                var tr = $(this),
                    th = tr.find('th').first(),
                    text = $.trim(th.text());
                if (!map[text]) map[text] = $();
                map[text] = map[text].add(tr);
            });
            return map;
        },
        visualize: function (visualize) {
            var elm = $(this);
            if (visualize) {
//                elm.filter(':hidden').openUp();
                elm.show();
            } else {
//                elm.filter(':visible').closeDown();
                elm.hide();
            }
            return elm;
        },
        chartControlForm: function (callback) {
            var form = $(this),
                systemFilterDiv = $('#system-filter-p', form),
                clientFilterDiv = $('#client-filter-p', form);

            form.find(':radio,:checkbox').change(function () {
                form.submit();
            });
            form
                .submit(function (e) {
                    e.preventDefault();
                    var settings = form.getFormValue();


                    settings.use_system_filter = eval(settings.use_system_filter);
                    systemFilterDiv.visualize(settings.use_system_filter);


                    settings.use_client_filter = eval(settings.use_client_filter);
                    clientFilterDiv.visualize(settings.use_client_filter);

                    settings.use_colorize = eval(settings.use_colorize);


                    callback(settings.toObj());
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
            if (!base) return;
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
                    backgroundColor: color
                }).find('.chart-cell-content').css({

                        backgroundColor: '#FFF'
                    });
                content
                    .find('.chart-cell-color-mark').css({
                        borderColor: color
                    });
                content
                    .find('.chart-cell-color-mark-hover').css({
                        backgroundColor: color
                    })
            });
            chartListSection.addClass('colorized');
        };
        chartListSection.decolorize = function () {
            chartListSection.removeClass('colorized');
            chartListCell.removeAttr('style');
        };

        chartListSection.findAllBodyRows = function () {
            return chartListSection.children('.ss-scrollable').children('.ss-table')
                .add(chartListSection.children('.ss-left-fixed-table'))
                .children('tbody').children('tr')
        };

        chartListSection.filterByClient = function (client_names) {
            var rowMap = chartListSection.rowMap;
            if (!rowMap) return false;
            chartListSection.findAllBodyRows().hide();
            client_names && client_names.forEach(function (client_name) {
                var row = rowMap[client_name];
                if (row) row.show();
            });
            chartListSection.filterByClient.filtered = true;
            return true;
        };
        chartListSection.filterByClient.off = function () {
            var filtered = chartListSection.filterByClient.filtered;
            if (!filtered) return false;
            chartListSection.findAllBodyRows().show();
            chartListSection.filterByClient.filtered = false;
            return true;
        };

        chartListSection.filterBySystem = function (system_names) {
            chartListSection.filterBySystem.filtered = true;

            return true;
        };
        chartListSection.filterBySystem.off = function () {
            var filtered = chartListSection.filterBySystem.filtered;
            if (!filtered) return false;


            return true;
        };

        chartListSection.resize = function () {
            chartListCell.children('.chart-cell-content').attr('style', '');

            chartListSection.trigger('ss-resize');
            chartListCell.each(function () {
                var cell = $(this);
                cell.find('.chart-cell-content').first().css({
                    width: cell.width(),
                    height: cell.height()
                });
            });

        };

        chartListSection.busy = function (callback, duration) {
            chartListSection.addClass('loading').showSpin();
            setTimeout(function () {
                chartListSection.removeClass('loading').removeSpin();
                callback && callback();
            }, duration || 50);
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

        controlForm.chartControlForm(function (settings) {
            chartListSection.decolorize();
            var tab = tabs.filter('.tab-selected');
            if (!tab.size()) return;
            var data = tab.data();


            var use_colorize = settings.use_colorize;
            if (use_colorize) {
                chartListSection.colorize(data.colorbase, data.colortype, data.colororder);
            }

            var needsResize = false;
            if (settings.use_client_filter) {
                needsResize = chartListSection.filterByClient(settings.client_name) || needsResize;
            } else {
                needsResize = chartListSection.filterByClient.off() || needsResize;
            }

            if (settings.use_system_filter) {
                needsResize = chartListSection.filterBySystem(settings.system_name) || needsResize;
            } else {
                needsResize = chartListSection.filterBySystem.off() || needsResize;
            }

            if (needsResize) {

            }

        });


        var tabs = $('#chart-list-tabs', body).chartListTabs(function (filter, data) {

            var colorizeField = $('#use-colorize-field', body);
            var colorbase = data.colorbase;
            colorbase ? colorizeField.show() : colorizeField.hide();

            chartListSection.busy(function () {
                chartListSection.attr('data-filter', filter);

                chartListSection.resize();

                chartListSection.cellMap = chartListCell.chartCellMap(filter);
                chartListSection.rowMap = chartListSection.findAllBodyRows().chartRowMap();


                var emptyCells = chartListSection.cellMap.__empty__ || $();
                $('.empty-cell', chartListSection).not(emptyCells).removeClass('empty-cell');
                emptyCells.addClass('empty-cell');

                if (window.chrome) {
                    var leftFixed = $('.ss-left-fixed-table');
                    $('.ss-body-th', leftFixed).each(function (i) {
                        var th = $(this);
                        var padding = Number(th.css('paddingBottom').replace('px', ''));
                        th.height(th.height() + padding + .5);
                    });
                }

                controlForm.submit();
            });
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


        $('#colorize-input-on').click();//FIXME remove
    });
})(jQuery, Handlebars, window['l']);
