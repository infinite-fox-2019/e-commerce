<template>
  <div>
  <b-navbar type="dark" variant="dark">
    <b-navbar-nav>
      <b-nav-item href="#" @click="home">Home</b-nav-item>
      <b-nav-item href="#" v-if="!this.$store.state.isLogin" @click="login">Login</b-nav-item>
      <b-nav-item href="#" v-else @click="logout">Logout</b-nav-item>
      <addproduct></addproduct>
    </b-navbar-nav>
  </b-navbar>
</div>
</template>

<script>
import Swal from 'sweetalert2'
import addproduct from './addproduct'

export default {
  name: 'navabar',
  methods: {
    home () {
      this.$router.push('/')
    },
    login () {
      this.$router.push('/login')
    },
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      localStorage.removeItem('role')
      this.$store.commit('logout')
      Swal.fire({
        position: 'top-end',
        type: 'success',
        title: 'Success Logout',
        showConfirmButton: false,
        timer: 1500
      })
    }
  },
  components: {
    addproduct
  }
}
</script>

<style>

</style>
