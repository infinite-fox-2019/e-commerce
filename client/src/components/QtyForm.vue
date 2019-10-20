<template>
  <div>
    <div class="container">
      <div class="notification has-background-white">
        <form @submit.prevent="addCart" v-if="!added">
          <b-field label="Quantity">
            <b-numberinput v-model="qty" type="is-danger"></b-numberinput>
          </b-field>
          <button class="button is-danger">Confirm</button>
        </form>
        <div v-if="added">
          <div class="added-notif">
            <strong>Item added to Cart</strong>
          </div>
          <div class="added-notif">
            <button class="button" @click="continueShop">Continue Shopping</button>
          </div>
          <div class="added-notif">
            <button class="button is-danger" @click="toCart">See Shopping Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../helpers/axios'
// import swal from 'sweetalert'

export default {
  name: 'QtyForm',
  props: ['product'],
  data () {
    return {
      qty: 0,
      added: false
    }
  },
  methods: {
    addCart () {
      axios.post('/carts', {
        customer: this.$store.state.userId,
        product: this.$route.params.id,
        qty: this.qty
      }, {
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(cart => {
          this.added = true
          // swal('Item added to cart', {
          //   buttons: {
          //     cancel: 'Continue Shopping',
          //     redirect: {
          //       text: 'See Shopping Cart',
          //       value: 'redirect'
          //     }
          //   },
          //   dangerMode: true
          // })
          //   .then((value) => {
          //     switch (value) {
          //       case 'redirect':
          //         this.$router.push('/cart')
          //         break
          //     }
          //   })
        })
        .catch(err => {
          this.$store.commit('SET_ERR_MESSAGES', err)
        })
    },
    continueShop () {
      this.$emit('closeModal')
      this.$router.push('/')
    },
    toCart () {
      this.$router.push('/cart')
    }
  }
}
</script>

<style scoped>
.container {
  width: 400px;
  box-shadow: none;
}
.added-notif {
  margin: 10px;
}
</style>
