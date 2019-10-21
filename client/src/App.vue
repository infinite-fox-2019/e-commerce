<template>
  <div id="app">
    <router-view/>

  </div>
</template>

<script>
// import Home from '../src/views/Home'

export default {
  mounted () {
    if (localStorage.getItem('token')) {
      this.$store.commit('login')
      this.$store.commit('setRole', localStorage.getItem('role'))
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
}

</style>
