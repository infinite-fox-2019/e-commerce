<template>
  <a-layout id="components-layout-demo-fixed">
    <Navbar></Navbar>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">

      <div :style="{ background: '#fff', padding: '24px', minHeight: '380px'}">
        <h1>Choose what you need</h1>
         <div id="card">
          <a-row type="flex" justify="start" align="middle">
            <Card style="margin: 10px" v-for="product in filteredProduct" :key="product.id" :product='product' @created='getProduct'></Card>
          </a-row>
        </div>
      </div>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar'
import Card from '@/components/Cards'
import { mapState } from 'vuex'

export default {
  name: 'home',
  data (){
    return {
      products : [],
      searching : ''
    }
  },
  components : {
    Navbar,
    Card
  },
  methods : {
    querySearch(search){
      console.log(search)
    },
    getProduct(){
      this.$store.dispatch('getProducts')
      .then(()=>{
        console.log('ini dari home')
        this.products = this.$store.state.products.data
        console.log(this.products)
      })
    }
  },
  computed: {
    // console.log($store.state.search);
    // ...mapState(['search']),
    filteredProduct: function ( ) {
      let cari = this.$store.state.search
      return this.products.filter((product)=>{
        return product.name.match(cari)
      })
    }
  },
  watch : {
    // search(value){
      // console.log(value,'ini dari home')
    //   this.searching = value
    // }
  },
  created(){
    this.$store.dispatch('getProducts')
      .then(()=>{
        this.products = this.$store.state.products.data
      })
    this.$store.dispatch('getStatus')
  }
}
</script>

<style>
#card{
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
