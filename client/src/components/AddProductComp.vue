<template>
    <div class="text-center signin mt-5 mb-5">
        <button @click="historyBack" class="btn btn-link">back</button>
      <form class="form-signReg">
          <h1 class="h3 mb-3 font-weight-normal">Add Your Product</h1>
          <label for="productName" class="sr-only">Product Name</label>
          <input v-model="productName" type="text" id="addName" class="form-control" placeholder="Product Name" required>
          <label for="productDesc" class="sr-only">Produc Description</label>
          <input v-model="productDesc" type="text" id="addDesc" class="form-control" placeholder="Description (optional)">
          <label for="productPrice" class="sr-only">Product Name</label>
          <input v-model="productPrice" type="text" id="addPrice" class="form-control" placeholder="Price">
          <label for="productStock" class="sr-only">Produc Description</label>
          <input v-model="productStock" type="text" id="addStock" class="form-control" placeholder="Stock">
          <br>
          <p>Add Image</p>
          <label for="image" class="sr-only">Image</label>
          <input v-on:change="previewFile" type="file" id="image">
          <!-- <p class="err">{{successAddProduct}}</p>
          <p class="err">{{errorAddProduct}}</p> -->
          <button @click.prevent="addProduct()" class="btn btn-lg btn-primary btn-block mt-2" type="submit">Add Product !</button>
          <h3 class="text-danger mt-2">{{error}}</h3>
          <p class="mt-5 mb-3 text-muted">&copy; 2019</p>
        </form>
    </div>
</template>

<script>
import axios from '../myAxios/axios'
import swal from 'sweetalert2'
export default {
  props: [],
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
    addProduct () {
      let { img } = this.formUploadImg
      var bodyFormData = new FormData()
      if (!this.formUploadImg.img) {
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
            return axios.post('/admins', {
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
    }
  }

}

</script>

<style>

</style>
