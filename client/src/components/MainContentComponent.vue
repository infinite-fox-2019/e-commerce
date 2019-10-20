<template>
        <div class="album bg-light">
        <div  class="container">
          <p  class="text-danger">{{err}}</p>
          <p  class="text-success">{{success}}</p>
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
                      <button @click.prevent="addItems(product._id)"  type="button" class="btn btn-sm btn-outline-secondary"> Add to Cart</button>
                      <button v-if="payload.role === 'admins'"
                      @click.prevent="toEdit(product._id, product.image, product.name, product.description, product.price, product.stock)"
                      type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                    </div>
                     <small class="text-muted">Price {{product.price}}</small>
                    <small  class="text-muted">Stock {{product.stock}}</small>
                  </div>
                </div>
              </div>
            </div>

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
      payload: '',
      count: '',
      err: '',
      success: ''
    }
  },
  methods: {
    generateAll () {
      axios.get('/users', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(products => {
          console.log('masuk user ni')
          // console.log(products.data.data)
          this.listProducts = products.data.data
          this.payload = products.data.payload
          this.$emit('usersPayload', this.payload)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addItems (id) {
      if (this.count < 1) {
        this.generateCart()
      }
      console.log(localStorage.getItem('token'))
      axios.patch(`/carts/${id}`, {}, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          this.makeCount()
          this.err = ''
          this.success = 'Successfully Added'
          // console.log(data)
        })
        .catch(err => {
          console.log(err)
          this.success = ''
          if (err.response.data.code !== 400) {
            this.err = 'please try again'
          }
          this.err = err.response.data.message
        })
    },
    generateCart () {
      axios.post('/users', {}, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    toEdit (id, image, name, description, price, stock) {
      let payload = { id: id, image: image, name: name, description: description, price: price, stock: stock }
      // console.log(payload)
      this.$router.push({ name: 'editProduct', params: { dataFromMain: payload } })
    },
    makeCount () {
      axios.get('/carts', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(products => {
          this.count = products.data.ProductsId.length
          this.$emit('countFromMainChild', this.count)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.generateAll()
    this.makeCount()
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
