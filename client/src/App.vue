<template>
<div>
    <Nav
      >
    </Nav>
    <router-view
    />
</div>
</template>

<script>
import Nav from './components/Nav'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      getData: ''
    }
  },
  components: {
    Nav
  },
  methods: {
    fetchingData () {
      this.getData = this.$store.dispatch('fetchData')
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.fetchingData()
      this.$store.commit('LOGIN_TRUE', true)
    } else {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang='scss'>
body{
  background-image: url("https://images.unsplash.com/photo-1570280407069-9017ba84a3a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80");
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  justify-content: center;
  align-items: center
}
#nav {
  padding: 30px;
  background-color:red
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
