
let jsonWebToken = (userInfo:any, res:any) => {
    const jwt = require('jsonwebtoken')

    // 密钥
    const secret = 'SfCmsUserInfo'

    // 签发 Token
    const token = jwt.sign(userInfo, secret, {
        expiresIn: '1day'
    })

    // 输出签发的 Token
    res.send(token)

    // 验证 Token
    jwt.verify(token, secret, (error: any, decoded: any) => {
        if (error) {
            console.log(error.message)
            return
        }
        
    })
}

let loginApi = (res: any, req: any) =>{
    jsonWebToken(req.body,res);
}
    
module.exports ={
    loginApi,
}