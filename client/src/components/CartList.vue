<template>
  <div>
    <div class="row">
      <div class="col">
        <figure class="image is-128x128">
          <img :src="cart.imgUrl">
        </figure>
      </div>
      <div class="col detail">
        <h6 class="title is-6">{{cart.nameProduct}}</h6>
        <p>Qty : {{cart.qty}}</p>
        <p>Total Price : {{cart.totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}}</p>
      </div>
      <div class="col">
        <button @click="deleteCart(cart._id)" class="button is-danger is-small btn">Delete</button>
      </div>
    </div><hr>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'CartList',
  props: ['cart'],
  data () {
    return {
      isFullPage: true
    }
  },
  methods: {
    deleteCart (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          const loadingComponent = this.$buefy.loading.open({
            container: this.isFullPage ? null : this.$refs.element.$el
          })
          if (result.value) {
            this.$store.dispatch('deleteCart', id)
              .then(() => {
                setTimeout(() => loadingComponent.close(), 1 * 1000)
                Swal.fire(
                  'Deleted!',
                  'Your Cat has been deleted.',
                  'success'
                )
                this.$store.dispatch('getCart')
              })
          }
        })
        .catch(err => {
          this.$buefy.toast.open({
            message: `${err.message}`,
            type: 'is-danger'
          })
        })
    }
  }
}
</script>
<style scoped>
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .col {
    margin: 5px 10px;
    max-height: 110px;
  }
  .detail {
    flex-grow: 1;
    justify-content: left !important;
  }
</style>
