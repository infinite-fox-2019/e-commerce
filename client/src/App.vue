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
  },
  data () {
    return {
      isLogin: false
      // errMessages: this.$store.state.errMessages
    }
  },
  computed: {
    errMessages () {
      return this.$store.state.errMessages
    }
  },
  methods: {
    getProducts () {
      this.$store.dispatch('getProducts')
    },
    showAlert (messages) {
      this.$notify({
        group: 'alert-error',
        title: messages,
        type: 'error'
      })
    }
  },
  created () {
    if (localStorage.userId && localStorage.username && localStorage.userRole && localStorage.access_token) {
      console.log('masuk access token')
      this.$store.commit('SET_USER_ID', localStorage.userId)
      this.$store.commit('SET_USERNAME', localStorage.username)
      this.$store.commit('SET_USER_ROLE', localStorage.userRole)
      this.$store.commit('SET_IS_LOGIN', true)
      this.getProducts()
    }
  },
  watch: {
    isLogin () {
      if (!this.isLogin) {
        localStorage.clear()
      }
    },
    errMessages () {
      this.showAlert(this.errMessages)
    }
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
}

.alert .error {
  background: black
}

</style>
