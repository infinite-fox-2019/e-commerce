<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="nav-style nav-color">
      <img src="../assets/logo2.png" alt="logo" class="logo">

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
            <router-link to="/"><span>Home</span></router-link>
            <router-link to="/about"><span>About</span></router-link>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-item right>
           <a href="" v-if="this.$store.state.isLogin" @click="logout()">Logout</a>
              <!-- <br> -->
              <a href="" v-if="this.$store.state.userRole === 'admin'">AddProduct</a>
              <router-link to="/login" v-if="!this.$store.state.isLogin">Login</router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name:'navbar',
  methods:{
    logout () {
        localStorage.removeItem('token')
        // localStorage.removeItem('role')
        this.$store.commit('logout')
        Swal.fire('Bye','logout success','success')
    }
  }
}
</script>


<style scoped>
.logo {
  width: 50px !important;
}
.nav-style {
  background-color: #dfe6e9 !important;
}
a {
  font-weight: bold;
  color: #fff;
  margin-right: 10px;
  text-decoration: none !important;
}
.nav-color {
  background-color: #619d2d !important;
}
span {
  color: #fff;
  font-weight: bold;
}
</style>
