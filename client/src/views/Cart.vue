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
        <router-link to="/product/allProduct"  id="btnleft" class="btn btn-primary" style="color:white;">All Product</router-link>
    </template>
  </nav-bar-store>
  <Cart></Cart>
</div>
</template>

<script>
import NavBarStore from '../components/NavBarStore'
import Cart from '../components/Cart'
import router from '../router'
export default {
  name: 'customer',
  components: {
    NavBarStore,
    Cart
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
  margin-left: 30px;
}
</style>
