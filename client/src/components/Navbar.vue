<template>

  <div>
    <b-navbar toggleable="lg" type="dark" variant="secondary">
      <b-navbar-brand href="#"><router-link class="nav-title" to="/">Dipadana E-Commerce</router-link></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

        <router-link to="/cart"><b-button pill class="mr-2" variant="secondary">Cart</b-button></router-link>
        <router-link to="/login"><b-button pill class="mr-2" variant="secondary">Login</b-button></router-link>
        <b-button pill class="mr-2" variant="secondary">Logout</b-button>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>

</template>

<script>
export default {
  name:"navbar",
  methods:{
    logout () {

    }
  }
}
</script>

<style scoped>
.nav-title{
  color: white;
  text-decoration: none;
  font-weight: bold
}
</style>