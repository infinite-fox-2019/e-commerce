<template>
    <div>
        <b-nav-item href="#" v-if="this.$store.state.role === 'admin'" @click="showModal">Add Product</b-nav-item>

        <b-modal ref="my-modal" hide-footer title="Add New Task Here">
            <form>
                <div class="d-block text-center">
                    <input type="text" placeholder="Name" v-model="name"><br />
                    <input type="text" placeholder="Description" v-model="desc"><br />
                    <h5>Price</h5>
                    <input type="number" v-model="price"><br />
                    <h5>Stock</h5>
                    <input type="number" v-model="stock"><br />
                    <h5>Upload your image</h5>
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="file" ref='file' v-on:change="handleFileUpload()" style="cursor: pointer">
                        <label class="custom-file-label" for="customFile">Selected file : {{ file ? file.name : '' }}</label>
                    </div>
                </div>
                <b-button class="mt-3" variant="outline-success" block @click="submitFile">Add Product</b-button>
                <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Cancel</b-button>
            </form>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'addproduct',
  data () {
    return {
      name: '',
      desc: '',
      price: 0,
      stock: 0,
      file: '',
      title: ''
    }
  },
  methods: {
    showModal () {
      this.$refs['my-modal'].show()
    },
    hideModal () {
      this.$refs['my-modal'].hide()
    },
    submitFile () {
      let formData = new FormData()
      formData.append('name', this.name)
      formData.append('desc', this.desc)
      formData.append('price', this.price)
      formData.append('stock', this.stock)
      formData.append('image', this.file)
      axios({
        method: 'post',
        url: 'http://localhost:3000/products',
        data: formData,
        // config: { headers: {'Content-Type': 'multipart/form-data' }},
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          // console.log(data)
          this.$store.dispatch('getproducts')
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Success Add Product',
            showConfirmButton: false,
            timer: 1500
          })
          this.hideModal()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleFileUpload () {
      this.file = this.$refs.file.files[0]
      this.fileName = this.file.name
    }
  }
}
</script>

<style>
input{
  width: 100%;
  background-color: #91c6e5 !important;
}
.modal-content {
  background-color: #91c6e5 !important;
  color: antiquewhite;
  text-shadow: 1px 1px #166989;
}
</style>
