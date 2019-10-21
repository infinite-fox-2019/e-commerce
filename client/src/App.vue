<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm p-3 bg-white rounded" style="padding: 10px" v-show="!showLogin">
      <router-link to="/" class="navbar-brand"><img src="../public/logo.jpg" width="128" height="64" alt=""></router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto" >
          <li class="nav-item active">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
        </ul>
        <ul class="navbar-nav my-2 my-lg-0 form-inline" >
          <li class="nav-item active">
            <router-link to="/cart" class="nav-link">Cart <span class="badge badge-primary">{{ cart.length }}</span> </router-link>
          </li>
          <li class="nav-item active">
            <b-dropdown id="dropdown-1" :text="user" class="m-md-2">
              <b-dropdown-item @click.prevent="logout()">Logout</b-dropdown-item>
              <div v-if="status == 'admin'">
                <b-dropdown-item @click.prevent="addAdmin()">Add new admin</b-dropdown-item>
                <b-dropdown-item @click.prevent="addProduct()">Add product</b-dropdown-item>
              </div>
            </b-dropdown>
          </li>
        </ul>
      </div>
    </nav>
    <router-view 
    @toCart="addCart" 
    :products="products"
    :cart="cart"
    :status="status"
    @deleteCart="deleteCart"
    @searchProduct="searchProduct"
    @login="login"
    @getUser="getUser"
    @deleteAllCart="deleteAllCart"
    @checkout="checkout"
    @deleteProduct="deleteProduct"/>
  </div>
</template>

<script>
import axios from 'axios'
import jwt from 'jsonwebtoken'

export default {

  data () {
    return {
      showLogin: true,
      products : [],
      cart: [],
      user: '',
      status: ''
    }
  },
  methods: {
    fetchData(){
      axios({
        method: 'get',
        url: 'http://ecommerce-server.indraaditya.online/products'
      })
        .then(({data})=>{
          this.products = data
        })
        .catch(err=>{
          console.log(err);
          console.log('app/fetchData');
        })
    },
    addCart(products){
      let axiosAll = []
      const token = localStorage.getItem('token')
      for(let i = 0; i<products.length; i++){
        this.cart.push(products[i])
        axiosAll[i] = function(){
          return axios({
            method: 'post',
            url: 'http://ecommerce-server.indraaditya.online/users/cart',
            data: {
              productId: products[i]
            },
            headers: {'access_token': token}
          })
        }
      }
      console.log(axiosAll);
      axiosAll.forEach(fn=>{
        fn()
      })
    },
    getUser(){
      const token = localStorage.getItem('token')
      const user = jwt.verify(token, 'secret')
      // console.log(user);
      

      axios({
        method: 'get',
        url: `http://ecommerce-server.indraaditya.online/users/${user.id}`
      })
        .then(({data})=>{
          console.log(data);
          
          this.cart = data.cart
          this.status = data.status
        })
    },
    deleteCart(index){
      swal({
        title: "Are you sure?",
        text: "Are you sure want to delete this item?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        this.cart.splice(index, 1)
        const token = localStorage.getItem('token')
        const user = jwt.verify(token, 'secret')
        if (willDelete) {
          return axios({
            method: 'patch',
            url: `http://ecommerce-server.indraaditya.online/users/cart/${user.id}`,
            data: {
              cart : this.cart
            }
          })
        }
      })
      .then(({data})=>{
        swal('Deleted', 'your item deleted succesfully','success')
      })
    },
    deleteAllCart(){
      swal({
        title: "Are you sure?",
        text: "Are you sure want to delete all cart?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        this.cart = []
        const token = localStorage.getItem('token')
        const user = jwt.verify(token, 'secret')
        if (willDelete) {
          return axios({
            method: 'patch',
            url: `http://ecommerce-server.indraaditya.online/users/cart/${user.id}`,
            data: {
              cart : this.cart
            }
          })
        }
      })
      .then(({data})=>{
        swal('Deleted', 'your item deleted succesfully','success')
      })
    },
    searchProduct(search){
      this.products = []
      axios({
        method: 'post',
        url: `http://ecommerce-server.indraaditya.online/products/search/`,
        data: {
          search: search
        }
      })
        .then(({data})=>{
          this.products = data
        })
    },
    logout(){
      swal({
        title: "Are you sure?",
        text: "Are you sure want to log out?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          localStorage.removeItem('token')
          this.$router.push('/login')
          this.showLogin = true
          swal("logout success", {
            icon: "success",
          });
        }
      });
    },
    login(){
      this.showLogin = false
    },
    checkout(){
      this.cart = []
      const token = localStorage.getItem('token')
      const user = jwt.verify(token, 'secret')
      axios({
        method: 'patch',
        url: `http://ecommerce-server.indraaditya.online/users/cart/${user.id}`,
        data: {
          cart : this.cart
        }
      })
        .then(({data})=>{
          swal('Success', 'Congratulation, you buy it all','success')
          this.$router.push('/checkout')
        })
    },
    deleteProduct(id){
      console.log(123);
      
      axios({
        method: 'delete',
        url: `http://ecommerce-server.indraaditya.online/products/${id}`
      })
        .then(({data})=>{
          console.log(data)
        })
    },
    addAdmin(){
      this.$router.push('/addadmin')
    },
    addProduct(){
      this.$router.push('/addproduct')
    }
  },
  watch: {
    showLogin(newValue){
      if(this.showLogin == false){
        const token = localStorage.getItem('token')
        const user = jwt.verify(token, 'secret')
        this.user = `${user.name}`
      }
    }
  },
  created () {
    this.fetchData()
    if(localStorage.getItem('token')){
      this.showLogin = false
    }
    if(this.showLogin == false){
      const token = localStorage.getItem('token')
      const user = jwt.verify(token, 'secret')
      this.user = `${user.name}`
    }
    
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav-right{
  float: right;
}
</style>
