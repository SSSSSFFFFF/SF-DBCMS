<template>
  <div class="home">
      <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <font-awesome-icon icon="user-secret" />
            <span>操作数据库</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <!-- <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item> -->
       
      </el-menu>
  </div>
</template>



<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'

  export default {
    name: 'home',
    components: {
      HelloWorld
    },
    data() {
      return {
        text: "添加一条数据",
        isCollapse: true,
        name: '',
        headImg: '',
        zheDieBoolen: false,
      }
    },
    mounted() {
      var that = this;
      // 判断是否有token
      if (!localStorage.getItem("token")) {
        that.$router.replace("/")
      } else {
        let datas = {
          "dataBase": "SFCMS",
          "collectionName": "adminInfo",
          "data": {
            "name": "sf"
          },
          "token": localStorage.getItem("token")
        }

        // 判断缓存是否有用户信息
        if (localStorage.getItem("userInfo")) {
          getUserInfoFromeLocalStorage();
        } else {
          that.axios.post(host + "/query", datas)
            .then(res => {
              localStorage.setItem("userInfo", JSON.stringify(res.data[0]))
              getUserInfoFromeLocalStorage()
            })
        }

        function getUserInfoFromeLocalStorage() {
          let userInfo = JSON.parse(localStorage.getItem("userInfo"));
          that.name = userInfo.name;
          that.headImg = userInfo.headImg;
        }

      }

    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    }


  }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .iconRotate {
    font-size: 30px;
    line-height: 30px !important;
  }

  .el-submenu__title {
    font-size: 30px !important;
  }
</style>