<template>
  <div>
      <div id="nav">
      <div>
        <img src="../../public/logo.webp" alt="" style="width: 100px;">
      </div>
      <div>
        <router-link to="/">Home</router-link>
        <router-link v-if="isLogin && !isAdmin" to="/transactions">Transactions</router-link>
        <router-link to="/about">About</router-link>
        <router-link v-if="isAdmin"  to="/admin">Admin</router-link>
      </div>
      <div>
        <img src="https://img.icons8.com/carbon-copy/100/000000/automatic.png">
        <router-link to="/cart"><img src="https://img.icons8.com/cotton/50/000000/shopping-cart.png"></router-link>

        <router-link v-if="isLogin" to="/"><a  @click.prevent="logout" >logout</a></router-link>
        <router-link v-if="!isLogin" to="/login">login</router-link>
    </div>
  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'navbar',
  computed: mapState(['isLogin', 'isAdmin']),
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.push(`/`)
    }
  }
}
</script>

<style>

#nav {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 25px 30px;
  height: 20vh;
  background-color: #f6f6f6
}

#nav a{
  color: rgb(19, 19, 19);
  padding: 0 5px;
  font-family: 'Roboto', sans-serif;
  text-transform: uppercase;
  transition: 500ms
}

#nav img {
  transition: 500ms;
  margin: 0 5px;
  width: 25px;
  cursor: pointer;

}

#nav img:hover{
  border-radius: 15px;
  background-color: #FFAE00;
}

#nav a:hover{
  color: #FFAE00;
  text-decoration: none;
  outline: none;
  cursor: pointer;
}
</style>
