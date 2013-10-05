(function ($) {
    var tmpl = {
        li: Handlebars.templates['__model_name__-list-item']
    };
    $.fn.extend({
        __modelName__SearchForm: function (callback) {
            var form = $(this);
            form.searchForm(callback);
            return form;
        },
        __modelName__ListItem: function () {
            return $(this)
                .destroyableListItem()
                .editableListItem();
        },
        __modelName__List: function (data) {
            var ul = $(this);
            ul.htmlHandlebars(tmpl.li, data)
                .find('li')
                .__modelName__ListItem();
            return ul;
        },
        __modelName__ListSection: function () {
            var section = $(this),
                addBtn = section.findByRole('add-btn'),
                ul = section.find('ul'),
                searchForm = section.findByRole('search-form');
            ul.appendableList(tmpl.li, addBtn, function (li) {
                li.__modelName__ListItem();
            });
            searchForm.__modelName__SearchForm(function (data) {
                ul.__modelName__List(data);
            }).submit();
            return section;
        }
    });

    $(function () {
        var body = $(document.body);

        $('#__model_name__-list-section', body).__modelName__ListSection();
    });
})(jQuery);
