<template>
  <div id="app">
    <Rw msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import Rw from "./components/Rw.vue";

export default {
  name: "App",
  components: {
    Rw
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
/*#app{*/
/*    margin-left: 100px;*/
/*    height: 20px;*/
/*    width: 50px;*/
/*    background: linear-gradient(to right, #ffd3a1, #fe7596);*/
/*}*/
</style>
