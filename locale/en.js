/**
 * User: okunishitaka
 * Date: 9/21/13
 * Time: 4:14 PM
 */


var app = exports.app = {};
app.name = 'sellit';
app.description = 'sales management system';


var msg = exports.msg = {};


var err = exports.err = {};
err.page_not_found = 'sorry! page not found';


var btn = exports.btn = {};
btn.new = 'new';
btn.edit = 'edit';
btn.save = 'save';
btn.cancel = 'cancel';
btn.remove = 'remove';
btn.search = 'search';

var lbl = exports.lbl = {};
lbl.search = 'search';
lbl.client_name = 'client name';

lbl.department = 'department';
lbl.department_name = [lbl.department, 'name'].join(' ');

var plh = exports.plh = {};
plh.search = lbl.search;
plh.client_name = lbl.client_name;
plh.department_name = lbl.department_name;

var txt = exports.txt = {};

var alt = exports.alt = {};
alt.sure = 'Are your sure?';
