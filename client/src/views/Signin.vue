<template>
  <div class="forms">
    <div class="leaves">
      <div class="register" v-if="registerform">
        <h1>Create Account</h1>
        <form @submit.prevent="register">
          <img src="../assets/register.svg" class="ooo" />
          <b-field class="inputan1">
            <b-input placeholder="Name" v-model="nameRegist" icon="face"></b-input>
          </b-field>
          <b-field class="inputan1">
            <b-input placeholder="Email" v-model="emailRegist" type="email" icon="email"></b-input>
          </b-field>
          <b-field class="inputan1">
            <b-input placeholder="Pasword" v-model="passwordRegist" type="password" icon="key"></b-input>
          </b-field>
          <b-field class="inputan1">
            <b-input placeholder="Address" v-model="addressRegist" icon="home"></b-input>
          </b-field>
          <b-button type="is-success" @click="register" class="btm oke">Sign Up</b-button>
        </form>
      </div>
      <div class="imgg" v-else>
        <img src="../assets/arts.svg" alt class="ooa" />
      </div>
      <div class="signin">
        <form @submit.prevent="login">
          <h1>Sign In</h1>
          <img src="../assets/login.svg" class="ooi" />
          <b-field class="inputan">
            <b-input placeholder="Email" v-model="inputEmail" type="email" icon="email"></b-input>
          </b-field>
          <b-field class="inputan">
            <b-input placeholder="Pasword" v-model="inputPassword" type="password" icon="key"></b-input>
          </b-field>
          <p>
            New to Artzone?
            <a @click="showregist">Create an Account.</a>
          </p>
          <b-button type="is-success" class="btm oke" @click="login">Sign In</b-button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../config/axios.js'
import Swal from 'sweetalert2'
export default {
  data () {
    return {
      inputEmail: '',
      inputPassword: '',
      registerform: false,
      nameRegist: '',
      emailRegist: '',
      passwordRegist: '',
      addressRegist: ''
    }
  },
  methods: {
    showregist () {
      this.registerform = true
    },
    register () {
      console.log('heree')
      axios({
        method: 'post',
        url: '/users/',
        data: {
          name: this.nameRegist,
          email: this.emailRegist,
          address: this.addressRegist,
          password: this.passwordRegist
        }
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('email', data.email)
          localStorage.setItem('role', data.role)
          console.log('islogin')
          let { _id, name, email, role, cart, history } = data
          let payload = {
            _id,
            name,
            email,
            role,
            cart,
            history
          }
          this.$router.push({ path: '/shop' })
          this.$store.commit('SET_USERINFO', payload)
          this.$store.commit('SET_ISLOGIN', true)
          this.$store.commit('SET_CART', cart)
        })
        .catch(err => {
          let errors = err.response.data.errMsg.join('<br>')
          Swal.fire({
            type: 'error',
            title: 'Error!',
            html: errors
          })
          console.log(errors)
        })
        .finally(() => {
          this.clearInput()
        })
    },
    login () {
      axios({
        method: 'post',
        url: '/users/login',
        data: {
          email: this.inputEmail,
          password: this.inputPassword
        }
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('email', data.email)
          localStorage.setItem('role', data.role)
          console.log('islogin')
          let { _id, name, email, role, cart, history } = data
          let payload = {
            _id,
            name,
            email,
            role,
            cart,
            history
          }
          this.$store.commit('SET_USERINFO', payload)
          this.$store.commit('SET_ISLOGIN', true)
          this.$store.commit('SET_CART', cart)
          this.$router.push('/shop')
        })
        .catch(err => {
          let errors = err.response.data.errMsg
          Swal.fire(
            `Can't Login`,
            `${errors}`,
            'warning'
          )
          console.log(errors)
        })
        .finally(() => {
          this.clearInput()
        })
    },
    clearInput () {
      this.inputEmail = ''
      this.inputPassword = ''
      this.emailRegist = ''
      this.nameRegist = ''
      this.passwordRegist = ''
      this.addressRegist = ''
    }
  },
  created () {
    this.registerform = false
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Rubik:300,300i,400,400i,500,500i,700,700i,900,900i&display=swap");

.forms {
  background: url(../assets/homeback.jpg);
  height: 88vh;
}
.leaves {
  width: calc(100vw - 100px);
  height: calc(90vh - 60px);
  margin: 50px;
  margin-top: 0;
  background: linear-gradient(rgb(22, 20, 20), rgb(46, 31, 85));
  border-top-left-radius: 120px;
  border-bottom-right-radius: 120px;
  display: flex;
}
.register {
  width: 52%;
  padding: 45px;
  padding-right: 50px;
  margin-left: 58px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-right: 5pt dashed #ffa705;
}
.signin {
  width: 50%;
  margin: 45px;
  display: flex;
  justify-content: center;
}
form {
  width: 65%;
  display: flex;
  flex-direction: column;
}
h1 {
  font-weight: 500;
  color: rgb(84, 192, 42);
  font-size: 40pt;
  font-family: "Rubik", sans-serif;
}
.inputan {
  margin-top: 20px;
}
.inputan1 {
  margin-top: 7.5px;
}
p {
  color: aliceblue;
  align-self: flex-end;
}
a {
  color: rgb(245, 192, 255);
}
a:hover {
  text-decoration: underline;
}
.oke {
  margin-top: 20px;
  align-self: flex-end;
}
.ooo {
  height: 150px;
  margin-top: 5px;
  margin-bottom: 8px;
}
.ooa {
  height: 500px;
}
.ooi {
  height: 150px;
  margin-top: 8px;
  margin-bottom: 8px;
}
.imgg {
  width: 50%;
  margin: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
