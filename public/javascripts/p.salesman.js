/**
 * public script for salesman
 *
 *  -- namespaces --
 *  $ : jQuery
 *  l : message resource
 *  Hbs : handlebars
 *
 */
(function ($, l, Hbs) {
    var tmpl = {
        li: Hbs.templates['salesman-list-item']
    };
    $.fn.extend({
        salesmanSearchForm: function (callback) {
            var form = $(this);
            form.searchForm(callback);
            return form;
        },
        salesmanListItem: function () {
            return $(this)
                .destroyableListItem()
                .editableListItem('dblclick');
        },
        salesmanList: function (data) {
            var ul = $(this);
            ul.htmlHandlebars(tmpl.li, data)
                .find('li')
                .salesmanListItem();
            return ul;
        },
        salesmanListSection: function () {
            var section = $(this),
                addBtn = section.findByRole('add-btn'),
                ul = section.find('ul'),
                searchForm = section.findByRole('search-form');
            ul.appendableList(tmpl.li, addBtn, function (li) {
                li.salesmanListItem();
            });
            searchForm.salesmanSearchForm(function (data) {
                ul.salesmanList(data);
            }).submit();
            return section;
        }
    });

    $(function () {
        var body = $(document.body);

        $('#salesman-list-section', body).salesmanListSection();
    });
})(jQuery, window['l'], Handlebars);
