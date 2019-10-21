<template>
  <b-container>
    <b-row>
      <b-col>
      <p class="my-4 h1 cart-title">Your Cart List</p>
        <div>
          <b-table striped hover :items="items" :fields="fields">
            <template v-slot:cell(actions)="row">
              <b-button size="sm" variant="warning" class="mr-1" @click="deleteCartData(row.item.id)">
                Delete Cart
              </b-button>
            </template>
          </b-table>
          <div class="mt-3">
            <b-button variant="success" class="mr-1"> Checkout </b-button>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios'

export default {
  components: {

  },
  data () {
    return {
      fields: [
        {
          key: 'name',
          sortable: true
        },
        {
          key: 'amount',
          sortable: true
        },
        {
          key: 'price',
          label: 'price ($)',
          sortable: true
        },
        {
          key: 'actions',
          label: 'Actions'
        }
      ],
      items: []
    }
  },
  methods: {
    fetchCartData () {
      axios({
        method: 'get',
        url: 'http://localhost:3000/carts',
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
        .then(({ data }) => { 
          this.items = []
          data.cart.forEach(element => {
            console.log(element)
            let cartData = {
              amount:element.amount,
              name: element.product.name,
              price: element.product.price,
              id:element._id
            }
            this.items.push(cartData)
          })
          console.log(this.items)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    deleteCartData (id) {
      console.log(id)
      axios({
        method: 'patch',
        url: `http://localhost:3000/carts/${id}`,
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          console.log('delete berhasil')
          this.fetchCartData()
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  },
  created () {
    this.fetchCartData()
  }
}
</script>

<style>
  .cart-title{
    font-weight: bold
  }
</style>
