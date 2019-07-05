"use strict";
var mongodb = require('./mongodb');
var token = require('./token');
function adminLogin(req, res) {
    // 管理员
    let key = {
        account: "21232f297a57a5a743894a0e4a801fc3",
        password: "becb8a7748c8d838df5adcf1b37be654"
    };
    if (JSON.stringify(req.body) == JSON.stringify(key)) {
        token.loginApi(req.body, res);
    }
    else {
        res.send(false);
    }
}
module.exports = {
    adminLogin
};
