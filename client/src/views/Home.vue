<template>
  <div class="mx-auto mt-10 p-8 flex justify-center flex-wrap">
    <div v-if="toLogin" class="w-full max-w-lg">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Email
          </label>
          <input v-model="user.email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Password
          </label>
          <input v-model="user.password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password">
        </div>
        <div class="flex flex-wrap justify-center">
          <button class="bg-blue-500 hover:bg-blue-700 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click.prevent="login">
                Login
          </button>
          <hr>
          <div class="m-2 p-2"><a href="" @click.prevent="toRegister">Don't have account? Register instead.</a></div>
          </div>
      </form>
    </div>
    <div v-else class="w-full max-w-xs">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                Name
          </label>
          <input v-model="user.name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                Email
          </label>
          <input v-model="user.email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Password
          </label>
          <input v-model="user.password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password">
        </div>
        <div class="flex flex-wrap justify-center">
          <button class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click.prevent="register">
                Register
          </button>
          <a class="m-2 p-2" href="" @click.prevent="goLogin">Have an account already? Login please.</a>
          </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      toLogin: true,
      user: { name: '', email: '', password: '' }
    }
  },
  methods: {
    toRegister () {
      this.toLogin = false
    },
    goLogin () {
      this.toLogin = true
    },
    login () {
      this.$store.dispatch('login', { email: this.user.email, password: this.user.password })
    },
    register () {
      this.$store.dispatch('register', { name: this.user.name, password: this.user.password, email: this.user.email })
      this.$router.push('/products')
    }
  }
}
</script>
