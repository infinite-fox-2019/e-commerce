<template>
  <div>
      <h1>THIS IS Products Page</h1>
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
  align-items: start;
  justify-content: space-between;
}
</style>
