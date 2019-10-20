<template>
  <div class="products">
    <section class="hero is-danger">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            MULTIVERSE
          </h1>
          <h2 class="subtitle">
            action figures of heroes
          </h2>
        </div>
      </div>
    </section>
    <div class="container products-container">
      <div class="notification has-background-white">
        <div class="columns is-multiline is-1">
          <div v-for="product in this.$store.state.products" :key="product.id" class="column is-one-fifth">
            <Product :product="product"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Product from '@/components/Product.vue'
// import Axios from 'axios'

export default {
  components: {
    Product
  },
  name: 'products',
  data () {
    return {
      products: ''
    }
  },
  methods: {
    getProducts () {
      this.$store.dispatch('getProducts')
    }
  },
  created () {
    this.getProducts()
  }
}
</script>

<style scoped>
  .products-container {
    max-width: 80%;
    margin-top: 20px;
    margin-bottom: 20px;
    box-shadow: 1px 1px 10px 0px #cccccc;
    padding: 10px;
  }

  .title {
    font-family: 'Anton', sans-serif;
    font-size: 50px;
  }

</style>
