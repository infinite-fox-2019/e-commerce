<template>
    <div class="backgroundlogin">
    <!-- FORM  -->
        <div class="login-wrap my-5">
            <div class="login-html">
                <input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1" class="tab" @click="errTrigger = 'signin'">Sign In</label>
                <input id="tab-2" type="radio" name="tab" class="sign-up"><label for="tab-2" class="tab" @click="errTrigger = 'signup'">Sign Up</label>
                <div class="login-form">
                    <div class="sign-in-htm">
                        <form @submit.prevent="login()">
                            <div class="group">
                                <label for="user" class="label">Email</label>
                                <input id="user" type="text" class="input"  v-model="emaillog">
                            </div>
                            <div class="group">
                                <label for="pass" class="label">Password</label>
                                <input id="pass" type="password" class="input" data-type="password"  v-model="passwordlog">
                            </div>
                            <div class="group">
                                <input type="submit" class="button" value="Sign In">
                            </div>
                            <div class="hr"></div>
                            <h3 style="color: white;"> {{ error }} </h3>
                        </form>
                    </div>
                    <div class="sign-up-htm">
                        <form @submit.prevent="register()">
                            <div class="group">
                                <label for="user" class="label">Username</label>
                                <input id="user" type="text" class="input" v-model="usernamereg">
                            </div>
                            <div class="group">
                                <label for="pass" class="label">Email Address</label>
                                <input id="pass" type="text" class="input" v-model="emailreg">
                            </div>
                            <div class="group">
                                <label for="pass" class="label">Password</label>
                                <input id="pass" type="password" class="input" data-type="password" v-model="passwordreg">
                            </div>
                            <div class="group">
                                <input type="submit" class="button" value="Sign Up">
                            </div>
                            <div class="hr"></div>
                            <h3 style="color: white;"> {{ error }} </h3>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- FORM SELESAI -->
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      usernamereg: '',
      emailreg: '',
      passwordreg: '',
      emaillog: '',
      passwordlog: '',
      error: '',
      errTrigger: '',
      name: ''
    }
  },
  methods: {
    register () {
      axios({
        method: 'post',
        url: 'http://localhost:3000/user/register',
        data: {
          username: this.usernamereg,
          email: this.emailreg,
          password: this.passwordreg
        }
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('name', data.username)
          localStorage.setItem('role', data.role)
          this.$store.commit('login', { name: data.username, role: data.role })
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Success Register',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push('/')
        })
        .catch(err => {
          this.error = JSON.parse(err.response.request.response).message[0]
        })
    },
    login () {
      axios({
        method: 'post',
        url: 'http://localhost:3000/user/login',
        data: {
          email: this.emaillog,
          password: this.passwordlog
        }
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('name', data.username)
          localStorage.setItem('role', data.role)
          this.$store.commit('login', { name: data.username, role: data.role })
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Success Login',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push('/')
        })
        .catch(err => {
          this.error = JSON.parse(err.response.request.response).message[0]
        })
    }
  },
  watch: {
    errTrigger () {
      this.error = ''
    }
  }
}
</script>

<style scoped>
    .backgroundlogin {
        background-color: #3d4c74;
    }

    body{
        margin:0;
        color:#6a6f8c;
        background: #3d4c74 !important;
        font:600 16px/18px 'Open Sans',sans-serif;
    }
    *,:after,:before{box-sizing:border-box}
    .clearfix:after,.clearfix:before{content:'';display:table}
    .clearfix:after{clear:both;display:block}
    a{color:inherit;text-decoration:none}

    .login-wrap{
        width:100%;
        margin:auto;
        max-width:525px;
        min-height:670px;
        position:relative;
        background:url(https://raw.githubusercontent.com/khadkamhn/day-01-login-form/master/img/bg.jpg) no-repeat center;
        box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19);
    }
    .login-html{
        width:100%;
        height:100%;
        position:absolute;
        padding:90px 70px 50px 70px;
        background:rgba(40,57,101,.9);
    }
    .login-html .sign-in-htm,
    .login-html .sign-up-htm{
        top:0;
        left:0;
        right:0;
        bottom:0;
        position:absolute;
        transform:rotateY(180deg);
        backface-visibility:hidden;
        transition:all .4s linear;
    }
    .login-html .sign-in,
    .login-html .sign-up,
    .login-form .group .check{
        display:none;
    }
    .login-html .tab,
    .login-form .group .label,
    .login-form .group .button{
        text-transform:uppercase;
    }
    .login-html .tab{
        font-size:22px;
        margin-right:15px;
        padding-bottom:5px;
        margin:0 15px 10px 0;
        display:inline-block;
        border-bottom:2px solid transparent;
    }
    .login-html .sign-in:checked + .tab,
    .login-html .sign-up:checked + .tab{
        color:#fff;
        border-color:#1161ee;
    }
    .login-form{
        min-height:345px;
        position:relative;
        perspective:1000px;
        transform-style:preserve-3d;
    }
    .login-form .group{
        margin-bottom:15px;
    }
    .login-form .group .label,
    .login-form .group .input,
    .login-form .group .button{
        width:100%;
        color:#fff;
        display:block;
    }
    .login-form .group .input,
    .login-form .group .button{
        border:none;
        padding:15px 20px;
        border-radius:25px;
        background:rgba(255,255,255,.1);
    }
    .login-form .group input[data-type="password"]{
        text-security:circle;
        -webkit-text-security:circle;
    }
    .login-form .group .label{
        color:#aaa;
        font-size:12px;
    }
    .login-form .group .button{
        background:#1161ee;
    }
    .login-form .group label .icon{
        width:15px;
        height:15px;
        border-radius:2px;
        position:relative;
        display:inline-block;
        background:rgba(255,255,255,.1);
    }
    .login-form .group label .icon:before,
    .login-form .group label .icon:after{
        content:'';
        width:10px;
        height:2px;
        background:#fff;
        position:absolute;
        transition:all .2s ease-in-out 0s;
    }
    .login-form .group label .icon:before{
        left:3px;
        width:5px;
        bottom:6px;
        transform:scale(0) rotate(0);
    }
    .login-form .group label .icon:after{
        top:6px;
        right:0;
        transform:scale(0) rotate(0);
    }
    .login-form .group .check:checked + label{
        color:#fff;
    }
    .login-form .group .check:checked + label .icon{
        background:#1161ee;
    }
    .login-form .group .check:checked + label .icon:before{
        transform:scale(1) rotate(45deg);
    }
    .login-form .group .check:checked + label .icon:after{
        transform:scale(1) rotate(-45deg);
    }
    .login-html .sign-in:checked + .tab + .sign-up + .tab + .login-form .sign-in-htm{
        transform:rotate(0);
    }
    .login-html .sign-up:checked + .tab + .login-form .sign-up-htm{
        transform:rotate(0);
    }

    .hr{
        height:2px;
        margin:60px 0 50px 0;
        background:rgba(255,255,255,.2);
    }
    .foot-lnk{
        text-align:center;
    }
</style>
