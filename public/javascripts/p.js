/**
 * public script for all pages
 *
 *  -- namespaces --
 *  $ : jQuery
 *  l : message resource
 *  Hbs : handlebars
 *1
 */
(function ($, l, Hbs) {
    Hbs.registerHelper('l', function (name, options) {
        return name && eval(["window", "l"].concat(name).join('.'));
    });
    Hbs.registerHelper('t', function () {
        return new Date().getTime();
    });
    Hbs.registerHelper('ctx', function () {
        var ctx = window['ctx'];
        return ctx ? '/' + ctx : '';
    });


    $.extend({
        parseJSONSafely: function (string) {
            if (!string) return string;
            try {
                return $.parseJSON(string);
            } catch (e) {
                console.warn('failed to parse string:', string);
                return null;
            }
        },
        confirmRemove: function (name, callback) {
            var tmpl = Hbs.templates['confirm-dialog'],
                html = tmpl({
                    name: name,
                    label: name
                }).replace(/\{\{name\}\}/g, name);
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
        },
        randomColor: function (saturation, value) {
            return $.color('#ff0000')
                .hue(Math.random(), true)
                .saturation(saturation, true)
                .value(value, true)
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
        },
        selectableText: function (selectList) {
            var input = $(this),
                selectListItem = selectList.find('li');

            input.filterSelect = function () {
                selectListItem.each(function () {
                    var li = $(this),
                        text = li.find('a').text();
                    var hit = text === input.val();
                    var match = !!text.match($.trim(input.val()));
                    if (!hit && match) {
                        li.show();
                    } else {
                        li.hide();
                    }
                });
            };
            input
                .focus(function () {
                    clearTimeout(input.hideTimer);
                    selectList.data('selectable-text-active', input);
                    input.after(selectList);
                    var o = input.position();
                    selectList.show()
                        .css({
                            left: o.left,
                            top: o.top + input.outerHeight(true),
                            width: input.outerWidth()
                        })
                        .find('li')
                        .show();
                    input.filterSelect();
                })
                .blur(function(){
                    input.hideTimer = setTimeout(function(){
                        selectList.hide();
                    },500);
                })
                .keydown(function (e) {
                    clearTimeout(input.hideTimer);
                    var KEY = $.ui.keyCode;
                    var selected = selectListItem.filter('.selected:visible');
                    switch (e.keyCode) {
                        case KEY.ENTER:
                            selected.find('a').click();
                            break;
                        case KEY.UP:
                            var prev = selected.prev(':visible');
                            if (prev.size()) {
                                selectListItem
                                    .not(prev).removeClass('selected');
                                prev.addClass('selected');
                            }
                            break;
                        case KEY.DOWN:
                            if (selected.size()) {
                                var next = selected.next(':visible');
                                if (next.size()) {
                                    selectListItem
                                        .not(next).removeClass('selected');
                                    next.addClass('selected');
                                }
                            } else {
                                selectList.show();
                                selectListItem.filter('selected').removeClass('selected');
                                selectListItem.filter(':visible').first().addClass('selected');
                            }
                            break;
                    }
                })
                .textchange(function () {
                    clearTimeout(input.hideTimer);
                    selectList.show();
                    input.filterSelect();
                });
            if (!selectList.data('selectable-text-select-list')) {
                selectList.data('selectable-text-select-list', true);
                selectList.find('a').click(function () {
                    clearTimeout(input.hideTimer);
                    var a = $(this),
                        text = a.text();
                    selectList.data('selectable-text-active')
                        .val(text);
                    selectList.hide();
                });
            }
            return input;
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

