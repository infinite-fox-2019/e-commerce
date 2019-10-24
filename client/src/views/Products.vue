<template>
  <div class="container">
    <div class="products row">
        <div class="product col-4" v-for="product in products" :key="product._id">
          <b-card
            :title="product.name"
            :img-src="product.image"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
          <b-card-text>
            <p class="desc">{{ product.desc }}</p>
          </b-card-text>
          <!-- <b-card-text>
            Price: {{ product.price }}
          </b-card-text>
          <b-card-text>
            Stock: {{ product.stock }}
          </b-card-text> -->
          <b-button href="#" variant="success" v-if="getrole === 'admin'">Update</b-button>
          <deleteproduct v-if="getrole === 'admin'" :id="product._id"></deleteproduct>
          <b-button href="#" variant="primary" v-else>Add to Cart</b-button>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import deleteproduct from '../components/deleteproduct'

export default {
  name: 'Products',
  components: {
    deleteproduct
  },
  computed: {
    getrole: function () {
      return this.$store.state.role
    },
    products: function () {
      return this.$store.state.products
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$store.commit('login', { name: localStorage.getItem('name'), role: localStorage.getItem('role') })
    }
    this.$store.dispatch('getproducts')
  }
}
</script>

<style>
.desc{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
img{
  max-height: 20rem;
}
</style>
