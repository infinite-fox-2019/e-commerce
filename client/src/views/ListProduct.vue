<template>
  <div class="box-product">
    <p class="title">All Products</p>
      <div class="container box">
          <div v-for="(product, i) in products" :key="i" class="row">
              <CardProduct :product="product" class="card"></CardProduct>
          </div>
      </div>
  </div>
</template>

<script>
import CardProduct from './CardProduct'

export default {
  name: 'ListProduct',
  components: {
    CardProduct
  },
  data () {
    return {
    }
  },
  computed: {
    products: {
      get () {
        return this.$store.state.dataProduct
      }
    }
  },
  watch: {
    products () {}
  },
  created () {
    this.$store.dispatch('getProduct')
  }
}
</script>
<style scoped>
.box-product {
    margin-top: 50px;
    margin-left: 10%;
    margin-right: 10%;
    margin-bottom: 50px;
}
.container {
    display: flex ;
    flex-wrap: wrap;
    justify-content: space-around;
}
.card {
    margin-top: 100px;
    height: 430px;
    width: 300px;
    overflow: hidden;
    margin: 20px;
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
