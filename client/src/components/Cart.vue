<template>
  <div style="width: 100%;">
    <div class="columns">
      <div class="column">
        <figure class="image is-128x128">
          <img :src="cart.product.image">
        </figure>
      </div>
      <div class="column is-two-fifths" style="text-align: left;">
        <div class="rows-product-info">
          <div class="row-product-info">
            {{ cart.product.name }}
          </div>
          <div class="row-product-info has-text-grey">
            <small>IDR {{ cart.product.price.toLocaleString() }}</small>
          </div>
        </div>
        <button class="button" @click="deleteCart">
          <i class="fa fa-trash"></i>
        </button>
      </div>
      <div class="column">
        qty: {{ cart.qty }}
      </div>
      <div class="column is-two-fifths">
        <strong class="has-text-danger">{{ subtotal }}</strong>
      </div>
    </div>

  </div>
</template>

<script>
// import axios from '../helpers/axios'

export default {
  name: 'Cart',
  props: ['cart'],
  methods: {
    deleteCart () {
    }
  },
  computed: {
    subtotal () {
      return `IDR ${(this.cart.product.price * this.cart.qty).toLocaleString()}`
    }
  }
}
</script>

<style scoped>
.rows-product-info{
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
</style>
