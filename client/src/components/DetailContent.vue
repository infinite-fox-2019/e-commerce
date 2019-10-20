<template>
  <div>
    <div>
      <div class="columns">
        <div class="column">
          <img :src="product.image">
        </div>
        <div class="column">
          <div class="rows">
            <div v-if="this.$store.state.userRole === 'admin'" class="row-button">
              <button @click="toUpdate" class="button is-danger" style="margin-right: 5px;">
                <i class="fa fa-pencil-alt">
                </i>
              </button>
              <button @click="deleteProduct" class="button">
                <i class="fa fa-trash">
                </i>
              </button>
            </div>
            <div class="row product-name">
              {{ product.name }}
            </div>
            <div class="row product-series has-text-grey">
              By {{ product.series }}
              <hr>
            </div>
            <div class="row product-price has-text-danger">
              <strong>IDR {{ product.price.toLocaleString() }}</strong>
            </div>
            <div class="row product-stock">
              Stock: {{ product.stock }}
            </div>
            <div v-if="this.$store.state.userRole !== 'admin'" class="row">
              <button class="button is-danger add-cart-button" @click="showModal">
                <i class="fa fa-cart-plus" style="margin-right: 5px;"></i>
                to Cart
              </button>
            </div>
            <div class="modal" :class="{ 'is-active': isActiveModal }">
              <div class="modal-background"></div>
              <div class="modal-content">
                <QtyForm :product="product" @closeModal="isActiveModal = false"></QtyForm>
              </div>
              <button class="modal-close is-large" aria-label="close" @click="isActiveModal = false"></button>
            </div>
            <div class="row has-text-grey">
              <hr>
              {{ product.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'
import QtyForm from './QtyForm'

export default {
  name: 'DetailContent',
  components: {
    QtyForm
  },
  data () {
    return {
      product: '',
      productId: this.$route.params.id,
      isActiveModal: false
    }
  },
  methods: {
    toUpdate () {
      this.$router.push(`/products/${this.product._id}/update`)
    },
    deleteProduct () {
      swal({
        title: 'Delete this product?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            this.$store.dispatch('deleteProduct', this.product._id)
          }
        })
    },
    showModal () {
      if (!localStorage.access_token) {
        this.$router.push('/register')
      } else {
        this.isActiveModal = true
      }
    }
  },
  created () {
    this.product = this.$store.state.products.find(x => x._id === this.$route.params.id)
  },
  watch: {
    productId () {
      this.product = this.$store.state.products.find(x => x._id === this.$route.params.id)
    }
  }
}
</script>

<style scoped>
.rows{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}
.row{
  width: 100%;
  text-align: left;
}
.product-name{
  font-size: 20px;
}
.product-series{
  font-size: 2vh;
  text-align: left;
}
.product-price {
  font-size: 3vh;
}
.add-cart-button {
  margin-top: 10px;
  width: 50%;
}
.row-button {
  margin-bottom: 10px;
  display: flex;
}
</style>
