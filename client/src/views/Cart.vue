<template>
  <div class="container" style="margin-top:10px">
    <div class="d-flex justify-content-between">
      <div>
        <h3>Cart:</h3>
      </div>
      <div v-if="cart.length > 0">
        <button class="btn btn-primary" @click.prevent="checkout()">Checkout</button>
        <button class="btn btn-danger" style="margin-left:10px" @click.prevent="deleteAllCart()">Delete all cart</button>
      </div>
    </div>
    <ul class="list-group">
      <h2 v-if="cart.length <= 0">Your cart is empty</h2>
      <li class="list-group-item" v-for="(item, index) in cart" :key="index" :id="index">
        <div class="media">
          <img :src="item.picture" class="mr-3" alt="..." style="width:64px">
          <div class="media-body d-flex justify-content-between align-items-center w-100">
            <div class="">
              <h5 class="mt-0">{{ item.title }} <img src="../../public/trashIcon.png" style="width:32px" @click.prevent="deleteCart(index)"> </h5>
              <p>
              {{item.description}}
              </p>
            </div>
            <strong> Rp.{{item.price}} </strong>
          </div>
        </div>
      </li>
      <li class="list-group-item d-flex justify-content-between" v-if="cart.length > 0">
        <h4>Total</h4>
        <h4>{{ totalPrice }}</h4>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  // name: 'cart',
  methods:{
    deleteCart(index){
      this.$emit('deleteCart', index)
    },
    deleteAllCart(){
      this.$emit('deleteAllCart')
    },
    checkout(){
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          let axiosAll = []
          for(let i = 0; i<this.cart.length; i++){
            console.log(this.cart[i]._id);
            
            axiosAll[i] = ()=>{
              return axios({
                method: 'patch',
                url: `http://ecommerce-server.indraaditya.online/products/buy/${this.cart[i]._id}`
              })
            }
          }
          axiosAll.forEach(fn=>{
            fn()
          })
          this.$emit('checkout')
        }
      });
    }
  },
  props: ['cart'],
  computed: {
    totalPrice(){
      let total = 0
      this.cart.forEach(item=>{
        total += item.price
      })
      return `Rp.${total}`
    }
  },
  created(){
    this.$emit('getUser')
  }
}
</script>

<style>

</style>
