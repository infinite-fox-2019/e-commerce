<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Navbar from './components/Navbar'
export default {
  components: {
    Navbar
  },
  mounted () {
    let token = localStorage.getItem('token')
    let role = localStorage.getItem('role')
    console.log(role, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
    if(role === 'admin'){
      this.$store.dispatch('admin')
    }
    if (token) {
      this.$store.dispatch('logged')
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
}

body {
  margin: 0;
  padding: 0;
}

</style>
