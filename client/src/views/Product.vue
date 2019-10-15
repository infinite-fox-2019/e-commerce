<template>
<div>
  <div v-for="(product, _id) in products" :key="_id">
      <Cars :take-product='product' />
  </div>
</div>
</template>

<script>
import axios from 'axios';
import Cars from '../components/Cars';

export default {
    components:{
        Cars
    },
    data(){
        return {
            products: '',
        }
    },
    created(){
        const name = this.$route.params.name
        axios({
            method : 'get',
            url : `http://localhost:3000/products/${name}`
        })
            .then(({data})=>{
                console.log(data)
                this.products = data;
            })
            .catch(err=>{
                console.log(err);
            })
    }
}
</script>

<style scoped>
</style>