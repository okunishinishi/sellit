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
                    var cell = $(this),
                        text = cell.text() || '';
                    data.push(text);
                });
                result.body.push(data);
            });
            return result;
        },
        sortableTable: function () {
            var table = $(this),
                thead = table.find('thead'),
                tbody = table.find('tbody');
            $('th', thead).addClass('sortable-th').click(function () {
                var th = $(this),
                    index = th.prevAll('th').size() || 0,
                    asc = th.data('asc');
                var data = table.tableData()['body'],
                    bodyHTML = '';
                data
                    .sort(function (a, b) {
                        return a[index].localeCompare(b[index]) * (asc ? 1 : -1);
                    })
                    .forEach(function (data) {
                        var rowHtml = "<tr>";
                        data.forEach(function (data) {
                            rowHtml += ["<td>", data , "</td>"].join('');
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
                for(var i=cols;i<maxCol; i++){
                    tr.append('<td></td>');
                }
            });
            table.sortableTable();
            return table;
        }
    });

    $(function () {
        var body = $(document.body);

        $('#chart-list-table', body).chartListTable();
    });
})(jQuery);
