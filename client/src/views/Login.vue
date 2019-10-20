<template>

  <b-container class="h-100">
    <b-row class="h-100 justify-content-center align-items-center">
      <b-col cols="8" style="margin-top:25vh">
          <p class="h1 mb-4" style="font-weight:bold;">Login Here...</p>
          <b-form @submit.prevent="login" @reset="onReset" v-if="show">
            <b-form-group
              id="input-group-1"
              label="Email address:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                required
                placeholder="Enter email"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Password:" label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="form.password"
                required
                placeholder="Enter password"
                type="password"
              ></b-form-input>
            </b-form-group>

            <div class="mt-4">
              <b-button type="submit" class="mr-2" variant="primary">Login</b-button>
              <b-button type="reset" class="mr-2" variant="danger">Reset</b-button>
              <router-link to="/register"><b-button class="mr-2" variant="secondary">Register</b-button></router-link>
            </div>

          </b-form>

      </b-col>
    </b-row>
  </b-container>

</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      show: true
    }
  },
  methods: {
    login () {
      console.log('login')
      console.log(this.form.password)
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/login',
        data: {
          email: this.form.email,
          password: this.form.password
        }
      })
        .then(({ data }) => {
          console.log(data)
          localStorage.setItem('token', data.token)
          if (data.role === 'admin' || data.role === 'superadmin') {
            this.$emit('adminStatus', true)
            localStorage.setItem('admin', data.role)
          }
          this.$emit('loginStatus', true)
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.password = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style scoped>
  body,html{
    height:100%;
  }
</style>
