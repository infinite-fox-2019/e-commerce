<template>
  <div class="card bg-light" style="width: 15rem; margin:20px;">
    <img class="card-img-top" :src="product.picture"  @click.prevent="toDetail(product._id)" style="cursor:pointer">
    <div class="card-body">
      <div class="d-flex justify-content-between">
        <h6 class="card-title"> {{ product.title }} </h6>
        <img src="../../public/trashIcon.png" style="width:24px; cursor:pointer" @click.prevent="deleteProduct(product._id)" v-if="status == 'admin'">
      </div>
      <p>Rp.{{ product.price }}</p>
      <button class="btn btn-primary" style="margin-right:10px" @click.prevent="toDetail(product._id)">Detail</button> 

      <b-button v-b-toggle="`${product._id}`" class="m-1 btn btn-primary">Buy now</b-button>

      <b-collapse :id="product._id">
        <div class="input-group mb-3 ">
          <select class="custom-select m-1" id="inputGroupSelect01" v-model="amount">
            <option v-for="(num) in product.stock" :key="num" :value="num">{{ num }}</option>
          </select>
          <b-button class="m-1 btn btn-primary" @click.prevent="toCart(product)">Add to cart</b-button>
        </div>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
export default {
  data(){
    return{
      amount: 1
    }
  },
  methods:{
    toDetail(id){
      // this.$router.push(`/`)
      this.$router.push(`/about/${id}`)
      console.log(123);
    },
    toCart(product){
      const productAmount = {
        product,
        amount: this.amount
      }
      this.$emit('toCart', productAmount)
    },
    deleteProduct(id){
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this product",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          this.$emit('deleteProduct', id)
        }
      });
    }
  },
  props:['product', 'status']
}
</script>

<style>

</style>