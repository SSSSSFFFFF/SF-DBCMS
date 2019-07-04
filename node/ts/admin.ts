function adminLogin(req:any,res:object  ) {
    let key = {
        account: "21232f297a57a5a743894a0e4a801fc3",
        password: "e10adc3949ba59abbe56e057f20f883e"
    }
    console.log(JSON.stringify(req.body) == JSON.stringify(key)) 
    if (req.body == key){
        console.log(true);
    }
}

module.exports = {
    adminLogin
}