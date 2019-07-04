"use strict";
let jsonWebToken = (userInfo, res) => {
    const jwt = require('jsonwebtoken');
    // 密钥
    const secret = 'SfCmsUserInfo';
    // 签发 Token
    const token = jwt.sign(userInfo, secret, {
        expiresIn: '1day'
    });
    // 输出签发的 Token
    res.send(token);
    // 验证 Token
    jwt.verify(token, secret, (error, decoded) => {
        if (error) {
            console.log(error.message);
            return;
        }
    });
};
let loginApi = (res, req) => {
    jsonWebToken(req.body, res);
};
module.exports = {
    loginApi,
};
