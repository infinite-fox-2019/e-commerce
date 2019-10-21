<template>

  <b-container class="h-100">
    <b-row class="h-100 justify-content-center align-items-center">
      <b-col cols="8" style="margin-top:20vh">
          <p class="h1 mb-4" style="font-weight:bold;">Add product</p>
          <b-form @submit="onSubmit" @reset="onReset" v-if="show" enctype="multipart/form-data">

            <b-form-group>
            <div class="mb-1">Selected image: {{ form.file ? form.file.name : '' }}</div>
            <b-form-file
              v-model="form.file"
              placeholder="Choose a image or drop it here..."
              drop-placeholder="Drop image here..."
              accept="image/*"
              enctype="multipart/form-data"
            ></b-form-file>
            </b-form-group>

            <b-form-group
              id="input-group-1"
              label="Product name:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="form.productName"
                type="text"
                required
                placeholder="Enter product name"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Price:" label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="form.price"
                required
                placeholder="Enter price"
                type="number"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Stock:" label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="form.stock"
                required
                placeholder="Enter stock"
                type="number"
              ></b-form-input>
            </b-form-group>

            <b-button type="submit" class="mr-2" variant="primary">Add Product</b-button>
            <b-button type="reset" class="mr-2" variant="warning">Reset</b-button>
          </b-form>

      </b-col>
    </b-row>
  </b-container>

</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      form: {
        productName: '',
        price: null,
        file: null,
        stock: null
      },
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      console.log(this.form.file)
      console.log(JSON.stringify(this.form))

      let bodyFormData = new FormData()
      bodyFormData.append('file', this.form.file)
      bodyFormData.append('price', this.form.price)
      bodyFormData.append('name', this.form.productName)
      bodyFormData.append('qty', this.form.stock)

      console.log(bodyFormData)

      axios({
        method: 'post',
        url: 'http://localhost:3000/products',
        data: bodyFormData,
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.productName = ''
      this.form.price = ''
      this.form.file = null
      this.text = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style scoped>
  body,html{
    height:100%;
  }
</style>
