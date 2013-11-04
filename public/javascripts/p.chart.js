(function ($, Hbs, l) {

    var ss = $.spreadsheet;
    var tmpl = {
        chartTbodyThContent: Hbs.templates['chart-tbody-th-content'],
        chartCellContent: Hbs.templates['chart-cell-content']
    };

    if (!history.pushState) {
        history.pushState = function () {
            //TODO push state
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
        pushQueryToState: function (values) {
            var query = new tek.Query(location.search.replace('?', ''));
            for (var key in values) {
                if (!values.hasOwnProperty(key)) continue;
                query[key] = values[key];
            }
            var new_url = [location.path, $.param(query)].join('?');
            history.pushState(null, null, new_url);
        }
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
                    cell.find('label').each(function(){
                        var label = $(this);
                        if(label.data('value')) value = '__not_empty__';
                    });
                }
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
            q = new tek.Query(location.search.replace('?', '') || '');

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
        };

        chartListSection.descalize = function () {
            chartListSection.removeClass('scalized');
            chartListCell.find('label').removeAttr('style');
        };

        chartListSection.findAllBodyRows = function () {
            return chartListSection.children('.ss-scrollable').children('.ss-table')
                .add(chartListSection.children('.ss-left-fixed-table'))
                .children('tbody').children('tr')
        };

        chartListSection.filterByClient = function (client_names) {
            chartListSection.filterByClient.filtered = true;
            var filter_condition = client_names.join(',');
            var changed = chartListSection.filterByClient.filter_condition !== filter_condition;
            if (!changed) return;
            chartListSection.filterByClient.filter_condition = filter_condition;
            var rowMap = chartListSection.rowMap;
            if (!rowMap) return;
            chartListSection.findAllBodyRows().hide();
            client_names && [].concat(client_names).forEach(function (client_name) {
                var row = rowMap[client_name];
                if (row) row.show();
            });
        };
        chartListSection.filterByClient.off = function () {
            var filtered = chartListSection.filterByClient.filtered;
            if (!filtered) return;
            chartListSection.findAllBodyRows().show();
            chartListSection.filterByClient.filtered = false;
        };

        chartListSection.filterBySystem = function (system_names) {
            chartListSection.filterBySystem.filtered = true;
            var filter_condition = system_names.join(',');
            var changed = chartListSection.filterBySystem.filter_condition !== filter_condition;
            if (!changed) return;
            chartListSection.filterBySystem.filter_condition = filter_condition;
            var thead = chartListSection.find('.ss-table').children('thead');
            var indexMap = chartListSection.filterBySystem.indexMap;
            if (!indexMap) {
                indexMap = chartListSection.filterBySystem.indexMap = {};
                thead.first().find('th').each(function (i) {
                    var th = $(this),
                        text = th.text();
                    indexMap[text] = (i - 1);
                });
            }
            chartListSection.find('.ss-cell').hide();
            thead.find('.ss-head-th').hide();
            system_names && [].concat(system_names).forEach(function (systemname) {
                if (!indexMap.hasOwnProperty(systemname)) return;
                var index = indexMap[systemname];
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

        chartListSection.resize.chrome = function () {
            var leftFixed = $('.ss-left-fixed-table');
            $('.ss-body-th', leftFixed).each(function (i) {
                var th = $(this);
                var padding = Number(th.css('paddingBottom').replace('px', ''));
                th.height(th.height() + padding + .5);
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
                chartListSection.filterByClient(settings.client_name);
            } else {
                chartListSection.filterByClient.off();
            }

            if (settings.use_system_filter) {
                chartListSection.filterBySystem(settings.system_name);
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
                chartListSection.rowMap = chartListSection.findAllBodyRows().chartRowMap();


                var emptyCells = chartListSection.cellMap.__empty__ || $();
                $('.empty-cell', chartListSection).not(emptyCells).removeClass('empty-cell');
                emptyCells.addClass('empty-cell');

                if (window.chrome) chartListSection.resize.chrome();

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
