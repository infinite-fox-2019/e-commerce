<template>
  <div>
    <div v-for="cart in carts" :key="cart._id" class="cart-container">
      <Cart :cart="cart"></Cart>
    </div>
    <hr>
    <div>
      TOTAL:<br>
      <strong class="has-text-danger">IDR {{ totalPrice.toLocaleString() }}</strong>
    </div>
    <button class="button is-danger" style="margin: 20px;">CHECKOUT</button>
  </div>
</template>

<script>
import axios from '../helpers/axios'
import Cart from './Cart'

export default {
  name: 'CartsContent',
  data () {
    return {
      carts: []
    }
  },
  components: {
    Cart
  },
  created () {
    axios.get('/carts', {
      headers: {
        access_token: localStorage.access_token
      }
    })
      .then(({ data }) => {
        this.carts = data
      })
      .catch(err => {
        this.$store.commit('SET_ERR_MESSAGES', err)
      })
  },
  computed: {
    totalPrice () {
      let result = 0
      this.carts.forEach(cart => {
        let subtotal = cart.qty * cart.product.price
        result += subtotal
      })
      return result
    }
  }
}
</script>

<style scoped>
.cart-container {
  display: flex;
}
</style>
