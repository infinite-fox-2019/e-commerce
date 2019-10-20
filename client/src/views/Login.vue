<template>
  <div class="login">
    <LoginComponent
    @loginEvent="loginProcess"
    :successLogin="successLogin"
    :errLogin="errLogin"
    />
  </div>
</template>

<script>
import axios from '../myAxios/axios'
import LoginComponent from '../components/LoginComponent'

export default {
  name: 'Login',
  data () {
    return {
      emailLogin: '',
      passwordLogin: '',
      errLogin: '',
      successLogin: ''
    }
  },
  components: {
    LoginComponent
  },
  methods: {
    loginProcess (email, password) {
      this.emailLogin = email
      this.passwordLogin = password
      this.login()
    },
    login () {
      axios.post('/login', {
        email: this.emailLogin,
        password: this.passwordLogin
      })
        .then(({ data }) => {
          console.log('MASUK KAH')
          console.log(data)
          localStorage.setItem('token', data.token)
          this.errLogin = ''
          this.successLogin = 'Success Login'
          this.$router.push('/users')
        })
        .catch(err => {
          this.successLogin = ''
          this.errLogin = err.response.data.message
        })
    }
  }
}
</script>

<style>

</style>
