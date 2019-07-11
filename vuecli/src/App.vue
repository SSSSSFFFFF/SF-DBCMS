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
</style>
