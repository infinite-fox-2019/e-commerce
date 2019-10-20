<template>
    <div class="text-center signin mt-5 mb-5">
        <form class="form-signReg">
          <img class="mb-4" src="https://image.flaticon.com/icons/svg/112/112548.svg" alt="" width="72" height="72">
          <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label for="loginEmail" class="sr-only">Email address</label>
          <input v-model="emailLogin" type="email" id="loginEmail" class="form-control" placeholder="Email address" required autofocus>
          <label for="loginPassword" class="sr-only">Password</label>
          <input v-model="passwordLogin" type="password" id="loginPassword" class="form-control" placeholder="Password" required>
          <p class="err text-danger">{{errLogin}}</p>
          <p class="success text-success">{{successLogin}}</p>
          <div class="d-flex-justify-content-center">
            <p> Not a member?</p>
            <p class="btn btn-link"><router-link to ="/register">Register Here!</router-link></p>
          </div>
          <button v-on:click.prevent="login()" class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          <br>
          <p class="mt-5 mb-3 text-muted">&copy; 2019</p>
        </form>

      </div>
</template>

<script>
export default {
  props: ['successLogin', 'errLogin'],
  data () {
    return {
      emailLogin: '',
      passwordLogin: ''
    }
  },
  methods: {
    login () {
      this.$emit('loginEvent', this.emailLogin, this.passwordLogin)
    }
  }
}
</script>

<style>

</style>
