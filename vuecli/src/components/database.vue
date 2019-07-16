<template>
    <div class="hello">
        <a href="" download="后台管理员.xlsx" id="hf"></a>
        <div class="block">
            <div class="right">
                <el-button @click="addUser"><i class="fa fa-user-plus" aria-hidden="true"></i> 添加用户
                </el-button>
                <el-button @click="downloadExcel"><i class="fa fa-file-excel-o" aria-hidden="true"></i> {{dao}}
                </el-button>
            </div>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="pageSizes" :page-size="10"
                layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
            </el-pagination>

        </div>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
            @selection-change="handleSelectionChange" >
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column label="头像" show-overflow-tooltip>
                <template v-slot="scope">
                    <img :src="scope.row.headImg" width="40" height="40" class="head_pic" />
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="rowClick(scope.row)" size="small">编辑</el-button>
                </template>
            </el-table-column>

        </el-table>

        <!-- 添加用户对话框 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="80px" label-position="left">
                <el-form-item label="用户名">
                    <el-input class="userInput" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="上传头像">
                    <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="plusCenter el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmAddUser">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {
        downloadExl
    } from '../assets/excel.js'
    export default {
        name: 'database',
        props: {
            msg: String
        },
        data() {
            return {
                tableData: [],
                multipleSelection: [],
                pageSizes: [5, 10, 15, 20, 50, 100],
                pageTotal: 0,
                pageIndex: 1,
                pageSize: 10,
                allData: [],
                dao: " 导出Excel",
                dialogVisible: false,
                form: {
                    name: '',
                    headImg: '',
                },
                imageUrl: '',
                imgFile: '',
                currentPage: 1,
                rowData: '',
                dialogTitle:"",
            }

        },
        mounted() {
            this.query();
            this.query(1, 10);


        },
        methods: {
            addUser(){
                this.dialogTitle = '添加用户';
                this.dialogVisible = true;
            },
            editUserInfo() {
                //改数据
            },
            rowClick(row) {
                this.dialogTitle = '编辑用户'
                this.rowData = row
                this.dialogVisible = true;
                this.form.name = row.name;
                this.imageUrl = row.headImg;
            },
            handleAvatarSuccess(res, file) {
                this.imgFile = file.raw
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {

                const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            confirmAddUser() {
                let loadding = this.$loading()
                var that = this;
                //下载头像到本地或服务器
                // 创建一个FormData对象,用来组装一组用 XMLHttpRequest发送请求的键/值对
                var fd = new FormData();
                // 把 input 标签获取的文件加入 FromData 中
                fd.append('file', that.imgFile);
                that.axios.post(webHost + "/upload", fd)
                    .then(res => {
                        that.form.headImg = res.data.headImg
                        let datas = {
                            "dataBase": "SFCMS",
                            "collectionName": "adminInfo",
                            "data": [
                                that.form
                            ],
                            "token": localStorage.getItem("token")
                        }
                        that.axios.post(host + '/add', datas)
                            .then(res => {
                                console.log(res)
                                loadding.close();
                                that.tableData.push(that.form)
                                that.dialogVisible = false;
                                that.currentPage = that.pageTotal

                            })
                            .catch(err => {
                                console.error(err);
                            })



                    })
                    .catch(err => {
                        console.error(err);
                    })
            },
            downloadExcel() {
                if (this.multipleSelection.length > 0) {
                    downloadExl(this.multipleSelection);
                } else {
                    downloadExl(this.allData);
                }
            },
            query(page, pageSize) {
                var that = this;
                let datas = {
                    "dataBase": "SFCMS",
                    "collectionName": "adminInfo",
                    "page": page,
                    "pageSize": pageSize,
                    "token": localStorage.getItem("token")
                }
                that.axios.post(host + "/query", datas)
                    .then(res => {
                        if (!page && !pageSize) {
                            that.pageTotal = res.data.length;
                            that.allData = res.data;
                        } else {
                            that.tableData = res.data;
                        }
                        // console.log(that.tableData)
                    })
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.query(this.pageIndex, this.pageSize);
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.query(this.pageIndex, this.pageSize);
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                var that = this;
                this.multipleSelection = val;
                if (this.multipleSelection.length > 0) {
                    that.dao = " 导出选中Excel"
                } else {
                    that.dao = " 导出Excel"
                }
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .el-pager .active {
        color: white !important;
        background: #212121;
    }

    .el-checkbox__inner {
        width: 16px;
        height: 16px;
        font-size: 16px;
    }

    .block {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 14px 14px;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .plusCenter {
        display: flex !important;
        align-items: center;
        justify-content: center;
    }
</style>