<template>
  <div>
    <b-card-img height="255px" width="255px" :src="imgsrc" alt="Image" top></b-card-img>
    <b-card
      :title="title | truncate(25, '...')"

      img-alt="Image"

      class="mb-3"
      style="height: 13rem;"
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
    imgsrc: String,
    title: String,
    subtitle: String,
    price: Number
  },
  methods:{
    addToCart (index) {
      axios({
        method:'post',
        url:'http://localhost:3000/carts',
        data: {
          name: this.title,
          price: this.price,
          image: this.imgsrc,
          user: "123", //Ini nanti tempat user id nya
          amount: 1
        }
      })
        .then(({data}) => {
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
