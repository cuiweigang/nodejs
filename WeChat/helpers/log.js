var log4js = require('log4js');

var log = function () {
    log4js.configure("config/log4.json");
    var log = log4js.getLogger('wechat');
    return log;
};

module.exports = log();