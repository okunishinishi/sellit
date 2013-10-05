(function ($) {
    var tmpl = {
        clientLi: Handlebars.templates['client-list-item'],
        departmentLi: Handlebars.templates['department-list-item']
    };
    $.fn.extend({
        clientDetailForm: function () {
            var form = $(this);
            form.ajaxForm(function () {

            });
            form.findByRole('editable-text').editableText();
            return form;
        },
        clientDetailSection: function () {
            var section = $(this),
                form = $('#client-detail-form', section);

            form.clientDetailForm();

            return section;
        },
        departmentSearchForm: function (callback) {
            var form = $(this);
            form.searchForm(callback);
            return form;
        },
        departmentListItem: function () {
            return $(this)
                .destroyableListItem()
                .editableListItem();
        },
        departmentList: function (data) {
            var ul = $(this);
            ul.htmlHandlebars(tmpl.departmentLi, data)
                .find('li')
                .departmentListItem();
            return ul;
        },
        departmentListSection: function () {
            var section = $(this),
                addBtn = section.findByRole('add-btn'),
                ul = section.find('ul'),
                searchForm = section.findByRole('search-form');
            ul.appendableList(tmpl.departmentLi, addBtn, function (li) {
                li
                    .departmentListItem();
                li.findByName('client_id')
                    .val(searchForm.findByName('client_id').val());
            });
            searchForm.departmentSearchForm(function (data) {
                ul.departmentList(data);
            }).submit();
        }
    });

    $(function () {
        var body = $(document.body);
        $('#department-list-section', body).departmentListSection();
        $('#client-detail-section', body).clientDetailSection();

    });
})(jQuery);
