var app = exports.app = {};
app.name = 'sellit';
app.description = 'sales management system';


var msg = exports.msg = {};
msg.sure = 'Are ABSOLUTELY your sure?';
msg.never_go_back = 'Once this done, there will be no way to go back.';
msg.save_done = 'save done!';


var err = exports.err = {};
err.page_not_found = 'sorry! page not found';
err.login_fail = 'username or password is wrong';


var btn = exports.btn = {};
btn.new = 'new';
btn.edit = 'edit';
btn.done = 'done';
btn.save = 'save';
btn.cancel = 'cancel';
btn.remove = 'remove';
btn.search = 'search';
btn.execute = 'execute';

btn.remove_it = 'remove {{it}}';


var lbl = exports.lbl = {};
lbl.search = 'search';
lbl.understand = 'I understand consequences.';

lbl.client = 'client';
lbl.client_group = 'group';
lbl.client_name = 'client name';
lbl.client_description = 'description';
lbl.system = 'system';
lbl.system_name = 'system name';
lbl.chart_table = 'list data';
lbl.data_count = 'count: ';
lbl.system = 'system';
lbl.systems = 'systems';
lbl.salesman = 'salesman';
lbl.freeword = 'free word';
lbl.code = 'code';
lbl.scale = 'scale';
lbl.scale_unit = 'man-month';
lbl.provider = 'provider';
lbl.developer = 'developer';
lbl.login = 'login';
lbl.username = 'username';
lbl.passowrd = 'password';
lbl.name = 'name';
lbl.provider = 'provider';
lbl.initial_provider = 'initial developer';
lbl.current_provider = 'current develop';

lbl.all = 'all';
lbl.last_update_by = 'updated by';
lbl.colorize = 'colorize';
lbl.decolorize = 'decolorize';
lbl.chart_title = [lbl.client, '×', lbl.system].join(' ');
lbl.on = 'on';
lbl.off = 'off';
lbl.control = 'control';
lbl.filter = 'filter';
lbl.system_filter = [lbl.filter, lbl.system].join(' ');
lbl.client_filter = [lbl.filter, lbl.client].join(' ');
lbl.color_effect = 'color effect';
lbl.scale_effect = 'scale effect';
lbl.apply = 'apply';
lbl.start_at = 'start_at';
lbl.login_as = 'login as';

var plh = exports.plh = {};
plh.search = lbl.search;
plh.client_name = lbl.client_name;

plh.system_name = lbl.system_name;
plh.freeword = lbl.freeword;
plh.provider = ['--', lbl.provider, '--'].join(' ');

var alt = exports.alt = {};
alt.sure = 'Are your sure?';
