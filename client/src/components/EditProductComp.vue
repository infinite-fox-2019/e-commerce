<template>
    <div class="text-center signin mt-5 mb-5">
        <button @click="historyBack" class="btn btn-link">back</button>
      <form class="form-signReg">
          <h1 class="h3 mb-3 font-weight-normal">Edit Your Product</h1>

          <img class="card-img-top fit-image" :src="productImg" alt="Card image cap">
          <label for="productName" class="sr-only">Product Name</label>
          <input v-model="productName" type="text" id="addName" class="form-control" placeholder="Product Name" required>
          <label for="productDesc" class="sr-only">Produc Description</label>
          <input v-model="productDesc" type="text" id="addDesc" class="form-control" placeholder="Description (optional)">
          <label for="productPrice" class="sr-only">Product Name</label>
          <input v-model="productPrice" type="text" id="addPrice" class="form-control" placeholder="Price">
          <label for="productStock" class="sr-only">Produc Description</label>
          <input v-model="productStock" type="text" id="addStock" class="form-control" placeholder="Stock">
          <br>
          <p>Add New Image</p>
          <label for="image" class="sr-only">Image</label>
          <input v-on:change="previewFile" type="file" id="image">
          <button @click.prevent="editProduct(dataFromMain.id)" class="btn btn-lg btn-primary btn-block mt-2" type="submit">Edit Product !</button>
          <br>
          <button @click.prevent="deleteProduct(dataFromMain.id)" class="btn btn-lg btn-danger btn-block mt-2 mb-2" type="submit">Delete Product !</button>
          <h2 class="text-danger mt-2 mb-2">{{error}}</h2>
          <p class="mt-5 mb-3 text-muted">&copy; 2019</p>
        </form>
    </div>
</template>

<script>
import axios from '../myAxios/axios'
import swal from 'sweetalert2'
export default {
  props: ['dataFromMain'],
  data () {
    return {
      productName: '',
      productDesc: '',
      productImg: '',
      productPrice: '',
      productStock: '',
      formUploadImg: {
        img: ''
      },
      error: ''
    }
  },
  methods: {
    historyBack () {
      this.$router.go(-1)
    },
    sendingEvent (file, formData) {
      formData.append('image', file)
    },
    previewFile (event) {
      this.formUploadImg.img = event.target.files[0]
    },
    editProduct (id) {
      // console.log('METHOD JALAN')
      let { img } = this.formUploadImg
      var bodyFormData = new FormData()
      if (!this.productImg) {
        swal.fire({
          type: 'error',
          title: 'failed to upload file ',
          text: 'Cannot be empty',
          showConfirmButton: false,
          timer: 2000
        })
      }
      if (this.productName && this.productPrice) {
        swal.fire({
          title: 'wait a minute to upload data',
          allowOutsideClick: () => !swal.isLoading()
        })
        swal.showLoading('wait a minute ')
        bodyFormData.append('image', img)
        axios.post('/upload', bodyFormData)
          .then(({ data }) => {
            return axios.patch(`/admins/${id}`, {
              name: this.productName,
              description: this.productDesc,
              image: data.link,
              price: this.productPrice,
              stock: this.productStock
            },
            { headers: {
              token: localStorage.getItem('token')
            } })
          })
          .then(data => {
            swal.close()
            swal.fire({
              type: 'success',
              title: 'successfully upload file',
              showConfirmButton: false,
              timer: 2000
            })
            this.error = ''
            this.$router.push('/users')
            console.log(data)
          }).catch(err => {
            console.log(err)
          })
      } else {
        this.error = 'name, image or price cannot be empty'
      }
    },
    deleteProduct (id) {
      axios.delete(`admins/${id}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          this.$router.push('/users')
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    initialData () {
      this.productName = this.dataFromMain.name
      this.productImg = this.dataFromMain.image
      this.productDesc = this.dataFromMain.description
      this.productPrice = this.dataFromMain.price
      this.productStock = this.dataFromMain.stock
    }
  },
  created () {
    this.initialData()
  }

}

</script>

<style>

</style>
