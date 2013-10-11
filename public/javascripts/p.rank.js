(function ($) {
    var tmpl = {
        li: Handlebars.templates['rank-list-item']
    };
    $.fn.extend({
        rankSearchForm: function (callback) {
            var form = $(this);
            form.searchForm(callback);
            return form;
        },
        rankListItem: function () {
            return $(this)
                .destroyableListItem()
                .editableListItem("dblclick");
        },
        rankList: function (data) {
            var ul = $(this);
            ul.htmlHandlebars(tmpl.li, data)
                .find('li')
                .rankListItem();
            return ul;
        },
        rankListSection: function () {
            var section = $(this),
                addBtn = section.findByRole('add-btn'),
                ul = section.find('ul'),
                searchForm = section.findByRole('search-form');
            ul.appendableList(tmpl.li, addBtn, function (li) {
                li.rankListItem();
            });
            searchForm.rankSearchForm(function (data) {
                ul.rankList(data);
            }).submit();
            return section;
        }
    });

    $(function () {
        var body = $(document.body);

        $('#rank-list-section', body).rankListSection();
    });
})(jQuery);
