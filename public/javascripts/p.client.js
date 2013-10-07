(function ($) {
    Array.prototype.contains = function (val) {
        var s = this, hit = false;
        for (var i = 0; i < s.length; i++) {
            hit = s[i] === val;
            if (hit) return true;
        }
        return false;
    };
    var tmpl = {
        clientLi: Handlebars.templates['client-list-item'],
        departmentLi: Handlebars.templates['department-list-item']
    };
    $.fn.extend({
        clientDetailForm: function () {
            var form = $(this);
            form.ajaxForm(function () {

            });
            form.findByRole('editable-text').editableText();
            return form;
        },
        clientDetailSection: function () {
            var section = $(this),
                form = $('#client-detail-form', section);

            form.clientDetailForm();

            return section;
        },
        clientProductForm: function (data, callback) {
            var form = $(this);
            if (!form.hasClass('ajax-form')) {
                form
                    .addClass('ajax-form')
                    .ajaxForm(function (data) {
                        callback(data.model);
                    })
                    .find(':checkbox').change(function () {
                        form.submit();
                    });
            }
            form.findByName('_id').val(data._id);
            var product_ids = data.product_ids && data.product_ids.split(',') || [];
            form.findByName('product_ids').each(function () {
                var checkbox = this,
                    $checkbox = $(checkbox);
                checkbox.checked = product_ids.contains($checkbox.val());
            });
            return form;
        }
    });

    $(function () {
        var body = $(document.body);
        $('#client-detail-section', body).clientDetailSection();
    });
})(jQuery);
