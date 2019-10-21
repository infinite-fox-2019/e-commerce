<template>
  <div class="container">
    <div class="row">
      <div class="col-sm">
        <div class="row items">
          <div class="col-sm" v-for="product in pagination" :key="product._id" >
            <Card :product="product" @toCart="toCart" v-if="product.stock >0" @deleteProduct="deleteProduct" :status="status"/>
          </div>
          <h1 v-if="pagination.length <= 0">No Product Found</h1>
        </div>
          <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item" v-for="num in page" :key="num" @click.prevent="changePage(num-1)"><a class="page-link" href="#">{{ num }}</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
      </div>
      <div class="col-sm-4 bg-light">
        <form class="form-inline my-2 my-lg-0" style="padding:10px" @submit.prevent="searchProduct()">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="search">
          <a href="#detail">
            <button class="btn btn-outline-success my-2 my-sm-0">Search</button>
          </a>
        </form>
      </div>
    </div>
    <h3>Product id: {{ $route.params.id }}</h3>
    <div class="border" style="margin-top: 10px; margin-bottom: 20px">
      <router-view id="detail"
      @toCart="toCart"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from '@/components/Card.vue'

export default {
  name: 'home',
  data(){
    return{
      search: '',
      page: '',
      currentPage: 0
    }
  },
  components:{
    Card
  },
  methods:{
    toCart(obj){
      let products = []
      for(let i = 0; i<obj.amount; i++){
        products.push(obj.product)
      }
      this.$emit('toCart', products)
    },
    searchProduct(){
      this.$emit('searchProduct', this.search)
      this.currentPage = 0
    },
    changePage(page){
      this.currentPage = page
    },
    deleteProduct(id){
      this.$emit('deleteProduct', id)
    }
  },
  props: ['products', 'cart', 'status'],
  watch:{
    products(newValue){
      this.page = Math.ceil(this.products.length / 6)
    }
  },
  computed: {
    pagination(){
      const perPage = this.products.slice(0 + this.currentPage*6, this.currentPage*6+6)
      
      return perPage
    }
  },
  created() {
    this.page = Math.ceil(this.products.length / 6)
    this.$emit('getUser')
  }
}
</script>

<style scoped>
.items{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center
}
</style>
