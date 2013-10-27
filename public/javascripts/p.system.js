/**
 * public script for system
 *
 *  -- namespaces --
 *  $ : jQuery
 *  l : message resource
 *  Hbs : handlebars
 *
 */
(function ($, l, Hbs) {
    var tmpl = {
        li: Hbs.templates['system-list-item']
    };
    $.fn.extend({
        systemSearchForm: function (callback) {
            var form = $(this);
            form.searchForm(callback);
            return form;
        },
        systemListItem: function () {
            return $(this)
                .destroyableListItem()
                .editableListItem('dblclick');
        },
        systemList: function (data) {
            var ul = $(this);
            ul.htmlHandlebars(tmpl.li, data)
                .find('li')
                .systemListItem();
            return ul;
        },
        systemListSection: function () {
            var section = $(this),
                addBtn = section.findByRole('add-btn'),
                ul = section.find('ul'),
                searchForm = section.findByRole('search-form');
            ul.appendableList(tmpl.li, addBtn, function (li) {
                li.systemListItem();
            });
            searchForm.systemSearchForm(function (data) {
                ul.systemList(data);
            }).submit();
            return section;
        }
    });

    $(function () {
        var body = $(document.body);

        $('#system-list-section', body).systemListSection();
    });
})(jQuery, window['l'], Handlebars);
