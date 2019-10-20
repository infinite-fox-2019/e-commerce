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
          key: 'stock',
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
        url: 'http://localhost:3000/carts'
      })
        .then(({ data }) => {
          console.log(data)
          this.items = []
          data.forEach(element => {
            this.items.push(element)
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteCartData (id) {
      console.log(id)
      axios({
        method: 'delete',
        url: `http://localhost:3000/carts/${id}`
      })
        .then(({ data }) => {
          console.log('delete berhasil')
          this.fetchCartData()
        })
        .catch(err => {
          console.log(err)
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
