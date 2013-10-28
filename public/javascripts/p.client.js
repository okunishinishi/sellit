/**
 * public script for client
 *
 *  -- namespaces --
 *  $ : jQuery
 *  l : message resource
 *  Hbs : handlebars
 *
 */
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
            var editableText = form.findByRole('editable-text')
                .editableText('dblclick')
                .off('change');
            var $checkable = $('.checkable-label', form);
            switch (mode) {
                case 'view':
                    $checkable.each(function () {
                        var label = $(this),
                            input = $('#' + label.attr('for'));
                        if (!input.size()) return;
                        var checked = input.is(':checked');
                        if (checked) {
                            label.show();
                        } else {
                            label.hide();
                        }
                    });
                    editableText.trigger('tk-editable-text-fix');
                    break;
                case 'edit':
                    $checkable.show();
                    editableText.trigger('tk-editable-text-edit');
                    break;
            }
            form.attr('data-mode', mode);
        },
        clientDetailForm: function () {
            var form = $(this),
                editBtn = $('#edit-btn'),
                submitBtn = $(':submit', form),
                msgBalloon = $('#save-done-msg').hide(),
                cover = $('#client-detail-form-cover', form);
            cover
                .click(function () {
                    msgBalloon.hide();
                })
                .dblclick(function () {
                    editBtn.click();
                });
            form.ajaxForm(function () {
                msgBalloon.show();
                editBtn.show();
                form.editableForm('view');
                submitBtn.removeAttr('disabled');
            });
            $('input,select,textarea', form).not(':submit').on("click change", function () {
                msgBalloon.hide();
            });
            editBtn.click(function () {
                form.editableForm('edit');
                msgBalloon.hide();
                editBtn.hide();
            });
            msgBalloon.click(function (e) {
                e.stopPropagation();
                msgBalloon.hide();
            });
            form.submit(function () {
                submitBtn.attr('disabled', 'disabled');
            });
            form.editableForm('view');
            return form;
        },
        clientDetailSection: function () {
            var section = $(this),
                form = $('#client-detail-form', section);
            form.clientDetailForm();

            $('#system-list', section).systemList();
            return section;
        },
        systemList: function () {
            var ul = $(this),
                addBtn = $('#new-system-btn'),
                tmpl = $('#system-list-item-tmpl').html();

            function reindex() {
                ul.find('li').each(function (i) {
                        var li = $(this);
                        li.find('input,select,textarea').each(function () {
                            var input = $(this),
                                name = input.attr('name');
                            input.attr({
                                name: name && name.replace(/\[.*\]/, "[" + i + "]")
                            });
                        });
                    }
                );
            }

            addBtn.click(function () {
                ul.append(tmpl);
                reindex();
            });

            reindex();
            return ul;
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
            var salesman_ids = data.salesman_ids && data.salesman_ids.split(',') || [];
            form.findByName('salesman_ids').each(function () {
                var checkbox = this,
                    $checkbox = $(checkbox);
                checkbox.checked = salesman_ids.contains($checkbox.val());
            });
            return form;
        }
    })
    ;

    $(function () {
        var body = $(document.body);
        $('#client-detail-section', body).clientDetailSection();


        $('#edit-btn').click(); //FIXME;


    });
})
    (jQuery);
