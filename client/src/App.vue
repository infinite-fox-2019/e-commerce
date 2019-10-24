<template>
  <div id="app">
    <div id="nav">
      <navbar></navbar>
      <!-- <router-link to="/">Home</router-link> | -->
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <router-view/>
  </div>
</template>

<script>
import navbar from './components/navbar'
export default {
  components: {
    navbar
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$store.commit('login', { name: localStorage.getItem('name'), role: localStorage.getItem('role') })
    }
  }
}
</script>

<style>
html {
  height: 100%;
  background-color: #3d4c74;

}

body {
  height: 100%;
  background-color: #3d4c74;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #3d4c74;
  height: 100%;
}
#nav {
  padding: 30px;
}

</style>
