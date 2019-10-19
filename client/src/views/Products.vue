<template>
  <div>
      <div class="container-product">
        <Card v-for="product in products" :key="product._id" :product="product"/>
      </div>
  </div>
</template>

<script>
import Card from '../components/Card'
export default {
  components: {
    Card
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  created () {
    return this.$store.dispatch('fetchProducts')
  }
}
</script>

<style>
.container-product {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
}
</style>
