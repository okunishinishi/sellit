var l = exports;

var app = exports.app = {};
app.name = 'sellit';
app.description = 'sales management system';


l.msg = {};
l.msg.sure = 'Are ABSOLUTELY your sure?';
l.msg.never_go_back = 'Once this done, there will be no way to go back.';
l.msg.save_done = 'save done!';
l.msg.leave_with_unsaved = 'You have unsaved changes.';
l.msg.no_clients = 'No clients found.';

l.err = {};
l.err.page_not_found = 'sorry! page not found';
l.err.login_fail = 'username or password is wrong';


l.btn = {};
l.btn.new = 'new';
l.btn.edit = 'edit';
l.btn.done = 'done';
l.btn.save = 'save';
l.btn.cancel = 'cancel';
l.btn.remove = 'remove';
l.btn.search = 'search';
l.btn.execute = 'execute';

l.btn.remove_it = 'remove {{it}}';


l.lbl = {};
l.lbl.search = 'search';
l.lbl.understand = 'I understand consequences.';

l.lbl.client = 'client';
l.lbl.client_group = 'group';
l.lbl.client_name = 'client name';
l.lbl.client_description = 'description';
l.lbl.system = 'system';
l.lbl.system_name = 'system name';
l.lbl.chart_table = 'list data';
l.lbl.data_count = 'count: ';
l.lbl.system = 'system';
l.lbl.systems = 'systems';
l.lbl.salesman = 'salesman';
l.lbl.freeword = 'free word';
l.lbl.code = 'code';
l.lbl.scale = 'scale';
l.lbl.scale_unit = 'man-month';
l.lbl.provider = 'provider';
l.lbl.developer = 'developer';
l.lbl.login = 'login';
l.lbl.username = 'username';
l.lbl.passowrd = 'password';
l.lbl.name = 'name';
l.lbl.provider = 'provider';
l.lbl.initial_provider = 'initial developer';
l.lbl.current_provider = 'current develop';

l.lbl.all = 'all';
l.lbl.all_clients = 'select clients';
l.lbl.last_update_by = 'updated by';
l.lbl.colorize = 'colorize';
l.lbl.decolorize = 'decolorize';
l.lbl.chart_title = [l.lbl.client, '×', l.lbl.system].join(' ');
l.lbl.on = 'on';
l.lbl.off = 'off';
l.lbl.control = 'control';
l.lbl.filter = 'filter';
l.lbl.system_filter = [l.lbl.filter, l.lbl.system].join(' ');
l.lbl.client_filter = [l.lbl.filter, l.lbl.client].join(' ');
l.lbl.color_effect = 'color effect';
l.lbl.scale_effect = 'scale effect';
l.lbl.apply = 'apply';
l.lbl.start_at = 'start_at';
l.lbl.login_as = 'login as';

l.plh = {};
l.plh.search = l.lbl.search;
l.plh.client_name = l.lbl.client_name;

l.plh.system_name = l.lbl.system_name;
l.plh.freeword = l.lbl.freeword;
l.plh.provider = ['--', l.lbl.provider, '--'].join(' ');
l.plh.select_all_clients = ['--', l.lbl.all_clients, '--'].join(' ');


l.alt = {};
l.alt.sure = 'Are your sure?';
