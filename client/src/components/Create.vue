<template>
<div class='allthis'>
      <div class="inside">
          <form @submit.prevent='createProduct()'>
          <table>
              <tr>
                  <td>
                    <label>Name</label>
                  </td>
                  <td>
                    <input 
                        v-model='form.name' 
                        type='text' 
                        placeholder="Name Cars"
                        ><br>
                  </td>
              </tr>
              <tr>
                  <td>
                    <label>Brand</label>
                  </td>
                  <td>
                    <input 
                        type='text' 
                        v-model='form.brand' 
                        placeholder='Brand'
                        ><br>
                  </td>
              </tr>
              <tr>
                  <td>
                    <label>Price</label>
                  </td>
                  <td>
                    <input 
                        type='Number' 
                        v-model='form.price' 
                        placeholder='999999'
                        ><br>
                  </td>
              </tr>
              <tr>
                  <td>
                    <label>Description</label>
                  </td>
                  <td>
                    <input 
                        type='text' 
                        v-model='form.description' 
                        placeholder='description'
                        ><br>
                  </td>
              </tr>
              <tr>
                  <td>
                    <b-form-file 
                        v-model="form.file" 
                        ref="file-input" 
                        class="mb-2"
                        >
                    </b-form-file>
                  </td>
              </tr>
              <tr>
                  <td>
                        <input 
                            class='btn-primary' 
                            type='submit'
                            value='Register'
                            >
                  </td>
                    <div class="spinner-grow text-secondary" v-if='isloading' role="status">
                    <span class="sr-only">Loading...</span>
                </div>
              </tr>
          </table>
          </form>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            form:{
                name: '',
                brand: '',
                price: 0,
                description: '',
                file: ''
            }
        }
    },
    methods: {
        createProduct(){
            console.log('to be continue')
        }
    }
}
</script>

<style>

</style>