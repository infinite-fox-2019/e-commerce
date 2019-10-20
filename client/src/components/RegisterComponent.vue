<template>
    <div class="text-center signin mt-5 mb-5">
        <button class="btn btn-link"> <router-link to="login">back</router-link></button>
      <form class="form-signReg">
          <img class="mb-4" src="https://image.flaticon.com/icons/svg/112/112548.svg" alt="" width="72" height="72">
          <h1 class="h3 mb-3 font-weight-normal">Register</h1>
          <label for="registEmail" class="sr-only">Email address</label>
          <input v-model="emailRegis" type="email" id="registEmail" class="form-control" placeholder="Email address" required autofocus>
          <label for="registPassword" class="sr-only">Password</label>
          <input v-model="passwordRegis" type="password" id="registPassword" class="form-control" placeholder="Password" required>
          <p class="err text-success">{{successRegis}}</p>
          <p class="err text-danger">{{regisErr}}</p>
          <button v-on:click.prevent="register()" class="btn btn-lg btn-primary btn-block" type="submit">Register !</button>
          <p class="mt-5 mb-3 text-muted">&copy; 2019</p>
        </form>
    </div>
</template>

<script>
export default {
  props: ['successRegis', 'regisErr'],
  data () {
    return {
      emailRegis: '',
      passwordRegis: ''
    }
  },
  methods: {
    register () {
      this.$emit('inputedEmailPassword', this.emailRegis, this.passwordRegis)
    }
  }

}

</script>

<style>

</style>
