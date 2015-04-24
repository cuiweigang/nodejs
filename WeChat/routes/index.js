var express = require('express');
var router = express.Router();
var weChat = require("../module/weChat");
var config = require("config");
var API = require('wechat-api');
var api = new API(config.weChat.appId, config.weChat.secret);
var log = require("../helpers/log");
/**
 * 微信接入接口
 */
router.get('/wechat', function (req, res, next) {
    res.send(weChat.sign(req.query));
});

router.get("/getFollowers", function (req, res) {
    weChat.getFollowers(function (err, result) {
        api.getUser(result.data.openid[0], function (err, result) {
            log.info(result);
            res.send(result);
        });
    });
});


module.exports = router;
