/**
 * User: okunishitaka
 * Date: 9/21/13
 * Time: 4:17 PM
 */

var tek = require('tek'),
    ModuleCollector = tek['meta']['ModuleCollector'];


module.exports = new ModuleCollector(__dirname).collect();
