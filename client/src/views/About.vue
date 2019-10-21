<template>
  <div class="container">
    <div class="row">
      <div class="col-sm">
        <img :src="detail.picture" alt="" class="mx-auto d-block" style="width:100%; max-height:300px; object-fit: contain;">
        <div style="padding-top:10px">
          <h3>{{detail.title}}</h3>
        </div>
        <div>
          Stock: {{ detail.stock }} *estimated
        </div>
        <hr>
        <div class="row" style="padding: 15px">
          <h5>
            Description:
          </h5>
        </div>
        <div>
          &emsp; {{detail.description}}
        </div>
      </div>
      <div class="col-sm-3 bg-light">
        <div>
          <strong>Add to cart</strong>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelect01">Amount</label>
            </div>
            <select class="custom-select" id="inputGroupSelect01" v-model="amount">
              <option v-for="num in detail.stock" :key="num" :value="num">{{num}}</option>
            </select>
            <button class="btn btn-primary" @click.prevent="toCart(detail)">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      detail: '',
      amount: 1
    }
  },
  methods:{
    toCart(product){
      console.log(123);
      
      const productAmount = {
        product,
        amount: this.amount
      }
      this.$emit('toCart', productAmount)
    }
  },
  created(){
    const id = this.$route.params.id
    axios({
      method: 'get',
      url: `http://localhost:3000/products/${id}`
    })
      .then(({data})=>{
        this.detail = data
      })
      .catch(_=>{
        swal('error')
      })
  }
}
</script>

<style scoped>
</style>
