"use strict";
const jwt = require('jsonwebtoken');
// 密钥
const secret = 'SfCmsUserInfo';
let loginApi = (req, res) => {
    // 签发 Token
    const token = jwt.sign(req, secret, {
        expiresIn: '1day'
    });
    // 输出签发的 Token
    res.send(token);
};
// 验证 Token
function verifyToken(token) {
    jwt.verify(token, secret, (error, decoded) => {
        if (error) {
            console.log(error.message);
            return;
        }
        else {
            console.log(decoded);
            let nowTime = (new Date()).getTime().toString().substring(0, 10);
            if (decoded.exp > nowTime && decoded.iat < nowTime) {
                global.rightToken = true;
            }
        }
    });
}
module.exports = {
    loginApi,
    verifyToken
};
