<template>
 <div class="container">
      <div v-if="getTotal">
            <h1>Cart</h1>
        <div class="d-flex justify-content-between align-items-center">
            <p>Product</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Subtotal</p>
                <p>Action</p>
        </div>
        <CartCard v-for="cart in carts" :key="cart._id" :cart="cart"/>
        <div class="total d-felx flex-column">
            <p >Total: ${{ getTotal }}.00</p>
            <button @click.prevent="checkout" class="btn btn-secondary w-25">Checkout</button>
        </div>
      </div>
      <div v-else>
          <h1>CART IS EMPTY</h1>
      </div>
 </div>
</template>

<script>
import CartCard from '@/components/CartCard.vue'
import { mapState } from 'vuex'

export default {
  components: {
    CartCard
  },
  methods: {
    checkout () {
      this.$store.dispatch('checkout')
      this.$router.push(`/transactions`)
    }
  },
  computed: {
    getTotal () {
      let result = 0
      this.carts.forEach(el => {
        result += el.subTotal
      })
      return result
    },
    ...mapState(['carts'])
  },
  created () {
    this.$store.dispatch('getCarts')
  }
}
</script>

<style>
.total{
    text-align: right;
    font-size: 50px;
    width: 100%;
    margin-bottom: 50px;
}
</style>
