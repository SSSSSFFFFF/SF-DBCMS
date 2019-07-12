/* 创每个接口都要建库和表（有了则不创建）,传递参数和type = api的值 */
var json = require('../../config.json');

var tokenFunc = require('./token');
// mongodb的ip
var mongoIp = json.mongoIp;
var dbAuth = json.dbAuth;
var MongoClient = require('mongodb').MongoClient;
var dbPasswords = json.dbPasswords;
var url = "mongodb://" + dbAuth + ':' + dbPasswords + '@' + mongoIp + ":27017/";
var dbAndCol = (req: { body: any; }, res: any, type: any) => {
    //接收客户端请求主体数据
    try {
        let buf = req.body;
        MongoClient.connect(url, {
            useNewUrlParser: true
        }, function (err: any, db:any) {
                // console.log(buf)
            try {
                if (err)
                    throw err;
                // 创建数据库
                let dbase = db.db(buf.dataBase);
                let col = buf.collectionName;
                let token = buf.token;
                // console.log('database:' + buf.dataBase + '✅');
                // 添加表和数据
                
                tokenFunc.verifyToken(token)
                // @ts-ignore
                // console.log(global.rightToken); 
                
                if (token) {
                    apis(db, buf, dbase, col, res, type);
                }
                
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    catch (err) {
        console.error(err);
    }
};
/* api 通过api的type来区别做哪些对应的操作 */
var apis = (db: any, buf: any, dbase: any, col: string, response: any, type:any) => {
    // 传过来的api的类型
    console.log('⭐', type);
    // 添加库，表和数据
    if (type == 'add') {
        // 添加时间
        buf.data.forEach((element:any) => {
            element.createTime = new Date();
        });
        dbase.collection(col).insertMany(buf.data, function (err:any, res:any) {
            if (err)
                throw err;
            // 发送返回值
            buf.code = '201';
            buf.mean = '添加成功';
            response.send(buf.data.data);
            db.close();
        });
    }
    // 查询
    else if (type == 'query') {
        let findData = '';
        findData = buf.data;
        let limitNum = 0;
        //每页显示条数
        if (buf.pageSize != undefined) {
            limitNum = buf.pageSize;
        }
        //第几页
        let skipNum = 0;
        if (buf.page != undefined) {
            skipNum = limitNum * (buf.page - 1);
        }
        let mysort = buf.sort;
        dbase.collection(col).find(findData).skip(skipNum).limit(limitNum).sort(mysort).toArray(function (err: any, result: any) {
            if (err)
                throw err;
            result.code = '202';
            result.mean = '查询成功';
            response.send(result);
            db.close();
        });
    }
    //更新
    else if (type == 'update') {
        let whereStr = buf.whereStr; // 查询条件
        let updateStr = {
            $set: buf.updateStr
        };
        dbase.collection(col).updateMany(whereStr, updateStr, function (err: any, res: any) {
            if (err)
                throw err;
            let sendMessage = {
                code: '202',
                mean: '更新成功',
                modifiedCount: res.modifiedCount
            };
            response.send(sendMessage);
            db.close();
        });
    }
    //删除
    else if (type == 'delete') {
        let whereStr = buf.whereStr;
        dbase.collection(col).deleteMany(whereStr, function (err: any, res: any) {
            if (err)
                throw err;
            let sendMessage = {
                code: '202',
                mean: '删除成功',
                deletedCount: res.deletedCount
            };
            response.send(sendMessage);
            db.close();
        });
    }
    //排序
    else if (type == 'sort') {
        let mysort = buf.sort;
        dbase.collection(col).find().sort(mysort).toArray(function (err: any, result: any) {
            if (err)
                throw err;
            result.code = '202';
            result.mean = '排序成功';
            response.send(result);
            db.close();
        });
    }
    //删除集合
    else if (type == 'deleteCol') {
        dbase.collection(col).drop(function (err: any, delOK: any) {
            if (err)
                throw err;
            let result = {
                code: '202',
                mean: '删除集合成功'
            };
            response.send(result);
            db.close();
        });
    }
};
module.exports = {
    dbAndCol,
    url
};