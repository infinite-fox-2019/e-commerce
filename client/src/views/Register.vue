<template>
  <div class="container" style="margin-top:50px">
    <div class="row">
      <div class="col-sm">
        <h3>Register</h3>
        <form @submit.prevent="register()">
          <div class="form-group">
            <label>First Name:</label>
            <input type="text" class="form-control" placeholder="First Name" v-model="first_name">
          </div>
          <div class="form-group">
            <label>Last Name</label>
            <input type="text" class="form-control" placeholder=" Last Name" v-model="last_name">
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
          </div>
          <button class="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    toLogin(){
      this.$router.push('/login')
    },
    register(){

      axios({
        method: 'post',
        url: 'http://localhost:3000/users/register',
        data: {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password
        }
      })
        .then(({data})=>{
          return axios({
            method: 'post',
            url: 'http://localhost:3000/users/login',
            data: {
              email: this.email,
              password: this.password
            }
          })
        })
        .then(({data})=>{
          localStorage.setItem('token', data)
          this.$emit('login')
          this.$router.push('/')
        })
    }
  }
}
</script>

<style>

</style>