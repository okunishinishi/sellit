(function ($, Hbs, l, document) {

    var ss = $.spreadsheet;
    var tmpl = {
        chartTbodyThContent: Hbs.templates['chart-tbody-th-content'],
        chartCellContent: Hbs.templates['chart-cell-content']
    };

    if (!history.pushState) {
        history.pushState = function () {
            //TODO push state fallback
        }
    }

    function safeNumber(a) {
        return Number(a.replace(/[^\d]/g, ''));
    }

    var sorter = {
        numeric: function (a, b) {
            return safeNumber(a) - safeNumber(b);
        },
        string: function (a, b) {
            return a && a.localeCompare(b);
        },
        random: function () {
            return Math.random() - Math.random();
        }
    };

    $.extend({
    });

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
            section.spreadsheet(sheetData);

            section.find('.top-fixed-thead').find('tr').find('th').first()
                .text(l.lbl.chart_title).addClass('chart-title');
            return section;
        },
        chartListTabs: function (callback) {
            var tabs = $(this);
            return tabs.find('.tab').click(function () {
                var clicked = $(this),
                    id = clicked.attr('id');

                $.pushQueryToState({
                    filter: id
                });
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
                if (filter === 'all-filter') {
                    cell.find('label').each(function () {
                        var label = $(this);
                        if (label.data('value')) value = '__not_empty__';
                    });
                }
                if (!map[value]) map[value] = $();
                map[value] = map[value].add(cell);
            });
            return map;
        },
        visualize: function (visualize) {
            var elm = $(this);
            if (visualize) {
                elm.filter(':hidden').openUp();
            } else {
                elm.filter(':visible').closeDown();
            }
            return elm;
        },
        chartControlForm: function (callback) {
            var form = $(this),
                systemFilterDiv = $('#system-filter-p', form),
                clientFilterDiv = $('#client-filter-p', form);


            form.find(':checkbox,:radio').change(function () {
                form.submit();
            });

            form
                .submit(function (e) {
                    e.preventDefault();
                    var formValue = form.getFormValue();


                    formValue.use_system_filter = eval(formValue.use_system_filter);
                    systemFilterDiv.visualize(formValue.use_system_filter);


                    formValue.use_client_filter = eval(formValue.use_client_filter);
                    clientFilterDiv.visualize(formValue.use_client_filter);

                    formValue.use_colorize = eval(formValue.use_colorize);
                    formValue.use_scalize = eval(formValue.use_scalize);

                    $.pushQueryToState({
                        use_system_filter: formValue.use_system_filter,
                        use_client_filter: formValue.use_client_filter,
                        use_colorize: formValue.use_colorize,
                        use_scalize: formValue.use_scalize
                    });

                    callback(formValue.toObj());
                });
            return form;
        }
    });

    $(function () {
        var body = $(document.body),
            win = $(window),
            q = $.getQuery();

        var chartListSection = $('#chart-list-section', body).chartListSection(),
            chartListCell = $('.ss-cell', chartListSection);

        chartListSection.colorize = function (base, type, order) {
            if (!base) return;
            var cellMap = chartListSection.cellMap;
            if (!cellMap) return;


            var values = Object.keys(cellMap).sort(sorter.string);
            var colors = null;
            switch (type || 'rainbow') {
                case 'rainbow':
                    colors = $.rainbowColor(base, values.length);
                    break;
            }
            values && values.forEach(function (value, i) {
                if (value === '__empty__') return;
                var color = colors[i],
                    cell = cellMap[value];
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

        chartListSection.scalize = function (min, max) {
            chartListSection.addClass('scalized');
            var cellMap = chartListSection.cellMap;
            if (!cellMap) return;
            if (!min) return;
            var values = Object.keys(cellMap).sort(sorter.numeric),
                step = (max - min) / (values.length - 1);

            values && values.forEach(function (value, i) {
                if (value === '__empty__') return;
                var scale = min + step * i;

                cellMap[value]
                    .find('.chart-cell-content')
                    .removeAttr('style')
                    .find('label:visible').css({
                        fontSize: scale + 'em',
                        padding: 0,
                        textAlign: 'center'
                    });
            });
            chartListSection.resize.leftFixed();
        };

        chartListSection.descalize = function () {
            chartListSection.removeClass('scalized');
            chartListCell.find('label').removeAttr('style');
            chartListSection.resize.leftFixed();
        };

        chartListSection.findAllBodyRows = function () {
            return chartListSection.findAllTables()
                .children('tbody').children('tr')
        };
        chartListSection.findAllTables = function () {
            return chartListSection.findSSTable()
                .add(chartListSection.findLeftFixed());
        };
        chartListSection.findSSTable = function () {
            return chartListSection.children('.ss-scrollable').children('.ss-table');
        };
        chartListSection.findLeftFixed = function () {
            return chartListSection.children('.ss-left-fixed-table');
        };

        chartListSection.filterByClient = function (client_index) {
            chartListSection.filterByClient.filtered = true;
            var filter_condition = client_index;
            if($.isArray(filter_condition)){
                filter_condition = filter_condition.join(',');
            }
            var changed = chartListSection.filterByClient.filter_condition !== filter_condition;
            if (!changed) return;
            chartListSection.filterByClient.filter_condition = filter_condition;
            chartListSection.findAllTables().each(function () {
                var table = $(this),
                    tr = table.children('tbody').children('tr');
                tr.hide();
                client_index && [].concat(client_index).forEach(function (index) {
                    tr.eq(index).show();
                });
            });
            chartListSection.trigger('ss-resize');
        };
        chartListSection.filterByClient.off = function () {
            var filtered = chartListSection.filterByClient.filtered;
            if (!filtered) return;
            chartListSection.filterByClient.filter_condition = null;
            chartListSection.findAllBodyRows().show();
            chartListSection.filterByClient.filtered = false;
        };

        chartListSection.filterBySystem = function (system_index) {
            chartListSection.filterBySystem.filtered = true;
            var filter_condition = system_index.join(',');
            var changed = chartListSection.filterBySystem.filter_condition !== filter_condition;
            if (!changed) return;
            chartListSection.filterBySystem.filter_condition = filter_condition;
            var thead = chartListSection.find('.ss-table').children('thead');
            chartListSection.find('.ss-cell').hide();
            thead.find('.ss-head-th').hide();
            system_index && [].concat(system_index).forEach(function (index) {
                thead.each(function () {
                    $(this).find('.ss-head-th').eq(index).show();
                });
                chartListSection.findAllBodyRows().each(function () {
                    var tr = $(this);
                    tr.find('.ss-cell').eq(index).show();
                });
            });
        };
        chartListSection.filterBySystem.off = function () {
            var filtered = chartListSection.filterBySystem.filtered;
            if (!filtered) return;
            chartListSection.filterBySystem.filter_condition = null;
            chartListSection.find('.ss-cell').show();
            var thead = chartListSection.find('.ss-table').children('thead');
            thead.find('.ss-head-th').show();

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

        chartListSection.resize.leftFixed = function () {
            var leftFixed = chartListSection.findLeftFixed(),
                ssTable = chartListSection.findSSTable(),
                ssTr = ssTable.children('tbody').children('tr');
            $('.ss-body-th', leftFixed).each(function (i) {
                var th = $(this);
                th.height(ssTr.eq(i).find('th').last().height());
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
        controlForm.setFormValue(q);

        controlForm.chartControlForm(function (settings) {
            chartListSection.decolorize();
            chartListSection.descalize();

            var tab = tabs.filter('.tab-selected');
            if (!tab.size()) return;
            var data = tab.data();


            var use_colorize = settings.use_colorize;
            if (use_colorize) {
                chartListSection.colorize(data.colorbase, data.colortype, data.colororder);
            }

            var use_scalize = settings.use_scalize;
            if (use_scalize) {
                chartListSection.scalize(data.scalemin, data.scalemax);
            }

            if (settings.use_client_filter) {
                chartListSection.filterByClient(settings.client_index);
            } else {
                chartListSection.filterByClient.off();
            }

            if (settings.use_system_filter) {
                chartListSection.filterBySystem(settings.system_index);
            } else {
                chartListSection.filterBySystem.off();
            }
        });


        var tabs = $('#chart-list-tabs', body).chartListTabs(function (filter, data) {
            var colorizeField = $('#use-colorize-field', body),
                scalizeField = $('#use-scalize-field', body);

            var colorbase = data.colorbase;
            colorbase ? colorizeField.show() : colorizeField.hide();

            var scalemin = data.scalemin;
            scalemin ? scalizeField.show() : scalizeField.hide();


            chartListSection.busy(function () {
                chartListSection.attr('data-filter', filter);

                chartListSection.resize();

                chartListSection.cellMap = chartListCell.chartCellMap(filter);


                var emptyCells = chartListSection.cellMap.__empty__ || $();
                $('.empty-cell', chartListSection).not(emptyCells).removeClass('empty-cell');
                emptyCells.addClass('empty-cell');


                controlForm.submit();
            });

            setTimeout(function () {
                chartListSection.trigger('ss-resize');
            }, 100);
        });

        if (q.filter) {
            var tab = $('#' + q.filter);
            if (tab.size()) {
                tab.click();
            } else {
                tabs.eq(1).click();
            }
        } else {
            tabs.eq(1).click();
        }

        win.resize(function () {
            chartListSection.trigger('ss-resize');
            var leftFixed = $('.ss-left-fixed-table');
            leftFixed.find('th').first().height(
                chartListSection.find('.ss-head-th').last().height()
            );
        });
    });
})(jQuery, Handlebars, window['l'], document);
