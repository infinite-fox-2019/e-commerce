<template>

  <b-container class="h-100">
    <b-row class="h-100 justify-content-center align-items-center">
      <b-col cols="8" style="margin-top:20vh">      
          <p class="h1 mb-4" style="font-weight:bold;">Add product</p>
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">

            <b-form-group>
            <div class="mb-1">Selected image: {{ file ? file.name : '' }}</div>
            <b-form-file
              v-model="file"
              placeholder="Choose a image or drop it here..."
              drop-placeholder="Drop image here..."
              accept="image/*"
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
                type="email"
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
  export default {
    data() {
      return {
        form: {
          productName: '',
          price: null,
          food: null,
          checked: [],
          file: null,
          stock: null
        },
        foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.productName = ''
        this.form.price = ''
        this.form.food = null
        this.form.checked = []
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