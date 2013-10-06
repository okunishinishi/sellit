(function ($) {
    Array.prototype.contains = function (val) {
        var s = this, hit = false;
        for (var i = 0; i < s.length; i++) {
            hit = s[i] === val;
            if (hit) return true;
        }
        return false;
    };
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
                .editableListItem("dblclick")
                .click(function () {
                    var li = $(this),
                        values = li.findByName('edit-form').getFormValue();
                    li
                        .addClass('selected')
                        .trigger('department-list-item-select', [values, li])
                        .siblings('li.selected')
                        .removeClass('selected');
                })
                .find('.block-list-item-control')
                .click(function (e) {
                    e.stopPropagation();
                });
        },
        departmentList: function (data) {
            var ul = $(this);
            ul.htmlHandlebars(tmpl.departmentLi, data)
                .find('li')
                .departmentListItem();
            ul.find('li').first().click();
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
            return section;
        },
        clientProductForm: function (data, callback) {
            var form = $(this);
            if (!form.hasClass('ajax-form')) {
                form
                    .addClass('ajax-form')
                    .ajaxForm(function (data) {
                        callback(data.model);
                    })
                    .find(':checkbox').change(function () {
                        form.submit();
                    });
            }
            form.findByName('_id').val(data._id);
            var product_ids = data.product_ids && data.product_ids.split(',') || [];
            form.findByName('product_ids').each(function () {
                var checkbox = this,
                    $checkbox = $(checkbox);
                checkbox.checked = product_ids.contains($checkbox.val());
            });
            return form;
        },
        clientDetailPaper: function (data, callback) {
            var paper = $(this);
            paper.find('[data-name]').each(function () {
                var elm = $(this),
                    name = elm.data('name');
                elm.text(data[name]);
            });
            paper.find('#client-product-form').clientProductForm(data, function (data) {
                callback && callback(data);
            });
            return paper;
        }
    });

    $(function () {
        var body = $(document.body);
        $('#department-list-section', body).departmentListSection()
            .on('department-list-item-select', function (e, data, li) {
                $('#client-detail-paper', body).clientDetailPaper(data, function (data) {
                    li.findByName('product_ids').val(data['product_ids']);
                });
            });
        $('#client-detail-section', body).clientDetailSection();

    });
})(jQuery);
