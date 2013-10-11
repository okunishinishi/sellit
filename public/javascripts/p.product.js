(function ($) {
    var tmpl = {
        li: Handlebars.templates['product-list-item']
    };
    $.fn.extend({
        productSearchForm: function (callback) {
            var form = $(this);
            form.searchForm(callback);
            return form;
        },
        productListItem: function () {
            return $(this)
                .destroyableListItem()
                .editableListItem("dblclick");
        },
        productList: function (data) {
            var ul = $(this);
            ul.htmlHandlebars(tmpl.li, data)
                .find('li')
                .productListItem();
            return ul;
        },
        productListSection: function () {
            var section = $(this),
                addBtn = section.findByRole('add-btn'),
                ul = section.find('ul'),
                searchForm = section.findByRole('search-form');
            ul.appendableList(tmpl.li, addBtn, function (li) {
                li.productListItem();
            });
            searchForm.productSearchForm(function (data) {
                ul.productList(data);
            }).submit();
            return section;
        }
    });

    $(function () {
        var body = $(document.body);

        $('#product-list-section', body).productListSection();
    });
})(jQuery);
