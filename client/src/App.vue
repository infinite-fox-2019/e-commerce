<template>
  <div id="app">
    <div id="nav">
      <Navbar
        :loginStatusFromApp="login"
        :adminStatusFromApp="admin"
        @loginStatus="loginstatus"
        @adminStatus="adminstatus"
      />
    </div>
    <router-view
      @loginStatus="loginstatus"
      @adminStatus="adminstatus"
      :loginStatusFromApp="login"
      :adminStatusFromApp="admin"
    />
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
      login: false,
      admin: false
    }
  },
  methods: {
    loginstatus (status) {
      this.login = status
      console.log(this.login, 'from app')
    },
    adminstatus (status) {
      this.admin = status
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.login = true
    } else {
      this.login = false
    }

    if (localStorage.getItem('admin')) {
      this.admin = true
    } else {
      this.admin = false
    }
  }
}
</script>

<style>

</style>
