/**
 * public script for all pages
 *
 *  -- namespaces --
 *  $ : jQuery
 *  l : message resource
 *  Hbs : handlebars
 *1
 */
(function ($, l, hbs) {
    hbs.registerHelper('l', function (name, options) {
        return name && eval(["window", "l"].concat(name).join('.'));
    });
    hbs.registerHelper('t', function () {
        return new Date().getTime();
    });
    hbs.registerHelper('ctx', function () {
        var ctx = window['ctx'];
        return ctx ? '/' + ctx : '';
    });

    $.confirmRemove = (function (confirmRemove) {
        return function () {
            return confirmRemove.apply(this, arguments);
        };
    })($.confirmRemove);


    $.extend({
        randomColor: function (saturation, value) {
            return $.color('#ff0000')
                .hue(Math.random(), true)
                .saturation(saturation || .5, true)
                .value(value || .8, true)
                .hex();
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
                        } else {
                            var errors = data['errors'];
                            if (errors && errors.length) {
                                alert(errors[0]); //TODO
                            }
                        }
                    });
                li.findByRole('edit-btn').off('click').click(function (e) {
                    var onEdit = editableTxt.filter(':visible');
                    if (onEdit.length) {
                        editableTxt.trigger('tk-editable-text-fix');
                    } else {
                        editableTxt.trigger('tk-editable-text-edit');
                    }
                    e.stopPropagation();
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
                        if (btn.data('destroy-form-submit-btn')) return;
                        btn.data('destroy-form-submit-btn', true);
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
        },
        nav: function (key) {
            var nav = $(this);
            nav.findByAttr('key', key)
                .addClass('active')
                .siblings('active').removeClass('active');
            return nav;
        },
        sortableList: function (callback) {
            var ul = $(this).addClass('sortable-list');
            ul.sortable({
                axis: 'y',
                containment: "parent",
                stop: function (e, ui) {
                    var sorted = $(this);
                    sorted.find('li').each(function (index) {
                        var li = $(this),
                            form = li.findByName('edit-form');
                        var input = form.findByName('sort_num');
                        if (!input.size()) {
                            input = $('<input/>').attr({
                                name: 'sort_num',
                                type: 'hidden'
                            }).appendTo(form);
                        }
                        input.val(index);
                    });
                    callback.call(sorted);
                }
            });
            return ul;
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

