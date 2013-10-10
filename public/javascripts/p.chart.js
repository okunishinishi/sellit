(function ($) {
    var tmpl = {
        li: Handlebars.templates['chart-list-item']
    };
    $.fn.extend({
        chartSearchForm: function (callback) {
            var form = $(this);
            form.searchForm(callback);
            return form;
        },
        chartListItem: function () {
            return $(this)
                .destroyableListItem()
                .editableListItem();
        },
        chartList: function (data) {
            var ul = $(this);
            ul.htmlHandlebars(tmpl.li, data)
                .find('li')
                .chartListItem();
            return ul;
        },
        chartListSection: function () {
            var section = $(this),
                addBtn = section.findByRole('add-btn'),
                ul = section.find('ul'),
                searchForm = section.findByRole('search-form');
            ul.appendableList(tmpl.li, addBtn, function (li) {
                li.chartListItem();
            });
            searchForm.chartSearchForm(function (data) {
                ul.chartList(data);
            }).submit();
            return section;
        }
    });

    $(function () {
        var body = $(document.body);

        $('#chart-list-section', body).chartListSection();
    });
})(jQuery);
