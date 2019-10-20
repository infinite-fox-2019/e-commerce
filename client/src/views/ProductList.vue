<template>
  <b-container>
    <b-row>
      <b-col>
      <p class="my-4 h1 cart-title">Your Product List</p>
        <div>
          <b-table striped hover :items="items" :fields="fields">
            <template v-slot:cell(actions)="row">
              <b-button size="sm" variant="warning" class="mr-1">
                Edit
              </b-button>
              <b-button size="sm" variant="danger" class="mr-1" @click="deleteCartData(row.item.id)">
                Delete
              </b-button>
            </template>
          </b-table>
          <div class="mt-3">
            <b-button variant="success" class="mr-1"> Save Change </b-button>
            <router-link to="/add-product"><b-button class="mr-2" variant="secondary">Add Product</b-button></router-link>
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
    fetchData () {
      axios({
        method: 'get',
        url: 'http://localhost:3000/products'
      })
        .then(({ data }) => {
          console.log(data)
          this.items = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteCartData (id) {
      console.log(id)
      axios({
        method: 'delete',
        url: `http://localhost:3000/products/${id}`
      })
        .then(({ data }) => {
          console.log('delete berhasil')
          this.fetchData()
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<style>
  .cart-title{
    font-weight: bold
  }
</style>
