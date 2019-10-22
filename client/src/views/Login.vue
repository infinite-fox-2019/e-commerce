<template>
  <div class="d-flex">
      <div class="pic">
          <img src="https://s3-ap-southeast-2.amazonaws.com/hnnz-assets/images/furniture/lemans.jpg" alt="">
      </div>
      <div class="login d-flex flex-column align-items-center mt-5">
          <h1>Login to continue</h1>
          <input v-model="email" type="text" placeholder="Email">
          <input v-model="password" type="password" placeholder="password">
          <div class="d-flex justify-content-center w-100">
              <router-link to="/"><button @click.prevent="login" class="btn btn-primary mx-3" style="width: 210px">Login</button></router-link>
              <router-link to="/"><button @click.prevent="register" class="btn btn-info mx-3" style="width: 210px">Register</button></router-link>
          </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      let payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
       this.$router.push(`/`)
    },
    register () {
      let payload = {
        email: this.email,
        password: this.password
      }
       this.$store.dispatch('register', payload)
       this.$router.push(`/`)
    }
  }
}
</script>

<style>
.pic{
    height: 100vh;
    width: 50%;
}

.pic img {
    height: 100%;
}

.login {
    width: 100%;
}

.login input{
    margin: 10px 0;
    height: 60px;
    width: 80%;
    border-radius: 5px;
    padding: 10px;
}

</style>
