<template>
  <div>
    <div class="container">
      <div class="notification has-background-white">
        <form @submit.prevent="addCart">
          <b-field label="Quantity">
            <b-numberinput v-model="qty" type="is-danger"></b-numberinput>
          </b-field>
          <button class="button is-danger">Confirm</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../helpers/axios'

export default {
  name: 'QtyForm',
  props: ['product'],
  data () {
    return {
      qty: 0
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
          console.log('berhasil')
        })
        .catch(err => {
          this.$store.commit('SET_ERR_MESSAGES', err)
        })
    }
  }
}
</script>

<style scoped>
.container {
  width: 400px;
  box-shadow: none;
}
</style>
