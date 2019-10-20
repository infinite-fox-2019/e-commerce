<template>
  <div class="container">
      <form @submit.prevent="createProduct()" class="card" style="min-height:500px" enctype="multipart/form-data">
          <label for="product">Product</label>
          <input type="text" placeholder="What's your product ?" v-model="product">
          <br>
          <label for="stock">Stock</label>
          <input type="text" placeholder="How many is your's stock ?" v-model="stock">
          <br>
          <label for="category">Category</label>
          <select v-model="category">
              <option>Food</option>
              <option>Electronic</option>
              <option>Hobby</option>
              <option>Gadget</option>
              <option>Sport</option>
              <option>Lifestyle</option>
              <option>Entertainment</option>
              <option>Carpentry</option>
          </select>
          <br>
          <label for="price">Price</label>
          <input type="text" placeholder="What's your Price ?" v-model="price">
          <br>
          <form enctype="multipart/form-data">
          <input @change="previewFile" id="input-file" type="file" />
          <button @click.prevent="uploadImage" variant="outline-primary">Upload Image</button>
          </form>
          <div class="image-preview" v-if="imageData.length > 0">
              <img class="preview" :src="imageData" style="max-width: 360px; max-height: 240px; ">
          </div>
          <input type="submit" value="Create">
      </form>
  </div>
</template>

<script>
import Axios from 'axios'
import swal from 'sweetalert2'
export default {
  data: () => {
    return {
      product: '',
      category: '',
      stock: 0,
      price: 0,
      imageData: '',
      formCreatePdf: {
        pdf: ''
      },
      url: ''
    }
  },
  methods: {
    createProduct () {
      let payload = {
        product: this.product,
        price: this.price,
        category: this.category,
        stock: this.stock,
        imageData: this.imageData
      }
      this.$store.dispatch('createProduct', payload)
      this.price = 0
      this.stock = 0
      this.product = ''
      this.category = ''
      this.imageData = ''
    },
    previewImage: function (event) {
      var input = event.target
      if (input.files && input.files[0]) {
        var reader = new FileReader()
        reader.onload = (e) => {
          this.imageData = e.target.result
        }
        reader.readAsDataURL(input.files[0])
      }
    },
    previewFile (event) {
      this.formCreatePdf.pdf = event.target.files[0]
    },
    uploadImage () {
      if (!this.formCreatePdf.pdf) {
        swal.fire({
          type: 'error',
          title: 'failed to upload file ',
          text: 'Cannot be empty',
          showConfirmButton: false,
          timer: 2000
        })
      } else {
        swal.fire({
          title: 'wait a minute to upload data',
          allowOutsideClick: () => !this.$swal.isLoading()
        })
        swal.showLoading('wait a minute ')

        let { pdf } = this.formCreatePdf
        var bodyFormData = new FormData()
        bodyFormData.append('imageData', pdf)

        Axios({
          url: 'http://localhost:3000/upload',
          method: 'POST',
          data: bodyFormData
        })
          .then(({ data }) => {
            swal.close()
            swal.fire({
              type: 'success',
              title: 'successfully upload file',
              showConfirmButton: false,
              timer: 2000
            })
            this.imageData = data.imageData
          })
          .catch(err => {
            let message =
            (err.response && err.response.data && err.response.data.message) ||
            'error failed to upload file'
            swal.fire({
              type: 'error',
              title: 'failed to upload file ',
              text: message,
              showConfirmButton: false,
              timer: 2000
            })
          })
      }
    }
  }
}
</script>

<style>

</style>
