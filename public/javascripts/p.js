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

    $.scrollToTop = function (duration) {
        $('html,body').animate({
            scrollTop: 0
        }, duration || 300);
    };

    var supported = (function (detected) {
        if (!detected) return true;
        switch (detected.browser) {
            case 'IE':
                return 9.0 <= detected.version;
        }
        return true;
    })(tek.detectBrowser(window));

    if (!supported) {
        $(function () {
            $.sorryNoSupport();
        });
    }

    $.extend({
        rainbowColor: function (base, count) {
            var result = [];
            if (!base) base = '#FF0000';
            if (!count) count = 7;
            var color = $.color(base);
            for (var i = 0; i < count; i++) {
                var hue = i / count;
                result.push(color.hue(hue, true).hex());
            }
            return result;
        },
        backColor: function (base) {
            var color = $.color(base);
            var v = color.value();
            v += .5;
            return color.value(v % 1).hex();
        },
        darkenColor: function (base) {
            var color = $.color(base);
            var l = color.lightness();
            return color.lightness(l * .9).hex();
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
        toPageTopBtn: function (winHeight) {
            var btn = $(this).show();
            var needed = winHeight < btn.offset().top;
            if (!needed) btn.hide();
            return btn;
        },
        downloadSelectList: function () {
            var ul = $(this);
            if (ul.is(':empty')) {
                var ref = ul.data('ref'),
                    tmpl = hbs.templates['download-select-list'];
                $.getJSON(ref, function (data) {
                    ul.htmlHandlebars(tmpl, data);
                });
            }
            if (ul.is(':visible')) {
                ul.hide();
            } else {
                ul.show();
            }
        }
    });
    $(function () {

        var body = $(document.body),
            win = $(window);

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

        var toPageTopBtn = $('#to-page-top-btn', body).toPageTopBtn(win.height());
        toPageTopBtn.click(function (e) {
            $.scrollToTop();
            e.preventDefault();
        });
        win.resize(function () {
            toPageTopBtn.toPageTopBtn(win.height());
        });


        var downloadSelectList = $('#download-select-list', body);
        $('#download-btn', body).click(function () {
            downloadSelectList.downloadSelectList();
        });

    });
})(jQuery, window['l'], Handlebars);

