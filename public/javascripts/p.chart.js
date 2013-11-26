(function ($, hbs, l, document) {

    var ss = $.spreadsheet;
    var tmpl = {
        chartTheadThContent: hbs.templates['chart-thead-th-content'],
        chartTbodyThContent: hbs.templates['chart-tbody-th-content'],
        chartCellContent: hbs.templates['chart-cell-content']
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
        chartListSection: function (callback) {
            var section = $(this),
                data = section.data();

            if (!data) return section;

            var headData = new ss.HeadData(data['headrow'].map(function (data) {
                    return tmpl.chartTheadThContent(data);
                })),
                bodyData = data['rows'].map(function (row) {
                    var label = tmpl.chartTbodyThContent(row.shift());
                    return new ss.RowData(label, row.map(function (data) {
                        return tmpl.chartCellContent(data);
                    }));
                });
            var sheetData = new ss.SheetData('', headData, bodyData);
            section.spreadsheet(sheetData);

            var topFixed = section
                .find('.top-fixed-thead');

            var leftFixed = $('.ss-left-fixed-table', section);

            var topFixedTh = topFixed.find('tr').find('th');
            topFixedTh.off('click').click(function (e) {
                e.stopImmediatePropagation();
            });
            topFixedTh.first()
                .text(l.lbl.chart_title).addClass('chart-title');

            var ssTable = $('.ss-table', section);

            ssTable.sortableTable(function () {
                var bodyTh = ssTable.find('.ss-body-th');
                leftFixed.html($.spreadsheet.createLeftFixed(bodyTh));
                callback && callback();
            });
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
        },
        clientGroupForm: function () {
            var form = $(this);
            form
                .submit(function (e) {
                    e.preventDefault();
                    var query = $.getQuery(),
                        values = form.getFormValue().toObj();
                    Object.keys(values).forEach(function (key) {
                        query[key] = values[key];
                    });
                    location.href = [location.pathname, $.param(query)].join('?');
                })
                .change(function () {
                    form.submit();
                });
            return form;
        },
        chartGroupNavItem: function (command, callback) {
            return $(this).each(function () {
                var item = $(this);
                switch (command) {
                    case 'focus':
                        item
                            .addClass('chart-group-nav-focused');
                        var nav = item.children('.chart-group-nav')
                            .removeClass('chart-group-nav-hidden');

                        var allItem = nav.children('.chart-group-nav-all');
                        if (allItem.size()) {
                            allItem.chartGroupNavItem('focus', callback);
                        } else {
                            callback(item);
                        }
                        break;
                    case 'blur':
                        item.find('.chart-group-nav').addClass('chart-group-nav-hidden');
                        item.find('.chart-group-nav-item')
                            .add(item)
                            .removeClass('chart-group-nav-focused');
                        break;
                }
            });
        },
        chartGroupNav: function (callback) {
            var nav = $(this),
                items = nav.children('.chart-group-nav-item');

            if (!nav.length) return nav;

            var children = items.children('.chart-group-nav');
            items.not('.disabled').children('a').click(function (e) {
                var item = $(this).parent(),
                    focused = item.is('.chart-group-nav-focused');
                if (focused) {
                } else {
                    item.siblings().chartGroupNavItem('blur');
                    item.find('.chart-group-nav-item').find('.chart-group-nav-item').chartGroupNavItem('blur');
                    item.chartGroupNavItem('focus', function (item) {
                        callback && callback(item);
                    });
                }
                item.trigger('chart-group-nav-resize');
            });
            children.chartGroupNav(callback);
            return nav;
        },
        chartGroupNavContainer: function (client_group_id, data, callback) {
            var container = $(this),
                tmpl = {
                    nav: hbs.templates['chart-group-nav'],
                    navItem: hbs.templates['chart-group-nav-item']
                };

            function getHtml(data, depth, parent_id) {
                if (!data) return '';
                depth = depth || 0;
                var items = data.map(function (data) {
                    var children = data.children,
                        hasChildren = !!children && children.length,
                        sub_nav = hasChildren && getHtml(children, depth + 1, data._id);
                    return tmpl.navItem({
                        _id: data._id,
                        name: data.name,
                        sub_nav: sub_nav || ''
                    })
                });
                if (parent_id) {
                    var allItem = tmpl.navItem({
                        _id: parent_id,
                        name: l.lbl.chart_nav_all,
                        classes: 'chart-group-nav-all'
                    });
                    items.unshift(allItem);
                }
                return tmpl.nav({
                    items: items,
                    depth: depth
                });
            }

            container.resize = function (animate) {
                var nav = container
                    .find('.chart-group-nav')
                    .not('.chart-group-nav-hidden');
                var style = {
                    height: nav.first().outerHeight() * nav.size()
                };
                if (animate) {
                    container.animate(style, 200);
                } else {
                    container.css(style);
                }
            };
            container.html(getHtml(data));

            var root = container.children('.chart-group-nav').first();
            root
                .chartGroupNav(callback)
                .removeClass('chart-group-nav-hidden')
                .on('chart-group-nav-resize', function () {
                    container.resize(true);
                });

            root.children('.chart-group-nav-item').children('a').each(function () {
                var a = $(this),
                    ref = a.data('ref');
                a
                    .off('click')
                    .attr('href', ref);
            });

            var selectedItem = root.children('.chart-group-nav-item-' + client_group_id).first();
            if (selectedItem.size()) {
                var parentItems = selectedItem.parents('.chart-group-nav-item');
                parentItems
                    .add(selectedItem)
                    .addClass('chart-group-nav-focused');
                selectedItem
                    .children('.chart-group-nav')
                    .removeClass('chart-group-nav-hidden')
                    .children('.chart-group-nav-all')
                    .addClass('chart-group-nav-focused');
                callback && callback($('.chart-group-nav-focused', root).last());
            }

            container.resize();
            return container;
        },
        clientFilterLabel: function (group_id) {
            return $(this).each(function () {
                var label = $(this),
                    input = $('#' + label.attr('for')),
                    parent = label.data('parent');

                if (!parent) return;
                var hit = (parent.parent_ids || []).indexOf(group_id) != -1;
                label.toggleClass('client-filter-hidden', !hit);
            });
        },
        systemFilterLabel: function (systemNames) {
            return $(this).each(function () {
                var label = $(this),
                    input = $('#' + label.attr('for'));
                var empty = systemNames.indexOf($.trim(label.text())) === -1;
                label.toggleClass('system-group-filter-hidden', empty);
            });
        }
    });

    $(function () {
        var body = $(document.body),
            main = $('#main', body),
            win = $(window),
            q = $.getQuery();

        var chartListSection = $('#chart-list-section', main);
        chartListSection.chartListSection(function () {
            chartListSection.filterByClientGroup.reload();
            chartListSection.killCache();
            controlForm.submit();
        });
        var
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
                var content = cell
                    .css({
                        color: color,
                        borderColor: color,
                        backgroundColor: color
                    })
                    .find('.chart-cell-content').css({
                        backgroundColor: '#FFF'
                    });
                content
                    .find('.chart-cell-color-mark').css({
                        borderColor: color
                    });
                content
                    .find('.chart-cell-color-mark-hover').css({
                        backgroundColor: color
                    });
            });
            chartListSection.addClass('colorized');

            chartListCell.find('[data-text]').each(function () {
                var label = $(this),
                    text = label.data('text');
                if (!text) return;
                var value = label.data('value');
                if (value) return;
                label.parent('.chart-cell-content').css({
                        backgroundColor: '#EEE'
                    })
                    .parent('').css({
                        backgroundColor: '#AAA'
                    });
            });

        };
        chartListSection.decolorize = function () {
            chartListSection.removeClass('colorized');
            chartListCell
                .removeAttr('style')
                .find('.chart-cell-content,.chart-cell-color-mark,.chart-cell-color-mark-hover')
                .removeAttr('style');
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

        chartListSection.killCache = function () {
            chartListSection.filterByClient.filter_condition = null;
            chartListSection.filterBySystem.filter_condition = null;
        };
        chartListSection.filterByClient = function (filter_client_ids) {
            chartListSection.filterByClient.filtered = true;
            var filter_condition = filter_client_ids;
            if ($.isArray(filter_condition)) {
                filter_condition = filter_condition.join(',');
            }
            var changed = chartListSection.filterByClient.filter_condition !== filter_condition;
            if (!changed) return;
            chartListSection.filterByClient.filter_condition = filter_condition;
            chartListSection.findAllTables().children('tbody').children('tr').each(function () {
                var tr = $(this) ,
                    hit = false;
                filter_client_ids = [].concat(filter_client_ids || []);
                var client_id = tr.find('.th-content').attr('data-client_id');
                for (var i = 0, len = filter_client_ids.length; i < len; i++) {
                    hit = hit || (filter_client_ids[i] == client_id);
                    if (hit) break;
                }
                tr.toggleClass('client-filter-hidden', !hit);
            });
            chartListSection.trigger('ss-resize');
        };
        chartListSection.filterByClient.off = function () {
            var filtered = chartListSection.filterByClient.filtered;
            if (!filtered) return;
            chartListSection.filterByClient.filter_condition = null;
            chartListSection.findAllBodyRows().removeClass('client-filter-hidden');
            chartListSection.filterByClient.filtered = false;
        };

        chartListSection.filterByClientGroup = function (group_id) {
            chartListSection.filterByClientGroup.filter_condition = group_id;
            chartListSection.findAllTables().each(function () {
                var table = $(this);
                table.children('tbody').children('tr').each(function () {
                    var tr = $(this),
                        th = tr.find('th').first(),
                        parent = th.find('.th-content').data('parent');
                    var hit = (parent.parent_ids || []).indexOf(group_id) != -1;
                    tr.toggleClass('client-group-filter-hidden', !hit);
                });
            });
        };
        chartListSection.filterByClientGroup.reload = function () {
            var group_id = chartListSection.filterByClientGroup.filter_condition;
            chartListSection.filterByClientGroup(group_id);
        };

        chartListSection.filterBySystemGroup = function () {
            var table = chartListSection.findSSTable();
            var systemNames = chartListSection.filterBySystemGroup.getActiveSystemNames(table) || [];
            var thead = table.children('thead'),
                fixedThead = thead.filter('.top-fixed-thead'),
                fixedTheadTh = fixedThead.find('.ss-head-th');
            thead.not(fixedThead).find('.ss-head-th').each(function (i) {
                var th = $(this),
                    col = th.data('col');
                var systemName = $.trim(th.text());
                var empty = systemNames.indexOf(systemName) === -1;
                var cells = table.find('.tk-col-' + col);
                fixedTheadTh.eq(i).add(cells).add(th).toggleClass('empty-col', empty);
            });
            return systemNames;
        };
        chartListSection.filterBySystemGroup.getActiveSystemNames = function (table) {
            var result = [];
            table.find('.ss-body-th').filter(':visible').each(function () {
                var data = $(this).find('.th-content').data('system');
                if (data.system_names) result = result.concat(data.system_names);
            });
            return tek.unique(result);
        };

        chartListSection.filterBySystem = function (system_index) {
            chartListSection.filterBySystem.filtered = true;
            var filter_condition = system_index && [].concat(system_index).join(',');
            var changed = chartListSection.filterBySystem.filter_condition !== filter_condition;
            if (!changed) return;
            chartListSection.filterBySystem.filter_condition = filter_condition;
            var thead = chartListSection.find('.ss-table').children('thead');
            chartListSection.find('.ss-cell').addClass('system-filter-hidden');
            thead.find('.ss-head-th').addClass('system-filter-hidden');
            system_index && [].concat(system_index).forEach(function (index) {
                thead.each(function () {
                    $(this).find('.ss-head-th').eq(index).removeClass('system-filter-hidden');
                });
                chartListSection.findAllBodyRows().each(function () {
                    var tr = $(this);
                    tr.find('.ss-cell').eq(index).removeClass('system-filter-hidden');
                });
            });
        };
        chartListSection.filterBySystem.off = function () {
            var filtered = chartListSection.filterBySystem.filtered;
            if (!filtered) return;
            chartListSection.filterBySystem.filter_condition = null;
            chartListSection.find('.ss-cell').removeClass('system-filter-hidden');
            var thead = chartListSection.find('.ss-table').children('thead');
            thead.find('.ss-head-th').removeClass('system-filter-hidden');

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
                var origin = ssTr.eq(i).find('.ss-body-th').filter(':visible').last();
                var height = origin.height();
                if (height) th.height(height);
                var width = origin.width();
                if (width) th.width(width);
            });


            setTimeout(function () {
                var headTh = leftFixed.find('thead').find('th');
                var h = $('.tk-sortable-th', ssTable).eq(0).height();
                headTh.height(h);
            }, 5);
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
                    label = cell.find('label:visible'),
                    value = label.data('value');
                if (value) {
                    var syncCell = cellMap && cellMap[value];
                    if (syncCell && syncCell.size() > 1) {
                        syncCell.addClass('hover-sync');
                    }
                } else {
                    var text = label.data("text");
                    if (text) {
                        var syncLabel = chartListSection.findByAttr('data-text', text);
                        if (syncLabel.size() > 1) {
                            syncLabel.parents('.ss-cell').addClass('hover-sync');
                        }
                    }
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
                chartListSection.filterByClient(settings.filter_client_id);
            } else {
                chartListSection.filterByClient.off();
            }

            if (settings.use_system_filter) {
                chartListSection.filterBySystem(settings.system_index);
            } else {
                chartListSection.filterBySystem.off();
            }


            chartListSection.trigger('ss-resize');

            chartListSection.resize.leftFixed();
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
            chartListSection.resize.leftFixed();
        });

        $('#client-group-form', body).clientGroupForm();

        var groupNavContainer = $('#chart-group-nav-container', body);
        groupNavContainer.chartGroupNavContainer(q['client_group_id'], groupNavContainer.data('groups'), function (item) {
            var backgroundColor = item.find('a').css('background-color');
            if (backgroundColor) {
                main.css({
                    backgroundColor: backgroundColor
                });
            }
            var group_id = item.data('id');

            chartListSection.filterByClientGroup(group_id);
            $('#client-filter-p', main).find('label').clientFilterLabel(group_id);


            var systemNames = chartListSection.filterBySystemGroup();
            $('#system-filter-p', main).find('label').systemFilterLabel(systemNames);


            chartListSection.trigger('ss-resize');
            chartListSection.resize.leftFixed();
        });
    });
})(jQuery, Handlebars, window['l'], document);
