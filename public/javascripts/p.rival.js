/**
 * public script for rival
 *
 *  -- namespaces --
 *  $ : jQuery
 *  l : message resource
 *  Hbs : handlebars
 *
 */
(function ($, l, Hbs) {
    var tmpl = {
        li: Hbs.templates['rival-list-item']
    };
    $.fn.extend({
        rivalSearchForm: function (callback) {
            var form = $(this);
            form.searchForm(callback);
            return form;
        },
        rivalListItem: function () {
            return $(this)
                .destroyableListItem()
                .editableListItem('dblclick');
        },
        rivalList: function (data) {
            var ul = $(this);
            ul.htmlHandlebars(tmpl.li, data)
                .find('li')
                .rivalListItem();
            return ul;
        },
        rivalListSection: function () {
            var section = $(this),
                addBtn = section.findByRole('add-btn'),
                ul = section.find('ul'),
                searchForm = section.findByRole('search-form');
            ul.appendableList(tmpl.li, addBtn, function (li) {
                li.rivalListItem();
            });
            searchForm.rivalSearchForm(function (data) {
                ul.rivalList(data);
            }).submit();
            return section;
        }
    });

    $(function () {
        var body = $(document.body);

        $('#rival-list-section', body).rivalListSection();
    });
})(jQuery, window['l'], Handlebars);
