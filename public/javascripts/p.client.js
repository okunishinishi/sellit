(function ($) {
    var tmpl = {
        li: Handlebars.templates['client-list-item']
    };
    $.fn.extend({

        clientDetailSection: function () {
            var section = $(this),
                postForm = $('#client-detail-form', section);

            return section;
        }
    });

    $(function () {
        var body = $(document.body);

        $('#client-detail-section', body).clientDetailSection();

    });
})(jQuery);
