<template>
  <div class="formo">
    <form @submit.prevent="createItem">
      <div class="kiri">
        <h1>Create New Item</h1>
        <label for="name">Name</label>
        <input type="text" v-model="name" />
        <br />
        <b-field label="Description">
          <b-input maxlength="100" type="textarea" v-model="description"></b-input>
        </b-field>
        <section class="tags">
          <label for style="text-decoration:underline">Tag</label>
          <div class="block">
            <b-checkbox style="display:none"></b-checkbox>
            <b-checkbox v-model="checkboxGroup" native-value="bestseller">Best Seller</b-checkbox>
            <b-checkbox v-model="checkboxGroup" native-value="profesional">Profesional</b-checkbox>
            <b-checkbox v-model="checkboxGroup" native-value="kids">Kids</b-checkbox>
            <b-checkbox v-model="checkboxGroup" native-value="Paint">Paint</b-checkbox>
            <b-checkbox v-model="checkboxGroup" native-value="brush">Paint Brush</b-checkbox>
          </div>
        </section>
        <b-field class="file">
          <input v-on:change="getImage($event)" type="file" />
        </b-field>
      </div>
      <div style="margin-left: 80px; padding-top:90px">
        <div>
          <label for="price">Price :</label>
          <input type="number" name id style="width:300px" v-model="price" min="1000" />
        </div>
        <br />
        <div style="width:140px">
          <label for="stock">Stock :</label>
          <input type="number" name id style="width:80px" v-model="stock" min="5" />
        </div>
        <br />
        <div class="butoon">
          <b-button class="is-success is-medium" @click="createItem">Submit</b-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from '../config/axios'
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      name: '',
      description: '',
      price: 1000,
      stock: 5,
      checkboxGroup: ['profesional'],
      image: false
    }
  },
  methods: {
    getImage () {
      console.log('upload')
      let file = event.target.files || event.dataTransfer.files
      this.image = file[0]
    },
    createItem () {
      let tags = this.checkboxGroup
      let name = this.name
      let description = this.description
      let price = this.price
      let stock = this.stock
      console.log(tags, name, description, price, stock)
      let formdata = new FormData()
      if (this.image) {
        formdata.set('image', this.image)
        axios({
          method: 'POST',
          url: '/upload',
          data: formdata,
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(result => {
          let img = result.data.link
          return axios({
            method: 'post',
            url: '/items',
            data: {
              name,
              description,
              featured_image: img,
              price,
              stock,
              tags
            },
            headers: {
              token: localStorage.getItem('token')
            }
          })
            .then(({ data }) => {
              Swal.fire(
                'Success',
                'create new item',
                'success'
              )
              console.log(data)
            })
            .catch(err => {
              console.log(err)
            })
        })
          .finally(() => {
            this.name = ''
            this.description = ''
            this.checkboxGroup = ['profesional']
            this.price = 1000
            this.stock = 5
            this.image = false
            this.$router.push({ path: '/admin/items' })
          })
      }
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.formo {
  width: 100vw;
  height: 88vh;
  display: flex;
  justify-content: center;
  background-color: rgb(55, 9, 99);
}
form {
  display: flex;
  flex-direction: row;
  width: 65%;
  background: rgb(244, 249, 253);
  border: 4pt dashed rgb(6, 160, 6);
  padding: 15px;
  margin: 30px;
}
label {
  margin-bottom: 5px;
  font-weight: 800;
}
input {
  margin: 0 auto;
  height: 30px;
  width: 400px;
}
.tags {
  display: flex;
  flex-direction: column;
}
.block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
}
.file {
  display: flex;
  justify-content: center;
}
h1 {
  margin-top: 20px;
  font-size: 28pt;
  font-weight: 400;
  text-align: left;
}
.kiri {
  display: flex;
  flex-direction: column;
  margin-left: 35px;
}
.butoon {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
