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
          <div @click="showAdmin" class="admin-show-link is-text-reddish">
            Register as admin?
          </div>
          <div v-if="isAdmin" class="field">
            <div class="control has-icons-left has-icons-right">
              <input v-model="admin_password" class="input" type="password" placeholder="Admin Password">
              <span class="icon is-small is-left">
                <i class="fas fa-key"></i>
              </span>
            </div>
          </div>
          <div class="control">
            <button class="button is-danger">Sign Up</button>
          </div>
          <div class="control">
            <button @click="showLogin" class="button is-text">Log in</button>
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
      password: '',
      admin_password: '',
      isAdmin: false
    }
  },
  methods: {
    register () {
      let payload = {
        username: this.username,
        email: this.email,
        password: this.password,
        admin_password: this.admin_password
      }
      this.$store.dispatch('register', payload)
    },
    showAdmin () {
      this.isAdmin = true
    },
    showLogin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
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

.admin-show-link {
  margin-bottom: 10px;
  float: right;
  text-decoration: none;
  text-decoration-style: none;
}

.admin-show-link {
  cursor: pointer;
}

.is-text-reddish {
  color: #f73737;
}
</style>
