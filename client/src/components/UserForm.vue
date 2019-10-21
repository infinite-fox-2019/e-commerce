<template>
  <v-row justify="center" class="user-form" v-if="showUserForm">
    <v-card>
      <v-card-title>
        <span class="headline" v-if="!showRegister">User login</span>
        <span class="headline" v-if="showRegister">User register</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Username*" required v-if="showRegister" v-model="user.username"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Email*" required v-model="user.email"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Password*" type="password" required v-model="user.password"></v-text-field>
            </v-col>
          </v-row>
          <div v-if="errorToasts.showLoginError">
            <div style="color:red" v-for="(error,i) in errors.login" :key="i">
              {{ error }}
            </div>
          </div>
          <div v-if="errorToasts.showRegisterError">
            <div style="color:red" v-for="(error,i) in errors.register" :key="i">
              {{ error }}
            </div>
          </div>
        </v-container>
        <small>*indicates required field</small>
        <div class="mt-2" v-if="!showRegister">
          Actually I don't have an
          <a href @click.prevent="showRegisterForm">account</a>
        </div>
        <div class="mt-2" v-if="showRegister">
          I have an account
          <a href @click.prevent="hideRegisterForm">login</a>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="hideUserFormSignIn">Close</v-btn>
        <v-btn color="blue darken-1" text @click="login(user)" v-if="!showRegister">Login</v-btn>
        <v-btn color="blue darken-1" text @click="register(user)" v-if="showRegister">Register</v-btn>
      </v-card-actions>
    </v-card>
  </v-row>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data: function () {
    return {
      showRegister: false,
      user: {
        username: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    showRegisterForm: function () {
      this.showRegister = true
      this.hideError('login')
      this.clearErrors('login')
    },
    hideRegisterForm: function () {
      this.showRegister = false
      this.hideError('register')
      this.clearErrors('register')
    },
    ...mapMutations(['hideUserFormSignIn', 'hideError', 'clearErrors']),
    ...mapActions(['login', 'register'])
  },
  computed: {
    ...mapState(['showUserForm', 'errors', 'errorToasts'])
  }
}
</script>

<style scoped>
.user-form {
  position: fixed;
  z-index: 50;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
}
</style>
