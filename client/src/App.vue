<template>
  <div id="app">
    <Navbar/>
    <router-view/>
    <notifications group="alert-error" class="alert"/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
export default {
  components: {
    Navbar
  }
}
</script>

<style>
#app {
  font-family: 'Cabin', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.alert {
  margin-top: 70px;
  margin-right: 20px;
  background: #2c3e50;
  color: black;
}

</style>
