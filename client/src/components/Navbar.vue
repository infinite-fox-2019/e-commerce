<template>
    <div>
        <div>
            <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand @click="getProducts()" href="#">ShonenPlays - YGO</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav >
                <b-button class="buttons" v-if="!isLogin" variant="success" router-link to="/login"><strong> Login</strong></b-button>
                <b-button class="buttons" v-if="!isLogin" variant="danger" router-link to="/register"><strong>Register</strong></b-button>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
            <b-nav-form @submit.prevent="getProperProducts()">
            <b-form-input size="sm" class="mr-sm-2" v-model="searchInput" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0 buttons" type="submit">Search</b-button>
            <b-button @click="getCart()" v-if="!isAdmin" class="buttons" variant="info"><i class="fas fa-shopping-cart"></i> <strong>Cart</strong></b-button>
            <b-button @click="displayTransaction" v-if="!isAdmin && isLogin && transNav" class="buttons" variant="primary"><strong>Transaction</strong></b-button>
            <b-button @click="logout()" v-if="isLogin" class="buttons" variant="warning"><strong>Logout</strong></b-button>
            </b-nav-form>

            </b-navbar-nav>
            </b-collapse>
            </b-navbar>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import { mapState, mapActions } from 'vuex';

export default {
  name: 'navbar',
  props: ['checktoken', 'search', 'getProducts', 'getCart', 'onCart', 'checkAdmin', 'isAdmin', 'updateTransaction', 'checkout', 'displayTransaction', 'transNav'],
  data () {
    return {
      searchInput: '',
      searchedData: []
    }
  },
  computed: {
  ...mapState([
      'isLogin',
  ])
  },
  
  methods: {
    logout () {
      this.$router.push('/login')
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      localStorage.removeItem('role')
      Swal.fire(
        'Logged out',
        `See you again!`,
        'success'
      )
    },
    getProperProducts () {
      if (this.searchInput === '') {
        this.getProducts()
      } else {
        this.search(this.searchInput)
      }
    }
  },
  created () {
    this.checktoken()
  }

}
</script>

<style>
.buttons {
    margin: 5px;
    font-weight: bold;
}
</style>
