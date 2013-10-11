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
        editableForm: function (mode) {
            var form = $(this);
            form.findByRole('editable-text')
                .editableText('dblclick');
            var $checkable = $('.checkable-label', form);
            switch (mode) {
                case 'view':
                    $checkable.each(function () {
                        var label = $(this),
                            input = $('#' + label.attr('for'));
                        if (!input.size()) return;
                        var checked = input.is(':checked');
                        console.log('checked', checked);
                        if (checked) {
                            label.show();
                        } else {
                            label.hide();
                        }
                    });
                    break;
                case 'edit':
                    $checkable.show();
                    break;
            }
            form.attr('data-mode', mode);
        },
        clientDetailForm: function () {
            var form = $(this),
                editBtn = $('#edit-btn'),
                msgBalloon = $('#save-done-msg', form).hide(),
                cover = $('#client-detail-form-cover', form);
            cover.click(function () {
                msgBalloon.hide();
            });
            form.ajaxForm(function () {
                msgBalloon.show();
                editBtn.show();
                form.editableForm('view');
            });
            $('input,select,textarea', form).not(':submit').on("click change", function () {
                msgBalloon.hide();
            });
            editBtn.click(function () {
                form.editableForm('edit');
                msgBalloon.hide();
                editBtn.hide();
            });
            form.editableForm('view');
//            form.editableForm('edit'); //TODO remove
            return form;
        },
        clientDetailSection: function () {
            var section = $(this),
                form = $('#client-detail-form', section);
            form.clientDetailForm();
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
        }
    });

    $(function () {
        var body = $(document.body);
        $('#client-detail-section', body).clientDetailSection();
    });
})(jQuery);
