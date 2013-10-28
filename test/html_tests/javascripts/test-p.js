/**
 *  qunit test for p.js
 */

var $ = jQuery;
$(function () {
    var doc = $(document),
        body = $(document.body),
        eq = equal;

    test('$.parseJSONSafely', function () {
        strictEqual($.parseJSONSafely('1'), 1);
        strictEqual($.parseJSONSafely(''), '');
        strictEqual($.parseJSONSafely('null'), null);
        strictEqual($.parseJSONSafely('['), null);
        strictEqual($.parseJSONSafely('["a"]').length, 1);
    });

    test('$.randomColor', function () {
        var ul = $('#color-list');
        for (var i = 0; i < 20; i++) {
            var color = $.randomColor(.3, .4);
            var html = '<li style="color:' + color + '">' + color + '</li>';
            ul.append(html);
        }
        ok(true);
    });
});