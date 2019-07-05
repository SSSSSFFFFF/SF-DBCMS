<template>
  <div class="about">
    <el-form class="loginModel" :label-position="labelPosition" :rules="loginRules" ref="login" label-width="80px"
      :model="login">
      <el-form-item label="账号" prop="account">
        <el-input v-model="login.account" ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="login.password"  show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('login')">提交</el-button>
        <el-button @click="resetForm('login')">重置</el-button>
      </el-form-item>
    </el-form>
     <el-alert class="errAlert" v-if="alertShow"  title="账号或密码错误" type="error" :closable="closable" show-icon>
    </el-alert>
  </div>
</template>
<script>
  export default {
    name: 'login',
    data() {
      var accountRule = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {
          callback();
        }
      };
      var passwordRule = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      }
      return {
        labelPosition: 'left',
        login: {
          account: '',
          password: '',
        },
        loginRules: {
          account: [{
            validator: accountRule,
            trigger: 'blur'
          }],
          password: [{
            validator: passwordRule,
            trigger: 'blur'
          }]
        },
        closable:false,
        alertShow:false,
      };
    },
    mounted(){
    },
    methods: {
      submitForm(formName) {
        var that = this;
        const userInfo = {
          account: that.md5(that.login.account),
          password: that.md5(that.login.password)
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let loadding = this.$loading()
            that.axios.post(host+ '/admin',userInfo)
            .then(res => {
              if(res.data) {
                let token = res.data
                // 存储cookie
               localStorage.setItem("token", token);
                that.alertShow = false;  
                that.$router.replace("home")
              } else {
                that.alertShow = true;
              }
              loadding.close();
            })
            .catch(err => {
              console.error(err); 
            })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style scoped>
  .loginModel,.errAlert {
    position: absolute;
    left: 50%;
    top: 46%;
    transform: translate(-50%, -50%);
    width: 380px;
  }
  
  .errAlert {
    top: 58%;
    width: 400px;
  }
  .el-form-item {
    margin-bottom: 40px;
  }
</style>