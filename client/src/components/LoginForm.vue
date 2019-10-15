<template>
  <div>
    <div class="container form-container">
      <div class="notification has-background-white">
        <form @submit.prevent="login">
          <div class="field">
            <div class="control has-icons-left has-icons-right">
              <input v-model="username" class="input" type="text" placeholder="Username">
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
          </div>
          <div class="field">
            <div class="control has-icons-left has-icons-right">
              <input v-model="password" class="input" type="password" placeholder="Password">
              <span class="icon is-small is-left">
                <i class="fas fa-key"></i>
              </span>
            </div>
          </div>
          <div class="control">
            <button class="button is-danger">Log in</button>
          </div>
          <div class="control">
            <button @click="showSignup" class="button is-text">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    showAlert (err) {
      console.log(err)
      let messages = ''
      console.log(err.response.data)
      err.response.data.messages.forEach(message => {
        messages += message + '<br>'
      })
      this.$notify({
        group: 'alert-error',
        title: messages,
        type: 'error'
      })
    },
    login () {
      this.axios.post('http://localhost:3000/users/login', {
        username: this.username,
        password: this.password
      })
        .then(({ data }) => {
          localStorage.userId = data.id
          localStorage.username = data.username
          localStorage.access_token = data.access_token
          this.$router.push('/')
        })
        .catch(this.showAlert)
    },
    showSignup () {
      this.$router.push('/register')
    }
  }
}
</script>

<style>
.form-container {
  max-width: 30%;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: 1px 1px 10px 0px #cccccc;
}

button {
  width: 100%;
  margin-top: 5px;
}
</style>
