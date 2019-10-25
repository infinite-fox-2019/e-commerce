<template>
    <form
        class="box"
        action="index.html"
        method="post"
        @submit.prevent='login()'
        style="width:500px"
        >
    <h1>Login</h1>
    <input
      type="email"
      name=""
      placeholder="username@example.id"
      v-model='form.email'
      >
    <input
      type="password"
      name=""
      placeholder="Password"
      v-model='form.password'
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
  </form>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'

export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      isloading: false
    }
  },
  methods: {
    register () {
      this.$router.push('/register')
    },
    login () {
      const email = this.form.email
      const password = this.form.password
      this.$store.dispatch('login', { email, password })
        .then(data => {
          swal.fire({
            type: 'success',
            title: 'You\'re Online now!',
            text: data.msg
          })
          localStorage.setItem('token', data.token)
          localStorage.setItem('pos', data.role)
          this.$router.push('/')
          console.log(data)
        })
        .catch(err => {
          swal.fire({
            type: 'error',
            title: 'Ooooops!',
            text: err.response.data.msg
          })
        })
      // axios({
      //     method : 'post',
      //     url: 'http://dreamcarserver.dreamcarofficial.com/login',
      //     data: {
      //         email,
      //         password
      //     }
      // })
      //     .then(({data})=>{
      //         swal.fire({
      //             type: 'success',
      //             title: 'You\'re Online now',
      //             text: data.msg
      //         })
      //         localStorage.setItem('token',data.token)
      //         localStorage.setItem('pos',data.role);
      //         this.$store.commit('CHECK_LOGIN', { islogin: true, data});
      //         this.$router.push('/');
      //         this.isloading= false;
      //     })
      //     .catch(err=>{
      //         swal.fire({
      //             type: 'error',
      //             title: 'Ooooops!',
      //             text: err.response.data.msg
      //         })
      //         this.isloading= false;
      //     })
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
.box input[type = "email"],.box input[type = "password"]{
  border:2;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 4px double #4433dd;
  padding: 12px 14px;
  width: 200px;
  outline: none;
  color: white;
  border-radius: 25px;
  transition: 0.2s; }
.box input[type = "email"]:focus,.box input[type = "password"]:focus{
  width: 280px;
  border-color: #1bbb55; }
.box input[type = "submit"]{
  border:4px double ;
  background: none;
  display: block;
  margin: 15px auto;
  text-align: center;
  border: 4px double #1bbb55;
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
  border: 4px double #1bbb55;
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
</style>
