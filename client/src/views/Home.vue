<template>
  <div class="home">
      <!-- <Brand :products='fetchData' />  -->
      <b-carousel
        id="carousel-fade"
        style="text-shadow: 0px 0px 2px #000"
        fade
        indicators
      >
    <div v-for="(brand, _id) in fetchData" :key='_id'>
      <Brand 
        :import-product='brand'
        />
    </div>
  </b-carousel>
  </div>
</template>

<script>
// @ is an alias to /src
import Brand from '../components/Brand';
import axios from 'axios'

export default {
  name: 'home',
  data(){
      return{
        fetchData: '',
        getIdtoProduct: ''
      }
  },
  components: {
    Brand
  },
  methods: {
  },
  created(){
      axios({
          method : 'get',
          url: 'http://localhost:3000/brands'
      })
      .then(({data})=>{
        this.$awn.success('Fetching Data')
        this.fetchData = data
      })
      .catch(console.log)
  }
}
</script>

<style scoped>
.home{
  height:250px !important;
}
</style>
