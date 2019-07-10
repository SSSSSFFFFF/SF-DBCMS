<template>
    <div class="hello">
        <a href="" download="后台管理员.xlsx" id="hf"></a>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="1" :page-sizes="pageSizes" :page-size="10"
                layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
            </el-pagination>
            <div class="right">
                
                <el-button @click="downloadExcel"><i class="fa fa-file-excel-o" aria-hidden="true"></i> 导出Excel</el-button>
               
            </div>
        </div>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column label="头像" show-overflow-tooltip>
                <template v-slot="scope">
                    <img :src="scope.row.headImg" width="40" height="40" class="head_pic" />
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {downloadExl} from '../assets/excel.js'
    export default {
        name: 'database',
        props: {
            msg: String
        },
        data() {
            return {
                tableData: [],
                multipleSelection: [],
                pageSizes:[5,10,20,50,100],
                pageTotal:0,
                pageIndex:1,
                pageSize:10,
                allData: [],
            }

        },
        mounted() {
            this.query();
            this.query(1,10);
            
            
        },
        methods: {
            downloadExcel(){
                downloadExl(this.allData);
            },
            query(page,pageSize){
                var that = this;
                let token = localStorage.getItem("token");
                let datas = {
                    "dataBase": "SFCMS",
                    "collectionName": "adminInfo",
                    "page": page,      
                    "pageSize" : pageSize, 
                    "token": token
                }
                that.axios.post(host + "/query", datas)
                    .then(res => {
                        if(!page && !pageSize){
                            that.pageTotal = res.data.length;
                            that.allData =  res.data;
                        } else {
                             that.tableData = res.data;
                        }
                        // console.log(that.tableData)
                    })   
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.query(this.pageIndex,this.pageSize);
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.query(this.pageIndex,this.pageSize);
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
                this.multipleSelection = val;
                console.log(this.multipleSelection)
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-pager .active {
    color: white!important;
    background: #212121;
}
.el-checkbox__inner {
    width: 16px;
    height: 16px;
    font-size: 16px;
}
.block{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 14px;
}
</style>