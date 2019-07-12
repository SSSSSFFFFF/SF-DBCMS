<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <div>
      <p>
        If Element is successfully added to this project, you'll see an
        <code v-text="'<el-button>'"></code>
        below
      </p>
      <el-button>el-button</el-button>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  // components: {
  //   HelloWorld
  // }
  methods:{
  },
  mounted(){
  }
}
</script>

<style>
html,body{
  height: 100vh;
  width: 100vw;
  margin: 0;
  overflow: auto;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar
{
    width: 16px;
    height: 16px;
    background-color: #F5F5F5;
}
 
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track
{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
    border-radius: 5px;
    background-color: #F5F5F5;
}
 
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.2);
    background-color: rgba(0,0,0,.4);
}
</style>
