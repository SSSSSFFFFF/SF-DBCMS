<template>
    <div class="hello">
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            
            <el-table-column  label="头像" show-overflow-tooltip>
                <template v-slot="scope">
                    <img :src="scope.row.headImg" width="40" height="40" class="head_pic"/>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: 'database',
        props: {
            msg: String
        },
        data() {
            return {
                tableData: [],
                multipleSelection: []
            }

        },
        mounted() {
            var that = this;
            let token = localStorage.getItem("token");
            let datas = {
                "dataBase": "SFCMS",
                "collectionName": "adminInfo",
                "token": token
            }
            that.axios.post(host + "/query", datas)
                .then(res => {
                    that.tableData = res.data;
                    // console.log(that.tableData)
                })
        },
        methods: {
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
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>