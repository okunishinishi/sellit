(function() {
	var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
	templates[''] = template(
	function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  return buffer;
  }
	);
})();(function() {
	var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
	templates['chart-cell-content'] = template(
	function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<a class=\"block-link chart-cell-content\" href=\"";
  if (stack1 = helpers.ctx) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ctx; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/client/";
  if (stack1 = helpers.client_id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.client_id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "?mode=edit#";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"\n        target=\"_blank\">\n\n    <label class='chart-cell-label' data-value=\"";
  if (stack1 = helpers.code) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.code; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" for=\"code-filter\">";
  if (stack1 = helpers.code) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.code; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</label>\n    <label class='chart-cell-label' data-value=\"";
  if (stack1 = helpers.initial_provider) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.initial_provider; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" for=\"initial_provider-filter\">";
  if (stack1 = helpers.initial_provider_name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.initial_provider_name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</label>\n    <label class='chart-cell-label' data-value=\"";
  if (stack1 = helpers.current_provider) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.current_provider; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" for=\"current_provider-filter\">";
  if (stack1 = helpers.current_provider_name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.current_provider_name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</label>\n    <label class='chart-cell-label' data-value=\"";
  if (stack1 = helpers.scale) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.scale; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" for=\"scale-filter\">";
  if (stack1 = helpers.scale) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.scale; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</label>\n    <label class='chart-cell-label' data-value=\"";
  if (stack1 = helpers.freeword) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.freeword; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" for=\"freeword-filter\">";
  if (stack1 = helpers.freeword) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.freeword; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</label>\n    <label class='chart-cell-label' data-value=\"";
  if (stack1 = helpers.start_at) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.start_at; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" for=\"start_at-filter\">";
  if (stack1 = helpers.start_at) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.start_at; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</label>\n\n    <div class=\"chart-cell-color-mark\"></div>\n    <div class=\"chart-cell-color-mark-hover\"></div>\n</a>";
  return buffer;
  }
	);
})();(function() {
	var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
	templates['chart-tbody-th-content'] = template(
	function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<small class=\"small-prefix\">";
  if (stack1 = helpers.prefix) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.prefix; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</small>";
  return buffer;
  }

  buffer += "<span>\n    ";
  stack1 = helpers['if'].call(depth0, depth0.prefix, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <a href=\"";
  if (stack1 = helpers.href) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.href; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" target=\"_blank\">";
  if (stack1 = helpers.text) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.text; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\n</span>\n";
  return buffer;
  }
	);
})();(function() {
	var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
	templates['client-list-item'] = template(
	function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <form class=\"inline-form\" action=\"";
  if (stack1 = helpers.ctx) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ctx; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/api/client/save\"\n              method=\"post\" name=\"edit-form\">\n            <input type=\"hidden\" value=\"";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"_id\"/>\n            <input type=\"hidden\" value=\"";
  if (stack1 = helpers._vr) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._vr; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"_vr\"/>\n            <input type=\"hidden\" value=\"";
  if (stack1 = helpers.sort_num) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.sort_num; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"sort_num\"/>\n            <input type=\"hidden\" value=\"";
  if (stack1 = helpers.parent_id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.parent_id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"parent_id\"/>\n            <input type=\"hidden\" value=\"";
  if (stack1 = helpers.children_ids) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.children_ids; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"children_ids\"/>\n            <input type=\"text\" data-role=\"editable-text\" name=\"name\" value=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\n        </form>\n    ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <a class=\"detail-link stick-right stick-top\"\n           data-role=\"detail-link\" href=\"";
  if (stack1 = helpers.ctx) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ctx; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/client/";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "?t=";
  if (stack1 = helpers['t']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0['t']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n            <i class=\"icon icon-chevron-right\"></i>\n        </a>\n\n        <form class=\"inline-form\" action=\"";
  if (stack1 = helpers.ctx) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ctx; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/api/client/save\"\n              method=\"post\" name=\"edit-form\">\n            <input type=\"hidden\" value=\"";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"_id\"/>\n            <input type=\"hidden\" value=\"";
  if (stack1 = helpers._vr) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._vr; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"_vr\"/>\n            <input type=\"hidden\" value=\"";
  if (stack1 = helpers.sort_num) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.sort_num; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"sort_num\"/>\n            <input type=\"hidden\" value=\"";
  if (stack1 = helpers.parent_id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.parent_id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"parent_id\"/>\n            <input type=\"text\" data-role=\"editable-text\" name=\"name\" value=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\n        </form>\n    ";
  return buffer;
  }

  buffer += "<div class=\"inline-div\" id=\"client-li-content-";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n    ";
  stack1 = helpers['if'].call(depth0, depth0.group, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <div class=\"stick-right stick-top block-list-item-control\">\n        <a href=\"javascript:void(0)\" data-role='edit-btn'>\n            <i class=\"icon icon-pencil\"></i>\n        </a>\n\n        <form class=\"inline-form\" action=\"";
  if (stack1 = helpers.ctx) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ctx; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/api/client/destroy\"\n              method=\"post\" name=\"destroy-form\">\n            <input type=\"hidden\" value=\"";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"_id\"/>\n            <a href=\"javascript:void(0)\" data-role='submit-btn'>\n                <i class=\"icon icon-trash\"></i>\n            </a>\n        </form>\n    </div>\n</div>\n";
  return buffer;
  }
	);
})();(function() {
	var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
	templates['department-list-item'] = template(
	function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<li class=\"department-list-item positioned\">\n    <form class=\"inline-form\" action=\"/api/department/save\"\n          method=\"post\" name=\"edit-form\">\n        <input type=\"hidden\" value=\"";
  if (stack1 = helpers.client_id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.client_id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"client_id\"/>\n        <input type=\"hidden\" value=\"";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"_id\"/>\n        <input type=\"hidden\" value=\"";
  if (stack1 = helpers.product_ids) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.product_ids; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"product_ids\"/>\n        <input type=\"text\" data-role=\"editable-text\"\n               placeholder=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers['l'] || depth0['l']),stack1 ? stack1.call(depth0, "plh.department_name", options) : helperMissing.call(depth0, "l", "plh.department_name", options)))
    + "\"\n               name=\"name\" value=\"";
  if (stack2 = helpers.name) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.name; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\"/>\n    </form>\n    <div class=\"stick-right stick-top block-list-item-control\">\n        <a href=\"javascript:void(0)\" data-role='edit-btn'>\n            <i class=\"icon icon-pencil\"></i>\n        </a>\n\n        <form class=\"inline-form\" action=\"/api/department/destroy\"\n              method=\"post\" name=\"destroy-form\">\n            <input type=\"hidden\" value=\"";
  if (stack2 = helpers._id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0._id; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" name=\"_id\"/>\n            <a href=\"javascript:void(0)\" data-role='submit-btn'>\n                <i class=\"icon icon-trash\"></i>\n            </a>\n        </form>\n    </div>\n</li>";
  return buffer;
  }
	);
})();(function() {
	var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
	templates['developer-list-item'] = template(
	function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li class=\"developer-list-item positioned\">\n    <a class=\"cover detail-link\" data-role=\"detail-link\" href=\"";
  if (stack1 = helpers.ctx) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ctx; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/developer/?_id=";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "&t=";
  if (stack1 = helpers['t']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0['t']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"></a>\n    <form class=\"inline-form\" action=\"";
  if (stack1 = helpers.ctx) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ctx; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/api/developer/save\"\n          method=\"post\" name=\"edit-form\">\n        <input type=\"hidden\" value=\"";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"_id\"/>\n        <input type=\"hidden\" value=\"";
  if (stack1 = helpers._vr) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._vr; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"_vr\"/>\n        <input type=\"text\" data-role=\"editable-text\" name=\"name\" value=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\n    </form>\n    <div class=\"stick-right stick-top block-list-item-control\">\n        <a href=\"javascript:void(0)\" data-role='edit-btn'>\n            <i class=\"icon icon-pencil\"></i>\n        </a>\n\n        <form class=\"inline-form\" action=\"";
  if (stack1 = helpers.ctx) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ctx; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/api/developer/destroy\"\n              method=\"post\" name=\"destroy-form\">\n            <input type=\"hidden\" value=\"";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"_id\"/>\n            <a href=\"javascript:void(0)\" data-role='submit-btn'>\n                <i class=\"icon icon-trash\"></i>\n            </a>\n        </form>\n    </div>\n</li>";
  return buffer;
  }
	);
})();(function() {
	var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
	templates['salesman-list-item'] = template(
	function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li class=\"salesman-list-item positioned\">\n    <a class=\"cover detail-link\" data-role=\"detail-link\" href=\"";
  if (stack1 = helpers.ctx) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ctx; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/salesman/?_id=";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "&t=";
  if (stack1 = helpers['t']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0['t']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"></a>\n    <form class=\"inline-form\" action=\"";
  if (stack1 = helpers.ctx) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ctx; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/api/salesman/save\"\n          method=\"post\" name=\"edit-form\">\n        <input type=\"hidden\" value=\"";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"_id\"/>\n        <input type=\"hidden\" value=\"";
  if (stack1 = helpers._vr) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._vr; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"_vr\"/>\n        <input type=\"text\" data-role=\"editable-text\" name=\"name\" value=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\n    </form>\n    <div class=\"stick-right stick-top block-list-item-control\">\n        <a href=\"javascript:void(0)\" data-role='edit-btn'>\n            <i class=\"icon icon-pencil\"></i>\n        </a>\n\n        <form class=\"inline-form\" action=\"";
  if (stack1 = helpers.ctx) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ctx; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/api/salesman/destroy\"\n              method=\"post\" name=\"destroy-form\">\n            <input type=\"hidden\" value=\"";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"_id\"/>\n            <a href=\"javascript:void(0)\" data-role='submit-btn'>\n                <i class=\"icon icon-trash\"></i>\n            </a>\n        </form>\n    </div>\n</li>";
  return buffer;
  }
	);
})();