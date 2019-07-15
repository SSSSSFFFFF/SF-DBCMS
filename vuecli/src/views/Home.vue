<template>
  <div class="home">
    <el-menu default-active="2" class="leftList el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
      @select="handleSelect" text-color="white" background-color="#212121" :default-openeds="openeds">
      <el-submenu index="1">
        <template slot="title">
          <i class="fa fa-database" :style="listIconStyle"></i>
          <span>数据库</span>
        </template>
        <el-menu-item index="1-1">用户管理</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-submenu>
      <div class="listBottom">

        <div class="signOut">
          <p class="signOutName">Hi, {{name}} !</p>
          <img class="headImgCss" :src="headImg" alt="">
        </div>
        <el-button class="signOutElButton" type="text" @click="open2">
          <span class="signOutButton">
            <i class="fa fa-sign-out" aria-hidden="true"></i>
            Sign Out
          </span>
        </el-button>
      </div>
    </el-menu>
    <div class="rightHeader">
      <database v-if="menuIndex == '1-1'"></database>
    </div>
  </div>
</template>
<script>
  // @ is an alias to /src
  import database from '@/components/database.vue'
  export default {
    name: 'home',
    components: {
      database
    },
    data() {
      return {
        text: "添加一条数据",
        name: '',
        headImg: '',
        listIconStyle: "margin-right:15px",
        openeds: ["1"],
        currentRow: null,
        menuIndex:'',
      }
    },
    mounted() {
      var that = this;
      // 判断是否有token
      if (!localStorage.getItem("token")) {
        that.$router.replace("login")
      } else {
        let datas = {
          "dataBase": "SFCMS",
          "collectionName": "adminInfo",
          "data": {
            "name": "sf"
          },
          "token": localStorage.getItem("token")
        }

        // 判断缓存用户信息是否过期或存在
        if (localStorage.getItem("userInfo") != "undefined" && localStorage.getItem("userInfo") != null) {
          getUserInfoFromeLocalStorage();
          that.axios.post(host + "/query", datas)
            .then(res => {
              if (JSON.stringify(res.data[0]) != localStorage.getItem("userInfo")) {
                localStorage.setItem("userInfo", JSON.stringify(res.data[0]))
                getUserInfoFromeLocalStorage();
              }
            })
        } else  {
          console.log(2)
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
      handleSelect(key, keyPath) {
        this.menuIndex = key
      },
      open2() {
        var that = this;
        this.$confirm('是否继续退出账号?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          //退出登录 清除token
          localStorage.removeItem("token")
          that.$router.replace("login")
        }).catch(() => {      
        });
      }
    }


  }
</script>

<style scoped>
  .home {
    height: 100%;
    width: 100%;
  }

  .el-submenu__title i {
    color: white;
  }

  .signOutName {
    width: 50px;
    word-wrap: break-word;
  }

  .signOutButton {
    background: #fff;
    color: black;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    cursor: pointer;
  }

  .signOut {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 150px;
  }

  .headImgCss {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: block;
    margin-bottom: 20px;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .el-menu-vertical-demo {
    height: 100vh;
  }

  .leftList {
    position: absolute;
    left: 0;
    top: 0;
    border-right: 0;
  }

  .rightHeader {
    margin-left: 200px;
    background-color: #F2F2F2;
    height: 100%;
  }

  .listBottom {
    position: absolute;
    bottom: 20px;
    left: 20px;
    color: white;
  }

  .fa-sign-out {
    font-size: 20px;
  }

  .el-menu-item.is-active {
    color: white;
    background: #595959 !important;
  }
  .signOutElButton {
    width: 100%;
  }
</style>