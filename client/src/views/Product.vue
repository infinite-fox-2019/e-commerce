<template>
<div class='mainCars'>
    <div class="containner">
        <div class="loop" v-for='(product, i) in products' :key='i'>
            <Cars :get-product='product'/>
        </div>
    </div>
    <router-view 
        />
</div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert2';
import Cars from '../components/Cars';
export default {
    components:{
        Cars
    },
    data(){
        return {
            products: '',
            id: ''
        }
    },
    methods: {
        getId(id){
            this.id = ''
            this.id = id
            console.log(id)
        }
    },
    created(){
        const name = this.$route.params.name
        let promise = axios({
            method : 'get',
            url : `http://localhost:3000/products/${name}`,
            headers: {
                token: localStorage.getItem('token')
            }
        })
            .then(({data})=>{
                this.products = data;
                this.$awn.success('Getting Product')
            })
            .catch(err=>{
                this.$awn.warning(err.response.data.msg)
                swal.fire({
                    type: 'warning',
                    title: err.response.data.msg,
                    text: 'Please Login first :)'
                })
                this.$router.push('/login')
            })
    },
    watch: {
        id(val){
            this.id=val
        }
    }
}
</script>

<style scoped>

/* OTHER */
.containner {
  width: 100%;
  overflow: auto !important;
  justify-content: center;
  align-content: center;
  align-items: center;
  
  display: flex;
  flex-wrap: wrap;
  
  background-color:transparent;
  color: white;
}
</style>