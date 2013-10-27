/**
 * public script for index
 *
 *  -- namespaces --
 *  $ : jQuery
 *  l : message resource
 *  Hbs : handlebars
 *
 */
(function ($, l, Hbs) {
    var tv = $.treeview;
    var tmpl = {
        liContent: Hbs.templates['client-list-item']
    };
    $.extend({
        safeParse: function (string) {
            if (!string) return string;
            try {
                return JSON.parse(string);
            } catch (e) {
                console.warn('failed to parse string:', string);
                return null;
            }
        }
    });
    $.fn.extend({
        clientSearchForm: function (callback) {
            var form = $(this);
            form.searchForm(callback);
            return form;
        },
        clientListItem: function () {
            var li = $(this)
                .destroyableListItem()
                .editableListItem('dblclick');
            li.findByRole('editable-text')
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

                    function getForm(li) {
                        return li.children('.tv-label').findByName('edit-form');
                    }

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
            return  li;
        },
        clientList: function (data) {
            var ul = $(this);
            var items = data.map(function createItem(data) {
                var children_ids = $.safeParse(data.children_ids);
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
                        children_ids: group ? '[]' : undefined
                    }),
                    item = new tv.Item(html)
                        .children(group ? [] : null);
                ul.append(item.toHTML())
                    .find('li')
                    .last()
                    .clientListItem();
                ul.treeview('reload')
                    .find('li')
                    .find('.tk-editable-text').removeClass('tk-editable-text')
                    .end()
                    .each(function () {
                        $(this).clientListItem();
                    });
            });
            searchForm.clientSearchForm(function (data) {
                ul.clientList(data);
            }).submit();
            return section;
        },
        largeLogo: function () {
            if (!Array.prototype.map) return logo;
            var logo = $(this),
                text = logo.text() || '';
            logo.click(function () {
                location.reload && location.reload();
            });
            var html = text.split('').map(function (t) {
                return "<span class='hop'>" + t + "</span>";
            }).join('');
            logo.html(html);
            return logo;
        }
    });

    $(function () {
        var body = $(document.body);

        $('#client-list-section', body).clientListSection();

        $('#large-logo').largeLogo();
    });
})(jQuery, window['l'], Handlebars);
