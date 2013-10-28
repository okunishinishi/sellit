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


        $('#large-logo').largeLogo();

    });
})(jQuery, window['l'], Handlebars);
