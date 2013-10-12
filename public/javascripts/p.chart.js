(function ($) {
    var tmpl = {
        li: Handlebars.templates['chart-list-item']
    };
    $.fn.extend({
        tableData: function () {
            var table = $(this),
                thead = table.find('thead'),
                tbody = table.find('tbody'),
                result = {
                    head: [],
                    body: []
                };
            thead.find('tr').find('th').each(function () {
                var cell = $(this),
                    text = cell.text() || '';
                result.head.push(text);
            });
            tbody.find('tr').each(function () {
                var tr = $(this);
                var data = [];
                tr.find('th,td').each(function () {
                    var cell = $(this);
                    data.push({
                        sort_num: cell.data('sort_num') || undefined,
                        color: cell.data('color') || undefined,
                        text: cell.text() || '',
                        href: cell.find('a').attr('href')
                    });
                });
                result.body.push(data);
            });
            return result;
        },
        sortableTable: function (callback) {
            var table = $(this),
                thead = table.find('thead'),
                tbody = table.find('tbody');
            $('th', thead).addClass('sortable-th').click(function () {
                var th = $(this),
                    i = th.prevAll('th').size() || 0,
                    asc = th.data('asc');
                var data = table.tableData()['body'],
                    bodyHTML = '';
                data
                    .sort(function (a, b) {
                        var order = (asc ? 1 : -1);
                        if (typeof(a[i].sort_num) === "undefined") {
                            var sort = a[i]['text'].localeCompare(b[i]['text']) * order;
                            if (sort) {
                                return  sort;
                            }
                        }
                        return (a[i]['sort_num'] - b[i]['sort_num']) * order;
                    })
                    .forEach(function (data) {
                        var rowHtml = "<tr>";
                        data.forEach(function (data) {
                            var html = data.text;
                            if (data.href) html = '<a href="' + data.href + '">' + html + '</a>';
                            rowHtml += [
                                "<td data-sort_num='" + (data.sort_num || '') + "' data-color='" + data.color + "'>",
                                html,
                                "</td>"
                            ].join('');
                        });
                        rowHtml += "</tr>";
                        bodyHTML += rowHtml;
                    });
                if (asc) {
                    th.addClass('asc')
                        .removeClass('desc');
                } else {
                    th.addClass('desc').removeClass('asc');
                }
                th.siblings().removeClass('asc').removeClass('desc');
                th.data('asc', !asc);
                tbody.html(bodyHTML);
                callback && callback();
            }).prepend('<i class="icon icon-chevron-up"></i><i class="icon icon-chevron-down"></i>');
            return table;
        },
        chartListTable: function () {
            var table = $(this),
                thead = table.find('thead'),
                tbody = table.find('tbody'),
                maxCol = 0;
            $('tr', tbody).each(function () {
                var tr = $(this),
                    col = tr.find('th,td').size();
                if (maxCol < col) {
                    maxCol = col;
                }
            });
            $('tr', thead).each(function () {
                var tr = $(this);
                var cell = tr.find('th,td').last(),
                    colspan = parseInt(cell.attr("colspan") || 1);
                if (colspan < maxCol) {
                    cell.attr('colspan', maxCol - colspan);
                }
            });
            $('tr', tbody).each(function () {
                var tr = $(this),
                    cols = tr.find('th,td').size();
                for (var i = cols; i < maxCol; i++) {
                    tr.append('<td></td>');
                }
            });

            function recolor() {
                $('td', tbody).each(function () {
                    var td = $(this),
                        color = td.data('color');
                    if (!color) return;
                    td.prepend('<span class="color-label" style="background-color:' + color + ';"></span>');
                })
            }

            table.sortableTable(function () {
                recolor();
            });
            recolor();
            return table;
        }
    });

    $(function () {
        var body = $(document.body);

        $('#chart-list-table', body).chartListTable();
    });
})(jQuery);
