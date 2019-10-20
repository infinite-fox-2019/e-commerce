<template>

<div class="Main-Content">
    <header>
        <Header
        :email="email"
        :count="count"
        />
    </header>

    <main>

      <section class="jumbotron text-center">
        <div>
          <h1 class="jumbotron-heading">Welcome to HACKTIV8-COMMERCE </h1>
          <div v-if="role === 'admins'">
          <p class="lead text-muted">HAI Admin you can add your items by clicking this button.</p>
          <div class="d-flex justify-content-center">
            <a href="#" class="btn btn-light my-2"><router-link to="users/addProduct">Add Product</router-link></a>
          </div>
          </div>

        </div>
      </section>
        <div class="container-fluid">
                <MainContentComponent
                @usersPayload="usersPayload"
                @countFromMainChild="counter"
                />

        </div>

    </main>

    <footer>
        <Footer/>
    </footer>
</div>

</template>

<script>

import Header from '../components/Header'
import MainContentComponent from '../components/MainContentComponent'
import Footer from '../components/Footer'
export default {
  data () {
    return {
      role: '',
      email: '',
      count: ''
    }
  },
  components: {
    Header,
    MainContentComponent,
    Footer
  },
  methods: {
    usersPayload (payload) {
      this.role = payload.role
      this.email = payload.email
    },
    counter (data) {
      this.count = data
    }
  }
}
</script>

<style>

</style>
