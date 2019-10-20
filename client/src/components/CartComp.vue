<template>
    <div>
      <div>
      <div class="navbar navbar-dark bg-dark box-shadow mb-4">
        <div class="container d-flex justify-content-between">
          <a href="#" class="navbar-brand d-flex align-items-center">
            <img class="mr-3" src="https://image.flaticon.com/icons/svg/112/112548.svg" width="20" height="20">
            <strong>Hacktiv8-Commerce</strong>
          </a>
          <h3 class="text-white"> <strong> YOUR CART </strong></h3>
        </div>
      </div>
      </div>

      <div class="album bg-light">
        <div  class="container">
             <button @click="historyBack" class="btn btn-link"> Back to Home</button>
          <input v-model="search" class="form-control mb-2" type="text" placeholder="Search" aria-label="Search">
          <div class="row">
            <div v-for="product in filteredProducts" :key="product._id" class="col-md-4">
              <div class="card mb-4 box-shadow">
                <img class="card-img-top fit-image" :src="product.image" alt="Card image cap">
                <div class="card-body">
                  <h3 class="card-text font-weight-bolt">{{product.name}}</h3>
                  <p class="card-text">{{product.description}}.</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                    </div>
                     <small class="text-muted">Price {{product.price}}</small>
                    <small class="text-muted">Quantity 1</small>
                  </div>
                  <button @click.prevent="deleteFromCart(product._id)" type="button" class="btn btn-sm btn-danger mt-2">Delete From Cart</button>
                </div>
              </div>
            </div>

          </div>
          <button @click.prevent="removeCart" type="button" class="btn btn-sm btn-danger mt-2">Remove Cart</button>
        </div>
      </div>
    </div>

</template>

<script>

import axios from '../myAxios/axios'
export default {
  data () {
    return {
      listProducts: [],
      search: '',
      count: '',
      msg: ''
    }
  },
  methods: {
    historyBack () {
      this.$router.go(-1)
    },
    generateProducts () {
      axios.get('/carts', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(products => {
          this.listProducts = products.data.ProductsId
          this.count = this.listProducts.length
          this.$emit('countFromChild', this.count)
          // console.log(this.listProducts, this.count)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteFromCart (id) {
      console.log(id)
      axios.delete(`/carts/${id}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(products => {
          this.generateProducts()
          console.log(products)
        })
        .catch(err => {
          console.log(err)
        })
    },
    removeCart () {
      axios.delete('/users', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          this.listProducts = []
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },

  created () {
    this.generateProducts()
  },
  computed: {
    filteredProducts () {
      return this.listProducts.filter(product => {
        return product.name.indexOf(this.search) > -1
      })
    }
  }
}
</script>

<style scoped>
.fit-image{
width: 100%;
object-fit: contain;
height: 200px;
}
</style>
