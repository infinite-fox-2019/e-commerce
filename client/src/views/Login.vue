<template>
    <div>
        <nav-bar></nav-bar>
        <form action="" id="login" class="card container" style="background-color: teal" @submit.prevent="login()">
            <div class="form-group">
                <h4>Selamat Datang !</h4>
                <label for="email" class="card-text">E-mail</label>
                <br>
                <input type="text" name="email" placeholder="Insert your email !" v-model="email" >
            </div>
            <div class="form-group">
                <label for="password" class="card-text">Password</label>
                <br>
                <input type="password" name="password" placeholder="Insert your password !" v-model="password">
                <br>
                <button class="btn btn-primary" type="submit" style="max-width:30%">login</button>
            </div>
        </form>
    </div>
</template>

<script>
import NavBar from '../components/NavBar'
export default {
  name: 'login',
  components: {
    NavBar
  },
  data: () => {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      let payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<style>
#login{
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    max-width: 400px;
    padding: 20px;
    margin-top: 10px;
}
</style>
