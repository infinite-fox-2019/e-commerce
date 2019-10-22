<template>
    <div class="product">
        <b-card :title="product.name" :img-src="product.image" img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2">
            <b-card-text>
            <p class="p-text">{{ product.desc }}</p>
            </b-card-text>

            <b-button href="#" variant="success" block v-if="this.$store.state.userRole !== 'admin'">Add to cart <i class="fas fa-shopping-cart"></i></b-button>
            <div v-if="this.$store.state.userRole === 'admin'">
              <b-button v-b-modal="`modal-prevent-closing${product._id}`" href="#" variant="success" block><i class="fas fa-pen-square"></i> Update</b-button>
              <b-button @click="deleteProduct(product._id)" href="#" variant="danger" block><i class="fas fa-trash"></i> Delete</b-button>
            </div>
        </b-card>
        <!-- modal -->
        <b-modal
          :id="`modal-prevent-closing${product._id}`"
          ref="modal"
          title="Update Product"
          @show="resetModal"
          @hidden="resetModal"
          @ok="handleOk"
        >
          <form ref="form" @submit.prevent="handleSubmit()">
            <input type="text" v-model="name">
            <input type="text" v-model="desc">
            <input type="number" v-model="price">
            <input type="number" v-model="stock">
          </form>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  data () {
    return {
      name: '',
      desc: '',
      price: '',
      stock: ''
    }
  },
  props: ['product'],
  methods: {
    deleteProduct (id) {
      Swal.fire({
        title: 'Are you sure want to delete this product ?',
        text: 'you cannot undo this',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#619d2d',
        confirmButtonText: 'Delete'
      })
        .then(result => {
          if (result.value) {
            axios({
              method: 'delete',
              url: `http://localhost:3000/products/${id}`,
              headers: {
                token: localStorage.getItem('token'),
                role: localStorage.getItem('role')
              }
            })
              .then(_ => {
                Swal.fire('Deleted!', 'Your product has been deleted', 'success')
                this.$emit('deleteSuccess')
              })
              .catch(_ => {
                Swal.fire('error', 'internal server error', 'error')
              })
          }
        })
    },
    handleOk (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit () {
      axios({
        method: 'patch',
        url: `http://localhost:3000/products/${this.product._id}`,
        headers: {
          token: localStorage.getItem('token'),
          role: localStorage.getItem('role')
        },
        data: { name: this.name, desc: this.desc, price: this.price, stock: this.stock }
      })
        .then(result => {
          Swal.fire('success', 'update success', 'success')
          this.$emit('updateSuccess')
          this.$nextTick(() => {
            this.$refs.modal.hide()
          })
        })
        .catch(err => {
          Swal.fire('error', err, 'error')
        })
    }
  },
  created () {
    const { name, desc, price, stock } = this.product
    this.name = name
    this.desc = desc
    this.price = price
    this.stock = stock
  }
}
</script>

<style>
    .product img{
        height: 250px;
        object-fit: cover;
    }
    .p-text{
        text-align: center;
        /* width: 250px; */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
