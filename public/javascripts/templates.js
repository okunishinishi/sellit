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
	templates['chart-list-item'] = template(
	function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li class=\"chart-list-item positioned\">\n    <a class=\"cover\" data-role=\"detail-link\" href=\"/chart/?_id=";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"></a>\n    <form class=\"inline-form\" action=\"/api/chart/save\"\n          method=\"post\" name=\"edit-form\">\n        <input type=\"hidden\" value=\"";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"_id\"/>\n        <input type=\"text\" data-role=\"editable-text\" name=\"name\" value=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\n    </form>\n    <div class=\"stick-right stick-top block-list-item-control\">\n        <a href=\"javascript:void(0)\" data-role='edit-btn'>\n            <i class=\"icon icon-pencil\"></i>\n        </a>\n\n        <form class=\"inline-form\" action=\"/api/chart/destroy\"\n              method=\"post\" name=\"destroy-form\">\n            <input type=\"hidden\" value=\"";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"_id\"/>\n            <a href=\"javascript:void(0)\" data-role='submit-btn'>\n                <i class=\"icon icon-trash\"></i>\n            </a>\n        </form>\n    </div>\n</li>";
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

  buffer += "<div class=\"inline-div\">\n    ";
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
	templates['confirm-dialog'] = template(
	function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<section class=\"confirm-dialog\">\n    <div class=\"confirm-dialog-inner\">\n        <h2 class=\"dialog-title\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers['l'] || depth0['l']),stack1 ? stack1.call(depth0, "msg.sure", options) : helperMissing.call(depth0, "l", "msg.sure", options)))
    + "</h2>\n        ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers['l'] || depth0['l']),stack1 ? stack1.call(depth0, "msg.never_go_back", options) : helperMissing.call(depth0, "l", "msg.never_go_back", options)))
    + "\n        <form>\n            <a href=\"javascript:void(0)\" data-role=\"cancel-btn\"\n               class=\"stick-right stick-top remove-btn\"\n                    >&times;</a>\n\n            <p>\n\n                <input type=\"checkbox\" id=\"confirm-dialog-check\"/>\n                <label for=\"confirm-dialog-check\"><b>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers['l'] || depth0['l']),stack1 ? stack1.call(depth0, "lbl.understand", options) : helperMissing.call(depth0, "l", "lbl.understand", options)))
    + "</b></label>\n            </p>\n            <input type=\"submit\" class=\"btn btn-danger wide-btn disabled\"\n                   disabled=\"disabled\" value=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers['l'] || depth0['l']),stack1 ? stack1.call(depth0, "btn.remove_it", options) : helperMissing.call(depth0, "l", "btn.remove_it", options)))
    + "\"/>\n        </form>\n    </div>\n</section>\n";
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
	templates['rival-list-item'] = template(
	function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li class=\"rival-list-item positioned\">\n    <a class=\"cover detail-link\" data-role=\"detail-link\" href=\"";
  if (stack1 = helpers.ctx) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ctx; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/rival/?_id=";
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
    + "/api/rival/save\"\n          method=\"post\" name=\"edit-form\">\n        <input type=\"hidden\" value=\"";
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
    + "/api/rival/destroy\"\n              method=\"post\" name=\"destroy-form\">\n            <input type=\"hidden\" value=\"";
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