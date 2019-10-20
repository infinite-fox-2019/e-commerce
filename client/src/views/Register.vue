<template>
  <div class="register">
    <RegisterComponent
    @inputedEmailPassword="regisProcess"
    :successRegis="successRegis"
    :regisErr="regisErr"
    />
  </div>
</template>

<script>

import axios from '../myAxios/axios'
import RegisterComponent from '@/components/RegisterComponent'

export default {
  name: 'Register',
  data () {
    return {
      emailRegis: '',
      passwordRegis: '',
      regisErr: '',
      successRegis: ''
    }
  },
  components: {
    RegisterComponent
  },
  methods: {
    regisProcess (email, password) {
      this.emailRegis = email
      this.passwordRegis = password
      this.register()
    },
    register () {
      axios.post('/register', {
        email: this.emailRegis,
        password: this.passwordRegis
      })
        .then(data => {
          console.log('MASUK KAH')
          console.log(data)
          this.regisErr = ''
          this.successRegis = 'Success Register'
        })
        .catch(err => {
          this.successRegis = ''

          this.regisErr = err.response.data.message.join('\n')
          // console.log(this.regisErr)
        })
    }
  }
}
</script>

<style>

</style>
