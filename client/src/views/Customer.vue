<template>
<div>
  <nav-bar-store>
    <template v-slot:signout>
        <button class="btn btn-danger" @click="signOut">
            Signout
        </button>
    </template>
    <template v-slot:cart>
        <router-link to="/customer/cart" class="btn btn-primary" style="color:white;">Cart</router-link>
    </template>
    <template v-slot:allProduct>
        <router-link to="/product/allProduct" class="btn btn-primary" style="color:white;" id="btnleft">All Product</router-link>
    </template>
  </nav-bar-store>
  <list-product-customer></list-product-customer>
</div>
</template>

<script>
import NavBarStore from '../components/NavBarStore'
import ListProductCustomer from '../components/ListProductCustomer'
import router from '../router'
export default {
  name: 'customer',
  components: {
    NavBarStore,
    ListProductCustomer
  },
  methods: {
    signOut () {
      localStorage.clear()
      router.push('/login')
    }
  }
}
</script>

<style>
.btn {
  margin: 10px;
  padding: 10px;
}
#btnleft {
  margin: 20px;
}
</style>
