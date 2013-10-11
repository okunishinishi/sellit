(function ($) {
    var tmpl = {
    };
    $.fn.extend({
    });

    $(function () {
        var body = $(document.body);
        setTimeout(function () {
            $('ul', body).sortableList(function () {
                var ul = $(this),
                    model = ul.data('model');
                console.log('model', model);
                if (!model) console.error('model not defined for ul:', ul.attr('id'));
                var data = [];
                ul.find('li').each(function () {
                    var li = $(this),
                        form = li.findByName('edit-form');
                    data.push({
                        _id: form.findByName('_id').val(),
                        sort_num: form.findByName('sort_num').val() || 0
                    });
                });
                $.post('/master/sort', {
                    model: model,
                    data: data
                }, function () {
                });

            });
        }, 300);
    });
})(jQuery);
