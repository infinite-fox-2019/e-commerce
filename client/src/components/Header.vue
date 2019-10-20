<template>
    <div>
        <div class="collapse bg-dark" id="navbarHeader">
        <div class="container">
          <div class="row">
            <div class="col-sm-8 col-md-7 py-4">
              <h4 class="text-white">{{email}}</h4>
              <p class="text-muted">Hello, hope you can enjoy and find what you need in this website</p>
            </div>
            <div class="col-sm-4 offset-md-1 py-4">
              <h4 class="text-white">Your Cart</h4>
              <ul class="list-unstyled">
                <li><button class="btn btn-light"><a href="#" class="text-white"><router-link to="users/cart">To My Cart</router-link></a></button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar navbar-dark bg-dark box-shadow">
        <div class="container d-flex justify-content-between">
          <a href="#" class="navbar-brand d-flex align-items-center mr-auto">
            <img class="mr-3" src="https://image.flaticon.com/icons/svg/112/112548.svg" width="20" height="20">
            <strong>Hacktiv8-Commerce</strong>
          </a>
          <button type="button" class="btn btn-light mr-2">
            <router-link to="users/cart">
              <img class="mr-3" src="https://image.flaticon.com/icons/svg/126/126083.svg" width="20" height="20"><span class="badge badge-light">{{count}}</span>
            </router-link>

          </button>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
            <img src="https://image.flaticon.com/icons/svg/181/181549.svg" width="30" height="30"/>
          </button>

            <button @click="signOut" type="button" class="btn btn-warning ml-2">
            <router-link to="login">
              Sign Out
            </router-link>

          </button>

        </div>
      </div>
    </div>
</template>

<script>

export default {
  props: ['email', 'count'],
  data () {
    return {
      listProducts: []
    }
  },
  methods: {
    signOut () {
      localStorage.removeItem('token')
    }
  }
}
</script>

<style>

</style>
