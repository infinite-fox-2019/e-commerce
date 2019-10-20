<template>
  <div>
    <div v-for="cart in carts" :key="cart._id" class="cart-container">
      <Cart :cart="cart" @refreshCarts="getCarts"></Cart>
    </div>
    <hr>
    <div v-if="carts.length > 0">
      TOTAL:<br>
      <strong class="has-text-danger">IDR {{ totalPrice.toLocaleString() }}</strong>
      <br>
      <button class="button is-danger" style="margin: 20px;">CHECKOUT</button>
    </div>
    <div v-else>
      <div>
        No Item
      </div>
      <button @click="toHome" class="button is-danger" style="margin: 20px;">SHOP NOW</button>
    </div>
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
  methods: {
    getCarts () {
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
    toHome () {
      this.$router.push('/')
    }
  },
  components: {
    Cart
  },
  created () {
    this.getCarts()
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
