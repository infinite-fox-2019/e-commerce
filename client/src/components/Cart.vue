<template>
  <div style="width: 100%;">
    <div class="columns">
      <div class="column">
        <figure class="image is-128x128">
          <img :src="cart.product.image" class="clickable-product" @click="toProduct(cart.product._id)">
        </figure>
      </div>
      <div class="column is-two-fifths" style="text-align: left;">
        <div class="rows-product-info">
          <div class="row-product-info clickable-product" @click="toProduct(cart.product._id)">
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
import axios from '../helpers/axios'
import swal from 'sweetalert'

export default {
  name: 'Cart',
  props: ['cart'],
  methods: {
    deleteCart () {
      swal({
        title: 'Delete this product?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            axios.delete(`/carts/${this.cart._id}`, {
              headers: {
                access_token: localStorage.access_token
              }
            })
              .then(({ data }) => {
                this.$emit('refreshCarts')
              })
              .catch(err => {
                this.$store.commit('SET_ERR_MESSAGES', err)
              })
          }
        })
    },
    toProduct (productId) {
      this.$router.push(`/products/${productId}`)
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
.clickable-product {
  cursor: pointer;
}
</style>
