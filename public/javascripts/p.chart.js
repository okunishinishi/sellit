(function ($) {
    var tmpl = {
        li: Handlebars.templates['chart-list-item']
    };
    $.fn.extend({
        chartListTable: function () {
            var table = $(this),
                thead = table.find('thead'),
                tbody = table.find('tbody');
            var headRow = $('tr', thead);
            $('tr', tbody).each(function () {
                var tr = $(this),
                    size = tr.find('th,td').size();
                var larger = size - headRow.find('th,td').size();
                if (larger > 0) {
                    var cell = headRow.find('th,td').last(),
                        colspan = parseInt(cell.attr("colspan") || 1);
                    cell.attr('colspan', colspan + larger);

                }
            });
            return table;
        }
    });

    $(function () {
        var body = $(document.body);

        $('#chart-list-table', body).chartListTable();
    });
})(jQuery);
