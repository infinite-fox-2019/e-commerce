<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <div id="list-product" v-for="item in products" :key="item._id">
      <Product :product="item"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import axios from '../../config/myaxios'
import Product from '@/components/Product'

export default {
  name: 'home',
  components: {
    // HelloWorld
    Product
  },
  data: function () {
    return {
      products: []
    }
  },
  methods: {
    fetchData () {
      axios({
        url: '/products',
        method: 'get'
      })
        .then(({ data }) => {
          this.products = data
        })
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<style>
  .home {
    display: flex;
    flex-direction: row;
    padding: 10px;
    margin: 5px;
    flex-wrap: wrap;
  }
</style>
