<template>
  <div id="app">
       <div id="navbar">
      <Navbar :transNav="transNav" :displayTransaction="displayTransaction" :checkout="checkout" :updateTransaction="updateTransaction" :checkAdmin="checkAdmin" :isAdmin="isAdmin" :getCart="getCart" :onCart="onCart" :getProducts="getProducts" :search="search"/>
    </div>

    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="3">
          <div id="categories">
            <div class="category-heading">
              <h4>Categories</h4>
              <div class="color-block"></div>
            </div>
            <div id="category" v-for="(category, index) in categoriesList" :key="index">
              <Category :showCategory="showCategory" :categoriesfromhome="category"/>
            </div>
          </div>
        </b-col>

        <b-col cols="9">
          <center>
            <b-button @click="displayAddProduct()" v-if="isAdmin && !onCart && !onAddProduct && !checkout" variant="success">Add New Product</b-button> <br>
            <div v-if="onAddProduct" id="addProduct">
                  <h6> Name:</h6>
                  <input v-model="product.name" type="textarea"><br><br>
                  <h6> Description:</h6>
                  <input v-model="product.description" type="textarea"><br><br>
                  <h6> Stock:</h6>
                  <input v-model="product.stock" type="textarea"><br><br>
                  <h6> Price:</h6>
                  <input v-model="product.price" type="textarea"><br><br>
                  <h6> Image:</h6>
                  <b-form-group label="" label-for="file-default" label-cols-sm="2">
                      <b-form-file v-on:change="getImageForProduct($event)" id="file-default"></b-form-file>
                  </b-form-group>
                  <b-button @click="addProduct()" variant="success">Submit</b-button>
            </div>
          </center>
          <div id="products">
            <div id="product" v-for="(product, index) in fetchData" :key="index">
              <Product :deleteProduct="deleteProduct" :getProducts="getProducts" v-if="!onCart && !onAddProduct && !onEditProduct && !checkout" :checkAdmin="checkAdmin" :productfromhome="product"/>

            </div>
          </div>

          <div id="carts">
            <div id="cart" v-for="(cartProduct, index) in cartData" :key="index">
              <center><Cart v-if="onCart && !checkout" :getCart="getCart" :cartfromhome="cartProduct" /></center>
            </div>
            <h5 v-if="onCart && !checkout"> Total: ${{totalprice}}</h5>
            <center>
              
              <b-button id="checkout-btn" v-if="onCart && !onAddProduct && !checkout" class="buttons" @click="updateTransaction()" variant="success"><strong> Checkout!</strong></b-button></center>
              <h2 v-if="!isAdmin && checkout">Your payment note is here! </h2>
              <b-button @click="updateTransaction()" v-if="!isAdmin && checkout && finished" class="buttons" variant="primary"><strong>See Details</strong></b-button>
              <Transaction v-if="checkout && finished" :cardTrans="cardTrans" :userTransaction="userTransaction" :checkout="checkout" />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from '../components/Navbar'
import Category from '../components/Category.vue'
import Product from '../components/Product.vue'
import Cart from '../components/Cart.vue'
import Transaction from '../components/Transaction.vue'
import Swal from 'sweetalert2'

