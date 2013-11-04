/**
 * tek.view.js
 * - javascript library for tek -
 * @version v0.2.2
 * @author Taka Okunishi
 * @date 2013-11-03
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
		    + ";height:";
		  if (stack1 = helpers.height) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		  else { stack1 = depth0.height; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		  buffer += escapeExpression(stack1)
		    + ";\n        position: absolute;left:";
		  if (stack1 = helpers.left) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		  else { stack1 = depth0.left; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		  buffer += escapeExpression(stack1)
		    + ";top:";
		  if (stack1 = helpers.top) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		  else { stack1 = depth0.top; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		  buffer += escapeExpression(stack1)
		    + "\"></div>";
		  return buffer;
		  });
		})();
	})(dependencies, undefined);
	/** tek.view for $ **/
	(function (global, undefined) {
	
		var tek = global['tek'],
		    hbs = global['hbs'],
		    $ = global['$'];
		
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
		    $('#tk-confirm-dialog').remove();
		
		    var tmpl = hbs.templates['tk-confirm-dialog'];
		    data = $.extend({
		        title: 'Are you ABSOLUTELY sure?',
		        sub_title: 'One this done, there will be no way to go back.',
		        check_label: 'I understand consequences.',
		        btn_label: 'do it!'
		    }, data);
		    var html = tmpl(data);
		
		    var dialog = $(html).appendTo(document.body),
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
		
		
		
	})(dependencies, undefined);
	/** tek.view for $.fn **/
	(function (global, undefined) {
	
		var $ = global['$'],
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
                            var focused = $('.tk-editable-text:focus').size();
                            if(!focused){
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
		 * @param data
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
	})(dependencies, undefined);

})({
    $: this['$'],
    hbs: this['Handlebars'],
    tek: this['tek']
}, window, undefined);