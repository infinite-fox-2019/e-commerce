<template>
  <div class="container" style="margin-top:50px">
    <div class="row">
      <div class="col-sm">
        <h3>Add Product</h3>
        <form @submit.prevent="addProduct()">
         <input type="file" style="margin-bottom:10px" name="image" id="images" accept="image/*" 
                v-on:change="postFile($event)">
          <div class="form-group">
            <label>Title</label>
            <input type="text" class="form-control" placeholder="Title" v-model="title">
          </div>
          <div class="form-group">
            <label>Description</label>
            <input type="text" class="form-control" placeholder="Description" v-model="description">
          </div>
          <div class="form-group">
            <label>Stock</label>
            <input type="number" class="form-control" placeholder="stock" v-model="stock">
          </div>
          <div class="form-group">
            <label>Price</label>
            <input type="number" class="form-control" placeholder="stock" v-model="price">
          </div>
          <button class="btn btn-primary">Add Product</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      title: '',
      description: '',
      stock: 1,
      file: '',
      price: 0
    }
  },
  methods: {
    addProduct(){
      const token = localStorage.getItem('token')
      let bodyFormData = new FormData()
      bodyFormData.set('image', this.file)
      bodyFormData.append('title',this.title)
      bodyFormData.append('description', this.description)
      bodyFormData.append('stock', this.stock)
      bodyFormData.append('price', this.price)

      console.log(bodyFormData);
      
      axios({
        method: 'post',
        url: 'http://ecommerce-server.indraaditya.online/products',
        data: bodyFormData,
        files: {
            image: this.file
        },
        config : {
            headers : {
                'Content-Type' : 'multipart/form-data'
            }
        }
      })
      .then(({data})=>{
        console.log(data);
        
      })
    },
    postFile(event){
      this.file = event.target.files[0]
    }
  }
}
</script>

<style>

</style>