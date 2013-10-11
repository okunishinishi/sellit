(function ($) {
    var tmpl = {
        li: Handlebars.templates['client-list-item']
    };
    $.fn.extend({
        clientSearchForm: function (callback) {
            var form = $(this);
            form.searchForm(callback);
            return form;
        },
        clientListItem: function () {
            return $(this).each(function () {
                var li = $(this);
                li
                    .on('edit-done', function () {
                        var li = $(this),
                            editForm = li.findByName('edit-form'),
                            detailLink = li.findByRole('detail-link');
                        detailLink.attr({
                            href: '/client/' + editForm.findByName('_id').val()
                        });
                    })
                    .destroyableListItem(true)
                    .editableListItem('dblclick');

                $('.rank-label-container,.label', li).click(function () {
                    location.href = li.findByRole('detail-link').attr('href');
                });
            });
        },
        clientList: function (data) {
            var t = new Date().getTime();
            var ul = $(this);
            data && data.forEach(function (date) {
                date.t = t;
            });
            ul.htmlHandlebars(tmpl.li, data)
                .find('li')
                .clientListItem();
            return ul;
        },
        clientListSection: function () {
            var section = $(this),
                addBtn = section.findByRole('add-btn'),
                ul = section.find('ul'),
                searchForm = section.findByRole('search-form');
            ul.appendableList(tmpl.li, addBtn, function (li) {
                li.clientListItem();
            });
            searchForm.clientSearchForm(function (data) {
                ul.clientList(data);
            }).submit();
            return section;
        },
        largeLogo: function () {
            if (!Array.prototype.map) return;
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
})(jQuery);
