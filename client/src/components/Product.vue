<template>
  <div id="card-product">

    <b-card
        :title="productfromhome.name"
        :img-src="productfromhome.image"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2 product-card"
    >

    <b-card-text>
        <strong>Condition: </strong>{{productfromhome.description}} <br>
        <strong>Price: </strong>{{'$' + productfromhome.price}} <br>
        <strong>Stock: </strong>{{productfromhome.stock}}
    </b-card-text>

    <b-button @click="updateCart(productfromhome.name, productfromhome.price, productfromhome.image)" v-if="!isAdmin" class="b" href="#" variant="success">Buy</b-button>
    <b-button @click="deleteProduct(productfromhome._id)" v-if=" isAdmin" class="b" href="#" variant="danger">Delete</b-button>
    </b-card>

  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'Product',
  data () {
    return {
      isAdmin: false,
      userEmail: localStorage.getItem('email'),
      editproduct: {
          name: '',
          description: '',
          stock: '',
          price: '',
          image: ''
      }
    }
  },
  props: ['productfromhome', 'getProducts', 'deleteProduct'],
  methods: {
    updateCart(productName, productPrice, productImage) {
      axios({
        method: 'patch',
        url: `http://localhost:3000/carts/update`,
        data: {
          email: this.userEmail,
          objproduct: {
            name: productName,
            price: productPrice,
            image: productImage
          }
        }
      })
        .then(({ data }) => {
          Swal.fire(
            'Added to the cart!',
            `Success`,
            'success'
          )
          console.log('updateCart => ', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    checkAdmin () {
      const role = localStorage.getItem('role')
      if (role === 'admin') {
        this.isAdmin = true
      }
    }
  },
  created () {
    this.checkAdmin()
  }

}
</script>

<style>
.b {
    margin: 2px;
}
#card-product {
    width: 200px;
    font-size: 12px;
}

.card-title {
    font-size: 17px;
    font-weight: bold;
    min-height: 70px;
}

.product-card {
    height: 535px;
}

.product-card img {
    height: 300px;
}

.card-body {
    height: 100px;
}

</style>
