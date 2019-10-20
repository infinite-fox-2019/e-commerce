<template>
  <div class="">
      <nav-bar></nav-bar>
    <form action="" id="register" class="container" style="background-color: teal; height: 400px" @submit.prevent="register()">
        <div class="form-group">
            <h4>Selamat Datang !</h4>
            <label for="name" class="card-text">Name</label>
            <br>
            <input type="text" name="name" placeholder="Insert your name !" v-model="name">
        </div>
        <div class="form-group">
            <label for="email" class="card-text">E-mail</label>
            <br>
            <input type="text" name="email" placeholder="Insert your email !" v-model="email" >
        </div>
        <div class="form-group">
            <label for="password" class="card-text">Password</label>
            <br>
            <input type="password" name="password" placeholder="Insert your password !" v-model="password">
        </div>
        <div class="form-group">
            <label for="role" class="card-text">Role</label>
            <br>
            <select v-model="role">
                <option>Buyer</option>
                <option>Seller</option>
            </select>
            <br>
            <button class="btn btn-primary" type="submit" style="max-width:30%">Register</button>
        </div>
    </form>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
export default {
  name: 'register',
  components: {
    NavBar
  },
  data: () => {
    return {
      name: '',
      email: '',
      password: '',
      role: ''
    }
  },
  methods: {
    register () {
      let payload = {
        name: this.name,
        password: this.password,
        email: this.email,
        role: this.role
      }
      this.$store.dispatch('register', payload)
      this.name = ''
      this.password = ''
      this.email = ''
      this.role = ''
    }
  }
}
</script>

<style>
#register{
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    max-width: 400px;
    padding: 20px;
    margin-top: 10px;
}
</style>
