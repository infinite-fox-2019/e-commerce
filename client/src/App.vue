<template>
  <div id="app">
    <div id="nav" class="flex justify-between">
      <div>
        <router-link to="/products" class="text-xl px-4">Home</router-link>
        <router-link to="/transactions" class="text-xl px-4">Transactions</router-link>
      </div>
      <div class="flex justify-between">
        <div><router-link to="/user/cart"><i class="fas fa-shopping-cart text-white hover:text-blue-400 text-2xl mx-4 px-4"></i></router-link></div>
        <a href="" @click.prevent="logout"><i class="fas fa-sign-out-alt text-white hover:text-red-400 text-2xl mx-4 px-4"></i></a>
      </div>

    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  },
  created () {
    this.$store.dispatch('verifyToken')
      .then(({ data }) => {
        this.$store.commit('UPDATE_LOGIN', true)
        let role = localStorage.getItem('role')
        console.log('role==================', role)
        this.$store.commit('UPDATE_ROLE', role)
        this.$router.push('/products')
      })
      .catch(({ response }) => {
        console.log(response.data)
        this.$store.dispatch('logout')
      })
  },
  computed: {
    role () {
      return this.$store.state.role
    }
  },
  watch: {
    role () {
      console.log(this.role, 'kepanggil')
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
  /* font-size: 80%; */
}

#nav {
  padding: 20px;
  background-color: rgba(0, 105, 128, 0.707);
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
