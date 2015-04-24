var config = require("config");
var crypto = require('crypto');
var log = require("../helpers/log");
var API = require('wechat-api');
var api = new API(config.weChat.appId, config.weChat.secret);

var weChat = {};

/**
 * 接入授权验证
 * @param query 微信请求参数
 * @returns {string} 返回结果 如果验签正确 返回 echostr的值,否则返回error
 */
weChat.sign = function (query) {
    // 获取参数
    var signature = query.signature;
    var timestamp = query.timestamp;
    var nonce = query.nonce;
    var echostr = query.echostr;

    // 数组排序
    var arr = [nonce, timestamp, config.weChat.token].sort();
    var sha1 = crypto.createHash('sha1');
    sha1.update(arr.join(''));
    var sign = sha1.digest("hex");

    log.info("echostr:%s \r\n signatur:%s \r\n timestamp:%s \r\n nonce:%s \r\n echostr:%s \r\n sha1:%s \r\n token:%s", echostr, signature, timestamp, nonce, echostr, sign, config.weChat.token);
    return sign != signature ? "error" : echostr;
};

//weChat.accessToken=function()
weChat.getFollowers = function (callback) {
    api.getFollowers(callback);
};
module.exports = weChat;