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

    };
    $.fn.extend({
        loginForm: function () {
            var form = $(this);
            var usernameSelectList = $('#username-select-list');
            form.data('disabled', false);
            form.findByName('username')
                .selectableText(usernameSelectList);
            $('#login-btn').click(function () {
                form.submit();
            });
            return form;
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

        $('#login-form', body).loginForm();
        $('#large-logo', body).largeLogo();

    });
})(jQuery, window['l'], Handlebars);
