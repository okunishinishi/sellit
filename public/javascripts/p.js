/**
 * User: okunishitaka
 * Date: 9/21/13
 * Time: 4:08 PM
 */


(function ($, l, Handlebars) {
    $.extend({
        confirmRemove: function (name, callback) {
            var tmpl = Handlebars.templates['confirm-dialog'],
                html = tmpl({
                    name: name,
                    label: name
                }).replace('{{it}}', name);
            var dialog = $(html).appendTo(document.body),
                inner = $('.confirm-dialog-inner', dialog),
                form = dialog.find('form'),
                cancelBtn = form.findByRole('cancel-btn'),
                submit = form.find(':submit');

            cancelBtn.click(function () {
                dialog.fadeOut(100, function () {
                    dialog.remove();
                });
            });
            dialog.click(function () {
                cancelBtn.click();
            });
            inner.click(function (e) {
                e.stopPropagation();
            });
            var check = $('#confirm-dialog-check', form).change(function () {
                if (check[0].checked) {
                    submit.removeAttr('disabled').removeClass('disabled');
                } else {
                    submit.attr('disabled', 'disabled').addClass('disabled');
                }
            });
            form.submit(function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (submit.attr('disabled')) return;
                dialog.remove();
                callback && callback();
            });

        }
    });
    $.fn.extend({
        /**
         * list with appendable items
         * @param tmpl
         * @param addBtn
         * @param callback
         * @returns {*|HTMLElement}
         */
        appendableList: function (tmpl, addBtn, callback) {
            var ul = $(this);
            addBtn.click(function () {
                var li = ul.appendHandlebars(tmpl, {})
                    .find('li')
                    .last();
                callback && callback(li);
            });
            return ul;
        },
        /**
         * list item which is editable
         * @returns {*}
         */
        editableListItem: function (trigger) {
            return this.each(function () {
                var li = $(this);
                var editableTxt = li.findByRole('editable-text')
                    .editableText(trigger)
                    .change(function () {
                        $(this).submit();
                    })
                    .first()
                    .focus();
                li.findByName('edit-form')
                    .ajaxForm(function (data) {
                        var form = $(this);
                        if (data.valid) {
                            form.setFormValue(data.model);
                            form.trigger('edit-done');
                        }
                    });
                li.findByRole('edit-btn').click(function () {
                    var onEdit = editableTxt.filter(':visible');
                    if (onEdit.length) {
                        editableTxt.trigger('tk-editable-text-edit');
                    } else {
                        editableTxt.trigger('tk-editable-text-edit');
                    }

                });
            });
        },
        destroyableListItem: function (showDialog) {
            return this.each(function () {
                var li = $(this);
                li.findByName('destroy-form')
                    .ajaxForm(function () {
                        li.closeDown();
                    })
                    .findByRole('submit-btn')
                    .click(function () {
                        var btn = $(this);
                        if (showDialog) {
                            var name = li.findByName('name').val();
                            $.confirmRemove(name, function () {
                                btn.submit();
                            });
                        } else {
                            var sure = confirm(l.alt.sure);
                            if (sure) btn.submit();
                        }
                    });
            });
        },
        /**
         * form for searching
         * @param callback
         * @returns {*|HTMLElement}
         */
        searchForm: function (callback) {
            var form = $(this);
            form.ajaxForm(function (data) {
                callback && callback(data);
            });
            form.find('input[type="search"]').textchange(function (e) {
                form.submit();
            });
            $(':submit', form).hide();
            return form;
        }
    });
    $(function () {

        var body = $(document.body);

        body.ajaxError(function (e, req, setting, err) {
            if (req.status) {
                var statusCode = req.statusCode();
//                alert(statusCode + 'something is wrong!');
                console.error('[ajax err]', statusCode, err);
            }
        });

        $('#client-select', body).change(function () {
            var select = $(this);
            location.href = ['/client', select.val()].join('/');
        });
    });
})(jQuery, window['l'], Handlebars);

