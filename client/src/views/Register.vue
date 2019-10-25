<template>
<div>
    <form
        class="box"
        action="index.html"
        method="post"
        @submit.prevent='register()'
        style="width:500px"
        >
    <h1>Register</h1>
    <input
      type="text"
      name=""
      placeholder="Username"
      v-model='form.username'
      >
    <input
      type="password"
      name=""
      placeholder="Password"
      v-model='form.password'
      >
    <input
      type="text"
      name=""
      placeholder="address"
      v-model='form.address'
    >
    <input
      type="email"
      name=""
      placeholder="username@example.id"
      v-model='form.email'
    >
      <div class='bbtn'>
        <input
          type="submit"
          name=""
          value="Login"
          >
        <input
          type='button'
          name="register"
          @click='register()'
          value="Register"
          >
      </div>
        <div class="spinner-grow text-secondary" v-if='isloading' role="status">
        <span class="sr-only">Loading...</span>
        </div>
  </form>
</div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'

export default {
  data () {
    return {
      form: {
        username: '',
        password: '',
        email: '',
        address: ''
      },
      isloading: false
    }
  },
  methods: {
    register () {
      const { username, password, email, address } = this.form
      this.isloading = true
      axios({
        method: 'post',
        url: 'http://dreamcarserver.dreamcarofficial.com/register',
        data: {
          username,
          password,
          email,
          address
        }
      })
        .then(({ data }) => {
          swal.fire({
            type: 'success',
            title: 'Yeah created!',
            text: data.msg + 'our team send you message, please check your email!'
          })
          this.$router.push('/')
          this.isloading = false
        })
        .catch(err => {
          swal.fire({
            type: 'error',
            title: 'Oooopss!',
            text: err.response.data.msg
          })
          this.isloading = false
        })
    }
  }
}
</script>

<style scoped>
.bbtn{
  display: flex;
}
body{
  margin: 0;
  padding: 0;
  font-size: 16px;
  letter-spacing:4px;
  font-family: sans-serif; }
.box{
  width: 315px;
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color:rgba(10,10,10,0.9);
  border-radius: 60px;
  box-shadow: 10px 11px 10px 5px rgba(10,10,50,0.9) ;
  text-align: center; }
.box h1{
  color: white;
  text-transform: uppercase;
  font-family: fantasy;
  font-weight: 500;
  color: gold; }
.box input[type = "text"],.box input[type = "password"],.box input[type = 'email']{
  border:2;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 4px double gold;
  padding: 12px 14px;
  width: 200px;
  outline: none;
  color: white;
  border-radius: 25px;
  transition: 0.2s; }
.box input[type = "text"]:focus,.box input[type = "password"]:focus,.box input[type = 'email']:focus{
  width: 280px;
  border-color: red; }
.box input[type = "submit"]{
  border:4px double ;
  background: none;
  display: block;
  margin: 15px auto;
  text-align: center;
  border: 4px double gold;
  padding: 12px 36px;
  outline: none;
  color: white;
  border-radius: 25px;
  transition: 0.2s;
  cursor: pointer; }
.box input[name = "register"]{
  border:4px double ;
  background: none;
  display: block;
  margin: 15px auto;
  text-align: center;
  border: 4px double gold;
  padding: 12px 36px;
  outline: none;
  color: white;
  border-radius: 25px;
  transition: 0.2s;
  cursor: pointer; }
.box input[type = 'email']{
  border:4px double ;
  background: none;
  display: block;
  margin: 15px auto;
  text-align: center;
  border: 4px double gold;
  padding: 12px 36px;
  outline: none;
  color: white;
  border-radius: 25px;
  transition: 0.2s;
  cursor: pointer; }
.box input[type = "submit"]:hover{
  background: blue; }
.box input[name = "register"]:hover{
  background: greenyellow;
  color: black }
.inside{
    margin: 100px 700px;
    justify-content: center;
}
</style>
