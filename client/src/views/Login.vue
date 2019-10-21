<template>
  <div class="container" style="margin-top:50px">
    <div class="row">
      <div class="col-sm">
        <h3>Login</h3>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email" required>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password" required>
          </div>
          <button class="btn btn-primary">login</button>
          <button class="btn btn-secondary" style="margin-left:10px" @click.prevent="toRegister()">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data(){
    return{
      email: '',
      password: ''
    }
  },
  methods:{
    login(){
      axios({
        method: 'post',
        url: 'http://ecommerce-server.indraaditya.online/users/login',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({data})=>{
          localStorage.setItem('token', data)
          this.$router.push('/')
          this.$emit('login')
        })
    },
    toRegister(){
      this.$router.push('/register')
    }
  }
}
</script>

<style>
  .container{
    padding-top: 10px
  }
</style>
