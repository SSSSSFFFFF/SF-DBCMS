const jwt = require('jsonwebtoken')
// 密钥
const secret = 'SfCmsUserInfo'
let loginApi = (req: any, res: any) =>{
    // 签发 Token
    const token = jwt.sign(req, secret, {
        expiresIn: '1day'
    })
    // 输出签发的 Token
    res.send(token)

   
}
    

 // 验证 Token
function verifyToken(token:string){
     jwt.verify(token, secret, (error: any, decoded: any) => {
         if (error) {
             console.log(error.message)
             return
         } else {
             
             let nowTime = (new Date()).getTime().toString().substring(0, 10);
            //  console.log(decoded, nowTime)
             if (decoded.exp > nowTime && decoded.iat <nowTime) {
                 // @ts-ignore
                 global.rightToken = true
             } else {
                 // @ts-ignore
                 global.rightToken = false
             }
         }

     })
 }

module.exports ={
    loginApi,
    verifyToken
}