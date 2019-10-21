<template>
  <div style="margin: 20px auto;">
      <div class="container flex flex-wrap items-start justify-center" style="margin:0 auto;">
        <Card v-for="product in products" :key="product._id" :product="product" class="w-1/3"/>
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
</style>
