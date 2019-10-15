<template>
  <div>
    <div class="container form-container">
      <div class="notification has-background-white">
        <form @submit.prevent="register">
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
              <input v-model="email" class="input" type="text" placeholder="Email">
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
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
            <button class="button is-danger">Sign Up</button>
          </div>
          <div class="control">
            <button class="button is-text">Log in</button>
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
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      this.axios.post('http://localhost:3000/users/register', {
        username: this.username,
        email: this.email,
        password: this.password
      })
        .then(({ data }) => {
          localStorage.access_token = data.access_token
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err.response)
        })
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
