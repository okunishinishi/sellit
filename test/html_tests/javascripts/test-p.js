/**
 *  qunit test for p.js
 */

var $ = jQuery;
$(function () {
    QUnit.config.reorder = false;

    var doc = $(document),
        body = $(document.body),
        eq = equal;

    test('$.rainbowColor', function () {
        var ul = $('#color-list');
        var html = '';
        $.rainbowColor('#E33', 20).forEach(function (color) {
            html += '<li style="color:' + color + '">' + color + '</li>';
        });
        ul.append(html);
        strictEqual(ul.find('li').size(), 20);

        ul.find('li').each(function () {
            var li = $(this),
                color = li.text();
            var back = $.backColor(color);
            li.css({
                backgroundColor: back,
                borderColor: $.darkenColor(back)
            });
        });
        strictEqual(ul.find('li').size(), 20);
    });
});