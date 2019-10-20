<template>
  <div>
    <div class="container form-container">
      <div class="notification has-background-white">
        <form @submit.prevent="login">
          <div class="spidey-container">
            <div>
              <img src="https://i.imgur.com/oKxJwVk.png">
            </div>
            <div>
              Dive into the multiverse!
            </div>
          </div>
          <div class="field">
            <div class="control has-icons-left has-icons-right" type="is-danger">
              <input v-model="username" class="input" type="text" placeholder="Username / Email">
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

<script scoped>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      let payload = {
        username: this.username,
        password: this.password
      }
      this.$store.dispatch('login', payload)
    },
    showSignup () {
      this.$router.push('/register')
    }
  }
}
</script>

<style>
.form-container {
  max-width: 400px;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: 1px 1px 10px 0px #d1d1d1;
}

button {
  width: 100%;
  margin-top: 5px;
}

img {
  height: 128px;
  float: left;
  margin-bottom: 5px;
}

.spidey-container{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
