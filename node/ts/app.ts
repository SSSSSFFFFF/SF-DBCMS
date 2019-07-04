

// mongodb数据库,apis
var mongodb:any = require('./mongodb');
// token登陆验证
var token = require('./token');
// 数据库设置在根目录 config.json
var json = require('../config.json');
// 服务器ip
var host = json.serverHost;
//端口号
var port = json.port

var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json())
//设置允许跨域访问该服务，禁止他人访问需关闭允许跨域
app.all('*', function (req: any, res:any, next:any) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});


/* 获取用户登陆token */
// app.post("/login", (req: any, res: any) => {
//     token.loginApi(res, req)
// })

//后台登录信息
app.post("/login", (req: any, res: any) => {
    token.loginApi(res, req)
})

/********mongodb********* */

// 添加库，表和数据
app.post("/add", (req: any, res: any) => {
    mongodb.dbAndCol(req, res, 'add');
});

// 查询
app.post("/query", (req: any, res: any) => {
    mongodb.dbAndCol(req, res, 'query');
})
//更新
app.post("/update", (req: any, res: any) => {
    mongodb.dbAndCol(req, res, 'update');
})
//删除
app.post("/delete", (req: any, res: any) => {
    mongodb.dbAndCol(req, res, 'delete');
})
//排序
app.post("/sort", (req: any, res: any) => {
    mongodb.dbAndCol(req, res, 'sort');
})
//删除集合
app.post("/deleteCol", (req: any, res: any) => {
    mongodb.dbAndCol(req, res, 'deleteCol');
})




/***配置服务端口***/
var server = app.listen(port, function () {
    console.log('接口地址' + host + ':' + port + '✅')
    console.log('查看接口文档 https://github.com/SSSSSFFFFF/SF-DBCMS')
})

let a:number = 4;
console.log(a)