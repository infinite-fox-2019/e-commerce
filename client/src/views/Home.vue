<template>
  <div class="home">
    <navbar @addSuccess="getProduct"/>
    <img alt="Vue logo" src="../assets/logo2.png">
    <img src="../assets/logotext.png" alt="">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-sm-6 my-4" v-for="product in productData" :key="product._id">
        <Product :product="product" @deleteSuccess="getProduct" @updateSuccess="getProduct"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import Product from '@/components/Product.vue'
import navbar from '../components/navbar'
export default {
  name: 'home',
  data () {
    return {
      productData: ''
    }
  },
  components: {
    Product, navbar
  },
  methods: {
    getProduct () {
      // console.log('masukkkkkkkk');

      axios({
        url: 'http://localhost:3000/products',
        method: 'get'
      })
        .then(({ data }) => {
          this.productData = data
        })
        .catch(console.log)
    }
  },
  created () {
    this.getProduct()
  }
}
</script>
