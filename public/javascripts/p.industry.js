(function ($) {
    var tmpl = {
        li: Handlebars.templates['industry-list-item']
    };
    $.fn.extend({
        industrySearchForm: function (callback) {
            var form = $(this);
            form.searchForm(callback);
            return form;
        },
        industryListItem: function () {
            return $(this)
                .destroyableListItem()
                .editableListItem();
        },
        industryList: function (data) {
            var ul = $(this);
            ul.htmlHandlebars(tmpl.li, data)
                .find('li')
                .industryListItem();
            return ul;
        },
        industryListSection: function () {
            var section = $(this),
                addBtn = section.findByRole('add-btn'),
                ul = section.find('ul'),
                searchForm = section.findByRole('search-form');
            ul.appendableList(tmpl.li, addBtn, function (li) {
                li.industryListItem();
            });
            searchForm.industrySearchForm(function (data) {
                ul.industryList(data);
            }).submit();
            return section;
        }
    });

    $(function () {
        var body = $(document.body);

        $('#industry-list-section', body).industryListSection();
    });
})(jQuery);
