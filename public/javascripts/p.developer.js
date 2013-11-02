/**
 * public script for developer
 *
 *  -- namespaces --
 *  $ : jQuery
 *  l : message resource
 *  Hbs : handlebars
 *
 */
(function ($, l, Hbs) {
    var tmpl = {
        li: Hbs.templates['developer-list-item']
    };
    $.fn.extend({
        developerSearchForm: function (callback) {
            var form = $(this);
            form.searchForm(callback);
            return form;
        },
        developerListItem: function () {
            return $(this)
                .destroyableListItem()
                .editableListItem('dblclick');
        },
        developerList: function (data) {
            var ul = $(this);
            ul.htmlHandlebars(tmpl.li, data)
                .find('li')
                .developerListItem();
            return ul;
        },
        developerListSection: function () {
            var section = $(this),
                addBtn = section.findByRole('add-btn'),
                ul = section.find('ul'),
                searchForm = section.findByRole('search-form');
            ul.appendableList(tmpl.li, addBtn, function (li) {
                li.developerListItem();
            });
            searchForm.developerSearchForm(function (data) {
                ul.developerList(data);
            }).submit();
            return section;
        }
    });

    $(function () {
        var body = $(document.body);

        $('#developer-list-section', body).developerListSection();
    });
})(jQuery, window['l'], Handlebars);
