<template>

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
  props: ['productfromhome', 'getProducts', 'deleteProduct', 'editProduct'],
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
