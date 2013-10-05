/**
 * Created by okunishitaka on 10/5/13.
 */
var tek = require('tek'),
    ModuleCollector = tek['meta']['ModuleCollector'];

module.exports = new ModuleCollector(__dirname).collect('d');