export default {
  name: 'home',
  components: {
    Navbar,
    Category,
    Product,
    Cart,
    Transaction
  },
  data () {
    return {
      product: {
          name: '',
          description: '',
          stock: '',
          price: '',
          image: ''
      },
      cartData: [],
      file: null,
      fetchData: [],
      categoriesList: '',
      isAdmin: false,
      onCart: false,
      onAddProduct: false,
      onEditProduct: false,
      checkout: false,
      userEmail: localStorage.getItem('email'),
      totalprice: 0,
      userTransaction: {},
      image: '',
      cardTrans: false,
      transNav: false,
      finished: false
    }
  },
  methods: {
    displayTransaction() {
      this.checkout = true
    },
    getImageForProduct(link){
      this.product.image = link.target.files[0];
    },
    updateTransaction() {
      axios({
        method: 'patch',
        data: {
          total: this.totalprice,
          email: this.userEmail
        },
        url: `http://localhost:3000/transaction/`
      })
        .then(({ data }) => {
          console.log(data.transaction[0])
          this.userTransaction = data.transaction[0]
          this.checkout = true
          this.finished = true
        })
        .catch(err => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'You need to complete the old transaction first to make a new transaction'
          })
        })
    },
    checkAdmin () {
      const role = localStorage.getItem('role')
      if (role === 'admin') {
        this.isAdmin = true
      }
    },
    deleteProduct(id) {
      const token = localStorage.getItem('token')
      axios({
        method: 'delete',
        url: `http://localhost:3000/products/${id}`,
        headers: {token}

      })
        .then(({ data }) => {
          console.log('Deleted')
          Swal.fire(
            'Product Deleted',
            `Success`,
            'success'
          )
          this.product.name = ''
          this.product.description = ''
          this.product.stock = ''
          this.product.price = ''
          this.product.image = ''
          this.getProducts()
        })
        .catch(err => {
          console.log(err)
        })
    },
    getCart() {
      axios({
        method: 'get',
        url: `http://localhost:3000/find/${this.userEmail}`
      })
        .then(({data}) => {
          this.cartData = data.cart
          let tempTotal = 0
          for (let i = 0; i < this.cartData.length; i++) {
            tempTotal = tempTotal + this.cartData[i].price
          }
          this.totalprice = tempTotal
          this.onCart = true
          this.checkout = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    displayAddProduct () {
        this.onCart = false
        this.onAddProduct = true
    },
    addProduct () {
      const token = localStorage.getItem('token')
      let formData = new FormData();
      formData.append('image', this.product.image);
      axios.post(`http://localhost:3000/img/upload`, formData, {})
        .then((image) => {
          axios({
              method: 'post',
              url: `http://localhost:3000/products`,
              data: {
                  name: this.product.name,
                  description: this.product.description,
                  stock: this.product.stock,
                  price: this.product.price,
                  image: image.data.link
              },
              headers: {token}
          })
              .then(({data}) => {
                  Swal.fire(
                    'New Product Added',
                    `Success`,
                    'success'
                  )
                  this.product.name = ''
                  this.product.description = ''
                  this.product.stock = ''
                  this.product.price = ''
                  this.product.image = ''
                  this.getProducts()
              })
              .catch(err => {
                console.log(err)
              })
            

        })
    },
    checkAdmin () {
      const role = localStorage.getItem('role')
      if (role === 'admin') {
        this.isAdmin = true
      }
    },
    search (input) {
      axios({
        method: 'get',
        url: `http://localhost:3000/products/search/${input}`
      })
        .then(({ data }) => {
          this.fetchData = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    showCategory (id) {
      axios({
        method: 'get',
        url: `http://localhost:3000/products/${id}`
      })
        .then(({ data }) => {
          this.fetchData = data
          this.onCart = false
          this.onAddProduct = false
          this.checkout = false
        })
    },
    getProducts () {
      axios({
        method: 'get',
        url: `http://localhost:3000/products`
      })
        .then(({ data }) => {
          this.fetchData = data
          this.onCart = false
          this.onAddProduct = false
          this.onEditProduct = false  
          this.checkout = false      
        })
        .catch(err => {
          console.log(err)
        })
    },
    getCategories () {
      axios({
        method: 'get',
        url: 'http://localhost:3000/categories'
      })
        .then(({ data }) => {
          this.categoriesList = data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.getProducts()
    this.getCategories()
    this.checkAdmin()
    this.onAddProduct = false

    if (this.cartData.length === 0) {
      this.transNav = true
    }
  }
}
</script>

<style scoped>
#navbar {
  padding-bottom: 30px;
}

#categories {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 800px;
  font-weight: bold;
  background-color: #343A40;
  padding: 20px;
  color: white;
  border-radius: 10px;
}

#categories h4 {
  padding: 10px;
  margin: 0;
}

#category {
  padding: 10px;
  color: white;
}

#products {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
}

#product {
  padding: 15px;
}

#cart {
  padding: 15px;
}

.category-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.color-block {
  background-color: #ffa500;
  height: 30px;
  width: 86px;
  margin-left: 10px;
  border-radius: 2px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

.col {
    width: 20px;
}

#checkout-btn {
  height: 50px;
  margin-bottom: 60px;
  font-weight: bold;
}

#trans-card {
  margin-bottom: 100px;
  
}

h5 {
  font-weight: bold;
}

h4 {
  color:#ffa500;
}

.card-title {
  font-weight: bold;
  font-size: 25px;
}


</style>
