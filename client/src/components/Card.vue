<template>
  <div>
    <b-card-img height="255px" width="255px" :src="imgsrc" alt="Image" top></b-card-img>
    <b-card
      :title="title | truncate(25, '...')"

      img-alt="Image"

      class="mb-3"
      style="height: 12rem;"
    >
      <b-card-text>
        ${{price || 1.00}}
      </b-card-text>

      <b-button @click.prevent="addToCart()" href="#" variant="outline-dark"> <span><img src="https://image.flaticon.com/icons/svg/265/265731.svg" class="mb-1 mr-2" width="15px" height="15px"></span> Add to Cart</b-button>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Card',
  data () {
    return {

    }
  },
  props: {
    _id: String,
    imgsrc: String,
    title: String,
    subtitle: String,
    price: Number
  },
  methods: {
    addToCart () {
      console.log(this._id)
      if (localStorage.getItem('token')) {
        axios({
          method: 'post',
          url: 'http://localhost:3000/carts',
          data: {
            productId: this._id,
            amount: 1
          },
          headers:{
            Authorization:localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            console.log(data)
          })
          .catch(err => {
            console.log(err.response)
          })
      } else {
        console.log('Mohon login terlebih dahulu')
      }
    }
  }
}
</script>

<style>

</style>
