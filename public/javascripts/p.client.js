/**
 * public script for client
 *
 *  -- namespaces --
 *  $ : jQuery
 *  l : message resource
 *  Hbs : handlebars
 *
 */
(function ($, l, Hbs, docment, window) {

    function doNothing() {
    }

    var tv = $.treeview;
    var tmpl = {
        liContent: Hbs.templates['client-list-item']
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
        clientDetailForm: function (mode) {
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
                var focus = $.fn.focus;
                $.fn.focus = doNothing;
                form.editableForm('edit');
                msgBalloon.hide();
                editBtn.hide();
                $.fn.focus = focus;
            });
            msgBalloon.click(function (e) {
                e.stopPropagation();
                msgBalloon.hide();
            });
            form
                .submit(function () {
                    submitBtn.attr('disabled', 'disabled');
                    $.confirmLeave(l.msg.leave_with_unsaved);
                });
            form.editableForm(mode || 'view');

            form
                .keydown(function (e) {
                    switch (e.which) {
                        case $.ui.keyCode.ENTER:
                            e.preventDefault();
                            break;
                    }
                })
                .change(function () {
                    $.confirmLeave(l.msg.leave_with_unsaved);
                });


            var hash = location.hash;
            if (hash) {
                $(hash).find(':text').first().focus();
            }

            return form;
        },
        clientDetailSection: function (mode) {
            var section = $(this),
                form = $('#client-detail-form', section);
            form.clientDetailForm(mode);

            $('#system-list', section).systemList(section.data());
            return section;
        },
        systemListItem: function (data) {
            var li = $(this).each(function () {
                var li = $(this),
                    removeBtn = li.findByRole('remove-btn');
                removeBtn
                    .hover(function () {
                        li.addClass('remove-target');
                        $('.remove-target').not(li).removeClass('remove-target');
                    }, function () {
                        li.removeClass('remove-target');
                    })
                    .click(function () {
                        var name = li.find('caption').find(':text').val();
                        li.animate({
                            width: 0,
                            paddingLeft: 0,
                            paddingRight: 0
                        }, 500, function () {
                            li.remove();
                        });
                    });
                li.find('.tk-editable-text').focus(function () {
                    var focused = li.hasClass('system-list-item-focused');
                    if (focused) return;
                    li.addClass('system-list-item-focused')
                        .siblings('.system-list-item-focused')
                        .removeClass('system-list-item-focused');
                });
            });
            li.find('.system-name-input').selectableText(data.system_names);
            li.find('.system-scale-input').selectableText(data.system_scales);
            li.find('.system-start_at-input').selectableText(data.system_start_ats);
            return li;
        },
        systemList: function (data) {
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
                var li = ul.append(tmpl)
                    .find('li')
                    .last();
                li.systemListItem(data);
                reindex();
                li.find('caption').find(':text').focus();
            });

            reindex();

            ul.find('li').systemListItem(data);
            return ul;
        },
        clientSearchForm: function (callback) {
            var form = $(this);
            form.searchForm(callback);
            return form;
        },
        clientListItem: function () {
            var li = $(this)
                .destroyableListItem()
                .editableListItem('__never_call__');

            function getForm(li) {
                return li.children('.tv-label').findByName('edit-form');
            }

            li.children('.tv-label').dblclick(function () {
                var link = $(this).findByRole('detail-link').attr('href');
                if (link) location.href = link;
            });

            getForm(li)
                .on('edit-done', function (e) {
                    var form = $(this);
                    form.find(':text').each(function () {
                        var text = $(this),
                            val = text.val();
                        text.attr({
                            value: val
                        });
                    });
                })
                .submit(function (e) {
                    e.stopPropagation();
                })
                .findByRole('editable-text')
                .keydown(function (e) {
                    var text = $(this);
                    switch (e.keyCode) {
                        case $.ui.keyCode.ENTER:
                            text.change();
                            break;
                    }
                });
            li
                .on('tv-drop', function (e) {
                    e.stopPropagation();

                    var li = $(this),
                        parent = li.parent('.tv-children').parent('li'),
                        parentForm = getForm(parent),
                        parentId = parentForm.findByName('_id').val(),
                        children_ids = [];

                    li.siblings('li').add(li).each(function () {
                        var child = $(this),
                            childForm = getForm(child),
                            childId = childForm.findByName('_id').val();
                        children_ids.push(childId);
                    });
                    var form = getForm(li);
                    form.findByName('parent_id').val(parentId);
                    form.submit();
                    setTimeout(function () {
                        parentForm.findByName('children_ids').val(JSON.stringify(children_ids));
                        parentForm.submit();
                    }, 100);
                });
            li.find(':text').keydown(function (e) {
                e.stopPropagation();
            });
            return  li;
        },
        clientList: function (data) {
            var ul = $(this);
            var items = data.map(function createItem(data) {
                var children_ids = $.parseJSONSafely(data.children_ids);
                data.group = !!children_ids;
                var html = tmpl.liContent(data);
                var item = new tv.Item(html);
                item.data = {
                    children_ids: children_ids,
                    _id: data._id
                };
                return  item;
            });

            items = (function makeHierarchy(array) {
                var hash = {};
                array.forEach(function (item) {
                    var data = item.data;
                    hash[data._id] = item;
                    return item;
                });
                array.forEach(function (item) {
                    var data = item.data,
                        _id = data._id,
                        children_ids = data.children_ids;
                    if (children_ids) {
                        var children = children_ids
                            .map(function (child_id) {
                                var child = hash[child_id];
                                if (!child) return null;
                                child.data.parent_id = _id;
                                return  child;
                            })
                            .filter(function (child) {
                                return !!child;
                            });
                        item.children(children);
                    }
                });
                return array.filter(function (item) {
                    return !item.data.parent_id;
                });
            })(items);

            ul.treeview(items, {
                action: function (selected) {
                    var link = selected.findByRole('detail-link').attr('href');
                    if (link) location.href = link;
                }
            });
            ul
                .find('li')
                .clientListItem();
            return ul;
        },
        clientListSection: function () {
            var section = $(this),
                addBtn = section.findByRole('add-btn'),
                ul = section.find('#client_list'),
                searchForm = section.findByRole('search-form');
            addBtn.click(function () {
                var group = $(this).data('group'),
                    html = tmpl.liContent({
                        group: group,
                        children_ids: group ? '[]' : undefined,
                        last_update_by: addBtn.data('login_username')
                    }),
                    item = new tv.Item(html)
                        .children(group ? [] : null);
                ul.append(item.toHTML());
                ul.treeview('reload');
                ul
                    .find('.tk-editable-text').removeClass('tk-editable-text')
                    .end();
                ul
                    .find('.tk-editable-label').remove()
                    .end();
                ul
                    .find('li').clientListItem()
                    .find(':text:visible')
                    .select();
            });
            searchForm.clientSearchForm(function (data) {
                ul.clientList(data);
                var selectedClient = $('#client-select').val();

                var li = $('#client-li-content-' + selectedClient).parent('label').parent('li');
                li
                    .addClass('tv-selected')
                    .addClass('current-client');
            }).submit();

            var editBtn = $('#client-list-edit-btn'),
                editDoneBtn = $('#client-list-edit-done-btn').hide();
            editBtn.click(function () {
                $('.detail-link', section).hide();
                $('.block-list-item-control', section).show();
                $('#client-search-input', section).hide();
                editDoneBtn.show();
                editBtn.hide();
            });
            editDoneBtn.click(function () {
                $('.detail-link', section).show();
                $('.block-list-item-control', section).hide();
                $('#client-search-input', section).show();
                editBtn.show();
                editDoneBtn.hide();
            });
            ul.on('edit-done', function () {
                editDoneBtn.click();
            });
            return section;
        },
        clientNameSpy: function (input) {
            var spy = $(this);
            spy.find('a').text(input.val());
            return spy.spyFor(input.parent());
        }
    })
    ;

    $(function () {
        var head = $(document.head),
            body = $(document.body),
            aside = $('aside', body),
            q = $.getQuery();

        $('#client-detail-section', body).clientDetailSection(q && q.mode);

        $('#client-list-section', aside).clientListSection();


        var clientNameInput = $('#client-name-input', body);
        var clientName = clientNameInput.val() || '',
            title = $('title', head);
        title.text([clientName, (title.text() || '') ].join(' - '));


        $('#client-name-spy', body).clientNameSpy(clientNameInput);
    });
})(jQuery, window['l'], Handlebars, document, window);