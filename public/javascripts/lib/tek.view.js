/**
 * tek.view.js
 * - javascript library for tek -
 * @version v0.2.32
 * @author Taka Okunishi
 * @date 2013-11-16
 *
 */
(function (dependencies, window, undefined) {

    var valid = true;
    for(var name in dependencies){
        if (!dependencies.hasOwnProperty(name)) continue;
        if (!dependencies[name]) {
            console.error('[tek.view.js] dependency missing: ', name + 'not found.');
            valid = false;
        }
    }
    if (!valid) return;

    tek.crossBrowser(window);

	/** tek.view for hbs.templates **/
	(function (global, undefined) {
	
		var Handlebars = global['hbs'];
		(function() {
		  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
		templates['tk-confirm-dialog'] = template(function (Handlebars,depth0,helpers,partials,data) {
		  this.compilerInfo = [4,'>= 1.0.0'];
		helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
		  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;
		
		
		  buffer += "<div class=\"tk-confirm-dialog\" id=\"tk-confirm-dialog\">\n    <div class=\"tk-confirm-dialog-inner\">\n        <h2 class=\"tk-confirm-dialog-title\">";
		  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		  buffer += escapeExpression(stack1)
		    + "</h2>\n        ";
		  if (stack1 = helpers.sub_title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		  else { stack1 = depth0.sub_title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		  buffer += escapeExpression(stack1)
		    + "\n        <form>\n            <a href=\"javascript:void(0)\" class=\"tk-confirm-dialog-close-btn\"\n                    >&times;</a>\n\n            <p>\n\n                <input type=\"checkbox\" id=\"tk-confirm-dialog-check\"/>\n                <label for=\"tk-confirm-dialog-check\"><b>";
		  if (stack1 = helpers.check_label) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		  else { stack1 = depth0.check_label; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		  buffer += escapeExpression(stack1)
		    + "</b></label>\n            </p>\n            <input type=\"submit\" class=\"tk-danger-btn tk-wide-btn\"\n                   disabled=\"disabled\" value=\"";
		  if (stack1 = helpers.btn_label) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		  else { stack1 = depth0.btn_label; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		  buffer += escapeExpression(stack1)
		    + "\"/>\n        </form>\n    </div>\n</div>\n";
		  return buffer;
		  });
		templates['tk-editable-label'] = template(function (Handlebars,depth0,helpers,partials,data) {
		  this.compilerInfo = [4,'>= 1.0.0'];
		helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
		  
		
		
		  return "<label class=\"tk-editable-label\">\n\n</label>";
		  });
		templates['tk-err-balloon'] = template(function (Handlebars,depth0,helpers,partials,data) {
		  this.compilerInfo = [4,'>= 1.0.0'];
		helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
		  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;
		
		function program1(depth0,data) {
		  
		  var buffer = "";
		  buffer += "\n            <li>"
		    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
		    + "</li>\n        ";
		  return buffer;
		  }
		
		  buffer += "<div class=\"tk-err-balloon\">\n    <ul>\n        ";
		  stack1 = helpers.each.call(depth0, depth0.msg, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
		  if(stack1 || stack1 === 0) { buffer += stack1; }
		  buffer += "\n    </ul>\n    <div class=\"tek-text-center\">\n        <a href=\"javascript:void(0)\" class=\"tk-close-btn\">";
		  if (stack1 = helpers.close_label) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		  else { stack1 = depth0.close_label; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		  buffer += escapeExpression(stack1)
		    + "</a>\n    </div>\n</div>";
		  return buffer;
		  });
		templates['tk-hit-word'] = template(function (Handlebars,depth0,helpers,partials,data) {
		  this.compilerInfo = [4,'>= 1.0.0'];
		helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
		  var buffer = "", functionType="function", escapeExpression=this.escapeExpression;
		
		
		  buffer += "<span class=\"tk-hit-word\">"
		    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
		    + "</span>";
		  return buffer;
		  });
		templates['tk-no-support-dialog'] = template(function (Handlebars,depth0,helpers,partials,data) {
		  this.compilerInfo = [4,'>= 1.0.0'];
		helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
		  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;
		
		
		  buffer += "<div class=\"tk-no-support-dialog\" id=\"tk-no-support-dialog\">\n    <div class=\"tk-no-support-dialog-inner\">\n        <h1 class=\"tk-no-support-dialog-title\">";
		  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		  buffer += escapeExpression(stack1)
		    + "</h1>\n        <span>";
		  if (stack1 = helpers.sub_title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		  else { stack1 = depth0.sub_title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		  buffer += escapeExpression(stack1)
		    + "</span>\n\n        <p>\n            ";
		  if (stack1 = helpers.msg) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		  else { stack1 = depth0.msg; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		  buffer += escapeExpression(stack1)
		    + "\n        <ul>\n            <li><a href=\"https://www.google.com/intl/en/chrome/browser/\" target=\"_blank\">\n                <img class=\"tk-icon\" src=\"https://www.google.com/images/icons/product/chrome-32.png\" alt=\"\"/>\n                Chrome\n            </a>\n            </li>\n            <li><a href=\"http://www.mozilla.org/en-US/firefox/new/\" target=\"_blank\">\n                <img class=\"tk-icon\" src=\"http://mozorg.cdn.mozilla.net/media/img/firefox/favicon.ico?2013-08\" alt=\"\"/>\n                Firefox\n            </a></li>\n            <li><a href=\"http://support.apple.com/downloads/#safari\" target=\"_blank\">\n                <img class=\"tk-icon\"\n                     src=\"http://km.support.apple.com/resources/sites/APPLE/content/live/IMAGES/0/IM26/en_US/safari-72.png\"\n                     alt=\"\"/>\n                Safari</a></li>\n            <li><a href=\"http://www.opera.com/\">\n                <img class=\"tk-icon\" src=\"http://d2jc9zwbrclgz3.cloudfront.net/static-heap/da/dafd15591b35d4f81ca96cf7de6582d705850ff0/apple-touch-icon-57x57.png\" alt=\"\"/>\n                Opera</a></li>\n        </ul>\n        </p>\n\n    </div>\n</div>";
		  return buffer;
		  });
		templates['tk-selectable-label'] = template(function (Handlebars,depth0,helpers,partials,data) {
		  this.compilerInfo = [4,'>= 1.0.0'];
		helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
		  
		
		
		  return "<label class=\"tk-selectable-label\">\n</label>";
		  });
		templates['tk-selectable-text-list'] = template(function (Handlebars,depth0,helpers,partials,data) {
		  this.compilerInfo = [4,'>= 1.0.0'];
		helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
		  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;
		
		function program1(depth0,data) {
		  
		  var buffer = "";
		  buffer += "\n        <li class=\"tk-selectable-list-item\">\n            <a href=\"javascript:void(0)\">"
		    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
		    + "</a>\n        </li>\n    ";
		  return buffer;
		  }
		
		  buffer += "<ul class=\"tk-selectable-text-list\">\n    ";
		  stack1 = helpers.each.call(depth0, depth0.candidates, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
		  if(stack1 || stack1 === 0) { buffer += stack1; }
		  buffer += "\n</ul>\n";
		  return buffer;
		  });
		templates['tk-spin'] = template(function (Handlebars,depth0,helpers,partials,data) {
		  this.compilerInfo = [4,'>= 1.0.0'];
		helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
		  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;
		
		
		  buffer += "<div style=\"width:";
		  if (stack1 = helpers.width) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		  else { stack1 = depth0.width; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		  buffer += escapeExpression(stack1)
		    + "px;height:";
		  if (stack1 = helpers.height) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		  else { stack1 = depth0.height; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		  buffer += escapeExpression(stack1)
		    + "px;\n        position: absolute;left:";
		  if (stack1 = helpers.left) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		  else { stack1 = depth0.left; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		  buffer += escapeExpression(stack1)
		    + "px;top:";
		  if (stack1 = helpers.top) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		  else { stack1 = depth0.top; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		  buffer += escapeExpression(stack1)
		    + "px\"></div>";
		  return buffer;
		  });
		})();
	})(dependencies, undefined);
	/** tek.view for $ **/
	(function (global, undefined) {
	
		var tek = global['tek'],
		    hbs = global['hbs'],
		    $ = global['$'];
		
		/**
		 * form value object
		 * @type {tek.define|*}
		 */
		$.FormValue = tek.define({
		    init: function (values) {
		        var s = this;
		        for (var name in values) {
		            if (!values.hasOwnProperty(name)) continue;
		            s[name] = values[name];
		        }
		    },
		    properties: {
		        addValue: function (name, val) {
		            var s = this;
		            if (s.hasOwnProperty(name)) {
		                var isArray = s[name] instanceof Array;
		                if (!isArray) {
		                    s[name] = [s[name]];
		                }
		                s[name].push(val);
		            } else {
		                s[name] = val;
		            }
		        },
		        toObj: function () {
		            var s = this,
		                result = {};
		
		            function findInjectable(dst, key) {
		                while (key.match(/\./)) {
		                    var prop = key.match(/([^\.]*)\./)[1];
		                    if (!dst[prop]) dst[prop] = {};
		                    dst = dst[prop];
		                    key = key.replace(/[^\.]*\./, '');
		                }
		                return dst;
		            }
		
		            for (var key in s) {
		                if (!s.hasOwnProperty(key)) continue;
		                var value = s[key];
		                var dst = findInjectable(result, key);
		                key = key.split('.').pop();
		                if (dst[key]) {
		                    var isArray = dst[key] instanceof Array;
		                    if (!isArray) {
		                        dst[key] = [dst[key]];
		                    }
		                    dst[key].push(value);
		                } else {
		                    dst[key] = value;
		                }
		            }
		            return result;
		        }
		    }
		});
		
		/**
		 * render Handlebars template
		 * @param tmpl
		 * @param data
		 * @returns {string}
		 */
		$.renderHandlebars = function (tmpl, data) {
		    if (typeof(tmpl) === 'string') {
		        tmpl = hbs['templates'][tmpl];
		    }
		    if (!$.isArray(data)) {
		        data = [data];
		    }
		    var html = '';
		    data && data.forEach(function (data) {
		        html += tmpl(data);
		    });
		    return html;
		};
		
		/**
		 * parse JSON safely.
		 * when failed to parse, put warning and close quietly.
		 */
		$.parseJSONSafely = function (string) {
		    if (!string) return string;
		    try {
		        return JSON.parse(string);
		    } catch (e) {
		        console.warn && console.warn('[tek.view.js] failed to parse string: "' + string + '"');
		        return null;
		    }
		};
		
		/**
		 * show confirm dialog to remove something
		 * @param data
		 * @param callback
		 */
		$.confirmRemove = function (data, callback) {
		    var body = document.body;
		    $('#tk-confirm-dialog', body).remove();
		
		    var tmpl = hbs.templates['tk-confirm-dialog'];
		    data = $.extend({
		        title: 'Are you ABSOLUTELY sure?',
		        sub_title: 'One this done, there will be no way to go back.',
		        check_label: 'I understand consequences.',
		        btn_label: 'do it!'
		    }, data);
		    var html = tmpl(data);
		
		    var dialog = $(html).appendTo(body),
		        inner = $('.tk-confirm-dialog-inner', dialog),
		        form = dialog.find('form'),
		        cancelBtn = form.find('.tk-confirm-dialog-close-btn'),
		        submit = form.find(':submit');
		
		    cancelBtn.click(function () {
		        dialog.fadeOut(100, function () {
		            dialog.remove();
		        });
		    });
		    dialog.click(function () {
		        cancelBtn.click();
		    });
		    inner.click(function (e) {
		        e.stopPropagation();
		    });
		    var check = $('#tk-confirm-dialog-check', form).change(function () {
		        if (check[0].checked) {
		            submit.removeAttr('disabled');
		        } else {
		            submit.attr('disabled', 'disabled');
		        }
		    });
		    form.submit(function (e) {
		        e.preventDefault();
		        e.stopPropagation();
		        if (submit.attr('disabled')) return;
		        dialog.remove();
		        callback && callback();
		    });
		};
		
		/**
		 * get query for current page
		 * @returns {tek.Query}
		 */
		$.getQuery = function () {
		    return tek.Query.fromLocation(location) || {};
		};
		
		$.pushQueryToState = function (values) {
		    var hst = history,
		        loc = location;
		    if (!hst.pushState) return;
		    if (!values) return;
		    if (!$.param) return;
		    var query = new tek.Query(loc.search.replace('?', ''));
		    for (var key in values) {
		        if (!values.hasOwnProperty(key)) continue;
		        query[key] = values[key];
		    }
		    var new_url = [loc.path, $.param(query)].join('?');
		    hst.pushState(null, null, new_url);
		};
		
		/**
		 * show sorry page for not supported
		 * @param data
		 */
		$.sorryNoSupport = function (data) {
		    var body = document.body;
		    $('#tk-no-support-dialog', body).remove();
		
		    var tmpl = hbs.templates['tk-no-support-dialog'];
		    data = $.extend({
		        title: 'Sorry!Your browser is not supported.',
		        msg: "Why don't you try one of these?"
		    }, data || {});
		
		    var html = tmpl(data);
		
		    $(html).appendTo(body);
		};
		
		/**
		 * confirm before page unload
		 * @param msg
		 */
		$.confirmLeave = function (msg) {
		    if (!$.confirmLeave.initialized) {
		        $.confirmLeave.initialized = true;
		        $(window).on('beforeunload', function () {
		            return $.confirmLeave.msg || undefined;
		        });
		    }
		    $.confirmLeave.msg = msg;
		};
		
		
		/**
		 * scroll page to top
		 * @param duration
		 */
		$.scrollToTop = function (duration) {
		    $('html,body').animate({
		        scrollTop: 0
		    }, duration || 300);
		};
		
		$.wordSearch={};
		$.wordSearch.restore = function (word) {
		    if (!word) return;
		    for (var i = 0, len = word.length; i < len; i++) {
		        var parent = word[i].parentNode;
		        var text = document.createTextNode();
		        text.nodeValue = parent.dataset.origin;
		        parent.parentNode.replaceChild(text, parent);
		    }
		};
		$.wordSearch.hitElement = function(match){
		    var tmpl = hbs.templates['tk-hit-word'];
		    var origin = match.input,
		        span = document.createElement('span'),
		        hit = match[0];
		    span.innerHTML = origin.replace(hit, tmpl(hit));
		    span.dataset.origin = origin;
		    return span;
		};
	})(dependencies, undefined);
	/** tek.view for $.fn **/
	(function (global, undefined) {
	
		var tek = global['tek'],
		    $ = global['$'],
		    hbs = global['hbs'];
		
		/**
		 * find element by attribute
		 * @param key
		 * @param val
		 * @returns {*}
		 */
		$.fn.findByAttr = function (key, val) {
		    var condition = {};
		    if (arguments.length === 1) {
		        condition = arguments[0]
		    } else {
		        condition[key] = val;
		    }
		    var selector = '';
		    Object.keys(condition).forEach(function (key) {
		        selector += ['[', key, '="', condition[key], '"]'].join('')
		    });
		    return $(this).find(selector);
		};
		
		
		/**
		 * find element by name attribute
		 * @param name
		 * @returns {*}
		 */
		$.fn.findByName = function (name) {
		    return $(this).findByAttr('name', name);
		};
		
		/**
		 * find element by name data-role
		 * @param role
		 * @returns {*}
		 */
		$.fn.findByRole = function (role) {
		    return $(this).findByAttr('data-role', role);
		};
		
		
		/**
		 * get form value
		 * @returns {$.FormValue}
		 */
		$.fn.getFormValue = function () {
		    var form = $(this),
		        result = new $.FormValue;
		    form.find('input,select,textarea').each(function () {
		        var s = this,
		            input = $(this),
		            type = input.attr('type');
		        switch (type) {
		            case 'radio':
		            case 'checkbox':
		                if (!s.checked) return;
		                break;
		        }
		        var name = input.attr('name'),
		            val = input.val();
		        if (!name) return;
		        if (val === '') return;
		        result.addValue(name, val);
		    });
		    return result;
		};
		
		
		/**
		 * set form value
		 * @param values
		 * @param namespace
		 */
		$.fn.setFormValue = function (values, namespace) {
		    var form = $(this);
		    for (var name in values) {
		        if (!values.hasOwnProperty(name)) continue;
		        if (namespace) name = [namespace, name].join('.');
		        var value = values[name];
		        if (typeof(value) === 'object') {
		            form.setFormValue(value, name);
		        } else {
		            var input = form.findByName(name);
		            if (input.is(':checkbox,:radio')) {
		                input = input
		                    .removeAttr('checked')
		                    .filter('[value="' + value + '"]');
		                var checkable = input.get(0);
		                if (checkable)checkable.checked = true;
		            } else {
		                input.val(value);
		            }
		        }
		
		    }
		};
		
		
		/**
		 * capture text change in real time
		 * @param callback
		 * @param interval
		 * @returns {*}
		 */
		$.fn.textchange = function (callback, interval) {
		
		
		    return $(this).each(function () {
		        var text = $(this),
		            val = text.val(),
		            timer = text.data('textchange-timer');
		        if (timer) {
		            clearInterval(timer);
		        } else {
		            text
		                .on('textchange', function () {
		                    callback.call(text, text.val());
		                })
		                .on('clear-textchange', function () {
		                    var timer = text.data('textchange-timer');
		                    clearInterval(timer);
		                });
		        }
		        timer = setInterval(function () {
		            var changed = val !== text.val();
		            if (changed) {
		                val = text.val();
		                text.trigger('textchange');
		            }
		        }, interval || 300);
		        text.data('textchange-timer', timer);
		
		    });
		};
		
		
		/**
		 * create spin
		 * @param opts
		 * @returns {*}
		 */
		$.fn.spin = function (opts) {
		    if (!window.Spinner) {
		        console.error('[jquery.tek.js] needs spin.js to use spin');
		        return this;
		    }
		    return $(this).each(function () {
		        var $this = $(this).addClass('tk-spin'),
		            data = $this.data();
		        if (data.spinner) {
		            data.spinner.stop();
		            delete data.spinner;
		        }
		        if (opts !== false) {
		            opts = $.extend({
		                color: $this.css('color'),
		                lines: 11,
		                length: 4,
		                width: 2,
		                radius: 4
		
		            }, opts);
		            data.spinner = new Spinner(opts)
		                .spin(this);
		        }
		    });
		};
		
		
		/**
		 * show spin
		 * @param size
		 * @returns {*|HTMLElement}
		 */
		$.fn.showSpin = function (size) {
		    if (!size) size = 16;
		    var elm = $(this),
		        spin = $('.tk-spin', elm);
		    if (!spin.size()) {
		        var tmpl = hbs.templates['tk-spin'];
		        spin = $(tmpl({
		            width: size,
		            height: size,
		            left: (elm.width() - size) / 2,
		            top: (elm.height() - size) / 2
		        })).appendTo(elm).spin();
		    }
		    spin.show();
		    return elm;
		};
		
		
		/**
		 * remove spin
		 * @returns {*|HTMLElement}
		 */
		$.fn.removeSpin = function () {
		    $('.tk-spin', this).remove();
		    return $(this);
		};
		
		
		/**
		 * form for ajax
		 * @param callback
		 * @param delay
		 * @returns {*}
		 */
		$.fn.ajaxForm = function (callback, delay) {
		    return $(this).each(function () {
		            var form = $(this),
		                action = form.attr('action'),
		                method = form.attr('method');
		            form.submit(function (e) {
		                e.preventDefault();
		                var timer = form.data('tk-submit-timer');
		                if (timer) clearTimeout(timer);
		                var value = form.getFormValue();
		                form.showSpin(16)
		                    .addClass('tk-loading');
		                timer = setTimeout(function () {
		                    $.ajax({
		                        type: method,
		                        url: action,
		                        data: value.toObj(),
		                        success: function (data) {
		                            callback && callback.call(form, data);
		                        },
		                        complete: function () {
		                            form
		                                .removeClass('tk-loading')
		                                .removeSpin();
		
		                        }
		                    });
		                }, delay || 300);
		                form.data('tk-submit-timer', timer);
		            });
		        }
		    )
		        ;
		}
		;
		
		
		/**
		 * render text input as editable-text
		 * @param trigger
		 * @returns {*}
		 */
		$.fn.editableText = function (trigger) {
		    if (!trigger) trigger = 'click';
		    var KEY_CODE = $.ui.keyCode;
		    var tmpl = hbs.templates['tk-editable-label'];
		    return $(this).each(function () {
		        var input = $(this);
		        if (input.data('tk-editable-text')) return;
		        input.data('tk-editable-text', true);
		        input.addClass('tk-editable-text');
		        var label = $(tmpl({})).insertAfter(input)
		            .on(trigger, function () {
		                input.trigger('tk-editable-text-edit');
		            });
		        input
		            .keypress(function (e) {
		                switch (e.keyCode || e.which) {
		                    case KEY_CODE.ENTER:
		                    case KEY_CODE.TAB:
		                        if (input.is('textarea')) {
		                            if (e.shiftKey || e.metaKey || e.altKey) {
		                                input.change();
		                                e.stopImmediatePropagation();
		                            }
		                        } else {
		                            input.change();
		                            e.stopImmediatePropagation();
		                        }
		                        break;
		                }
		            })
		            .on('tk-editable-text-edit', function () {
		                input.show();
		                setTimeout(function () {
		                    var focused = $('.tk-editable-text').filter(':focus').size();
		                    if (!focused) {
		                        input.last().focus().select();
		                    }
		                }, 20);
		                label.hide();
		            })
		            .on('tk-editable-text-fix', function () {
		                var val = input.val();
		                if (!val) return;
		                input.hide();
		                label.text(val).show();
		            })
		            .change(function () {
		                input.trigger('tk-editable-text-fix');
		            });
		        if (input.val()) input.change();
		    });
		};
		
		
		/**
		 * render select element as selectable-label
		 * @param trigger
		 * @returns {*}
		 */
		$.fn.selectableLabel = function (trigger) {
		    if (!trigger) trigger = 'click';
		    var tmpl = hbs.templates['tk-selectable-label'];
		    return $(this).each(function () {
		        var select = $(this);
		        if (select.data('tk-selectable-label')) return;
		        select.data('tk-selectable-label', true);
		        var
		            label = $(tmpl({}))
		                .insertAfter(select);
		        label
		            .on(trigger, function () {
		                select.show();
		                label.hide();
		            });
		        select.change(function () {
		            var selected = $('option:selected', select),
		                text = selected.text();
		            if (!text) return;
		            label.text(text)
		                .attr('data-tk-color-index', selected.prevAll('option').length)
		                .show();
		            select.hide();
		        }).change();
		    });
		};
		
		
		/**
		 * add open-up animation
		 */
		$.fn.openUp = function () {
		    var elm = $(this),
		        height = elm.height();
		    elm
		        .show()
		        .height(0)
		        .animate({
		            height: height
		        }, function () {
		            elm.removeAttr('style');
		        });
		};
		
		
		/**
		 * add close-down animation
		 */
		$.fn.closeDown = function () {
		    var elm = $(this);
		    elm.animate({
		        height: 0,
		        paddingTop: 0,
		        paddingBottom: 0
		    }, function () {
		        elm
		            .removeAttr('style')
		            .hide();
		    });
		};
		
		/**
		 * render html by handlebars
		 * @param tmpl
		 * @param data
		 * @returns {*}
		 */
		$.fn.htmlHandlebars = function (tmpl, data) {
		    return this.each(function () {
		        var html = $.renderHandlebars(tmpl, data);
		        $(this).html(html);
		    });
		};
		
		
		/**
		 * render and append handlebars
		 * @param tmpl
		 * @param data
		 * @returns {*}
		 */
		$.fn.appendHandlebars = function (tmpl, data) {
		    return this.each(function () {
		        var html = $.renderHandlebars(tmpl, data);
		        $(this).append(html);
		    });
		};
		
		/**
		 * text box with selection
		 * @param candidates
		 */
		$.fn.selectableText = function (candidates) {
		    var ambiguousMatch = tek.string.ambiguousMatch;
		    var tml = {
		        ul: hbs.templates['tk-selectable-text-list']
		    };
		    var input = $(this);
		    var ul = input.first().after(tml.ul({candidates: candidates})).next('.tk-selectable-text-list').hide();
		    ul.childItems = function () {
		        return ul.children('.tk-selectable-list-item');
		    };
		    ul.filterItem = function (searchWord) {
		        ul.childItems().each(function () {
		            var li = $(this),
		                text = li.children('a').text();
		            var hit = (text !== searchWord) && ((!searchWord) || ambiguousMatch(searchWord, text));
		            hit ? li.show() : li.hide();
		        });
		        return ul;
		    };
		    ul.hideList = function () {
		        ul.find('.tk-selected').removeClass('tk-selected');
		        return ul.hide();
		    };
		    ul.showList = function (style) {
		        return ul.show()
		            .css(style)
		            .children('li')
		            .show();
		    };
		    ul.find('a').click(function () {
		        var input = ul.data('tk-selectable-text-active');
		        clearTimeout(input.hideTimer);
		        var a = $(this);
		        input.val(a.text());
		        ul.hide();
		    });
		
		    return input
		        .attr({
		            autocomplete: 'off'
		        })
		        .each(function () {
		            var input = $(this);
		            input
		                .focus(function () {
		                    clearTimeout(input.hideTimer);
		                    ul.data('tk-selectable-text-active', input);
		                    input.after(ul);
		                    var position = input.position();
		                    ul
		                        .showList({
		                            left: position.left,
		                            top: position.top + input.outerHeight(true),
		                            width: input.outerWidth()
		                        });
		                    ul.filterItem(input.val());
		                })
		                .blur(function () {
		                    input.hideTimer = setTimeout(function () {
		                        ul.hideList();
		                    }, 500);
		                })
		                .keydown(function (e) {
		                    clearTimeout(input.hideTimer);
		                    var KEY = $.ui.keyCode;
		                    var li = ul.children('li'),
		                        selected = li.filter('.tk-selected:visible');
		                    switch (e.which) {
		                        case KEY.ENTER:
		                            selected.find('a').click();
		                            e.preventDefault();
		                            break;
		                        case KEY.UP:
		                            var prev = selected.prevAll(':visible').not('.tk-selected').first();
		                            if (prev.size()) {
		                                li.not(prev).removeClass('tk-selected');
		                                prev.addClass('tk-selected');
		                            } else {
		                                ul.hideList();
		                            }
		                            break;
		                        case KEY.DOWN:
		                            if (selected.size()) {
		                                var next = selected.nextAll(':visible').not('.tk-selected').first();
		                                if (next.size()) {
		                                    li.not(next).removeClass('tk-selected');
		                                    next.addClass('tk-selected');
		                                }
		                            } else {
		                                ul.show();
		                                li.filter('tk-selected').removeClass('tk-selected');
		                                li.filter(':visible').first().addClass('tk-selected');
		                            }
		                            break;
		                    }
		                })
		                .textchange(function () {
		                    clearTimeout(input.hideTimer);
		                    ul.show();
		                    ul.filterItem(input.val());
		                });
		        })
		};
		
		/**
		 * show fixed element as spy
		 */
		$.fn.spyFor = function (elm) {
		    if (typeof(elm) === 'string') {
		        elm = $(elm);
		    }
		    var spy = $(this),
		        win = $(window);
		    if (spy.data('tk-spy')) return spy;
		    spy
		        .addClass('tk-spy')
		        .hide();
		    spy.on = function () {
		        spy
		            .show()
		            .data('tk-spy-active', true);
		    };
		    spy.off = function () {
		        spy
		            .hide()
		            .data('tk-spy-active', false);
		    };
		    win.scroll(function () {
		        var showSpy = elm.height() + elm.offset().top < win.scrollTop();
		        var active = spy.data('tk-spy-active');
		        if (active) {
		            (!showSpy) && spy.off();
		        } else {
		            showSpy && spy.on();
		        }
		    });
		    return spy;
		};
		
		$.fn.showErrBalloon = function (msg, close_label) {
		    var elm = $(this);
		    elm.find('.tk-err-balloon').remove();
		    var tmpl = {
		        balloon: hbs.templates['tk-err-balloon']
		    };
		    var balloonHTML = tmpl.balloon({
		            msg: [].concat(msg),
		            close_label: close_label || '[close]'
		        }),
		        balloon = elm.append(balloonHTML).find('.tk-err-balloon');
		    balloon.click(function () {
		        balloon.fadeOut(200, function () {
		            balloon.remove();
		        });
		    });
		    return elm;
		};
		
		/**
		 * input with auto format feature
		 * @param format
		 * @returns {*}
		 *
		 * available formats
		 *   hankaku,zenkaku,hiragana,katakana
		 */
		$.fn.autoformatInput = function (format) {
		    var string = tek.string;
		    var input = $(this);
		    input.data('autoformat', format);
		    return input.each(function () {
		        var input = $(this);
		        if (input.data('autoformat-input')) return;
		        input.data('autoformat-input', true);
		        input.change(function () {
		            var input = $(this),
		                format = input.data('autoformat'),
		                val = input.val();
		            if (typeof(format) === 'string') {
		                format = format.split(',');
		            }
		            for (var i = 0, len = format.length; i < len; i++) {
		                switch (format[i]) {
		                    case 'hankaku':
		                        val = string.toHankaku(val);
		                        break;
		                    case 'zenkaku':
		                        val = string.toZenkaku(val);
		                        break;
		                    case 'hiragana':
		                        val = string.toHiragana(val);
		                        break;
		                    case 'katakana':
		                        val = string.toKatakana(val);
		                        break;
		                    default:
		                        console.warn('[tek.view.js]', format[i], 'is not supported for autoformat');
		                        break;
		                }
		            }
		            input.val(val);
		        });
		    });
		};
		
		/**
		 * search by word
		 * @param word
		 */
		$.fn.wordSearch = function (word) {
		    var ambiguousMatch = tek.string.ambiguousMatch;
		    var elm = $(this);
		    if (!elm.length) return false;
		    if (elm.is('.tk-hit-word')) return false;
		
		    $.wordSearch.restore(elm.find('.tk-hit-word'));
		
		    var hit = false,
		        contents = elm.contents(),
		        inner = $();
		
		
		    for (var i = 0, len = contents.length; i < len; i++) {
		        var content = contents[i];
		        switch (content.nodeType) {
		            case 3:
		                var match = ambiguousMatch(word, content.nodeValue);
		                if (match) {
		                    var span = $.wordSearch.hitElement(match);
		                    content.parentNode.replaceChild(span, content);
		                    hit = true;
		                }
		                break;
		            default:
		                inner = inner.add(content);
		                break;
		
		        }
		    }
		    return inner.wordSearch(word) || hit;
		};
		
		/**
		 * make table sortable by click th in thead
		 * @returns {*|jQuery|HTMLElement}
		 */
		$.fn.sortableTable = function (callback) {
		    var table = $(this),
		        thead = table.find('thead'),
		        tbody = table.find('tbody');
		
		    var bodyTr = tbody.find('tr');
		
		    bodyTr
		        .each(function (row) {
		            var tr = $(this);
		            tr
		                .data('tk-row', row)
		                .find('th,td').each(function (col) {
		                    $(this).addClass('tk-col-' + col);
		                });
		        });
		    thead
		        .find('th')
		        .addClass('tk-sortable-th')
		        .each(function (col) {
		            var th = $(this);
		            th.data('col', col);
		            if (!th.find('label').size()) {
		                var msg = '[tek.view.js] Thead th should contain label for sortable table.';
		                msg += 'tek.view.js complete it, but, consider prepare before rendering, for performance reasons.';
		                console.warn(msg);
		                th.wrapInner('<label/>');
		            }
		        })
		        .click(function () {
		            var th = $(this),
		                asc = eval(th.attr('data-tk-asc') || 'false'),
		                col = th.data('col');
		            th.siblings('[data-tk-asc]').removeAttr('data-tk-asc');
		            bodyTr
		                .each(function (i) {
		                    var tr = $(this),
		                        td = tr.find('.tk-col-' + col);
		                    tr
		                        .data('tk-sort-value', td.text() || '')
		                        .data('tk-row', i);
		                })
		                .sort(function (a, b) {
		                    var $1 = $(a);
		                    var $2 = $(b);
		                    var v1 = $1.data('tk-sort-value'),
		                        v2 = $2.data('tk-sort-value');
		                    var sorted = v1.localeCompare(v2) * (asc ? 1 : -1);
		                    if (sorted) {
		                        return  sorted;
		                    } else {
		                        return ($2.data('tk-row') - $1.data('tk-row')) * (asc ? 1 : -1);
		                    }
		                })
		                .appendTo(tbody);
		            th.attr('data-tk-asc', !asc);
		            callback && callback(col, asc);
		        });
		    return table;
		}
		
	})(dependencies, undefined);

})({
    $: this['$'],
    hbs: this['Handlebars'],
    tek: this['tek']
}, window, undefined);