<template>
  <div>
      <div class="cartCard d-flex justify-content-between align-items-center">
         <div class="d-flex align-items-center">
              <img :src="cart.productId.image" :alt="cart.productId.name" class="m-2">
              <p style="width: 50px;" class="text-left">{{cart.productId.name}}</p>
         </div>
        <div class="habisName">
            <p>${{cart.productId.price}}.00</p>
        </div>
          <div class="habisName">
            <input  v-model="cart.qty" type="number" class="text-center mr-5">
            <!-- <p class="mr-5">{{cart.qty}}</p> -->
        </div>
          <div class="habisName mr-5">
          <p>${{ cart.subTotal }}.00</p>
          </div>
          <div class="habiName">
              <i @click.prevent="deleteCart" class="far fa-trash-alt"></i>
          </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Swal from 'sweetalert2'

export default {
  props: ['cart'],
  methods: {
    deleteCart () {
      console.log(`masuk sini dong gan`);
      Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            this.$store.dispatch('deleteCart', this.cart._id)
          }
        })
    }
  }
}
</script>

<style>

.cartCard {
    width: 100%;
    border-top: 2px solid gray;
    border-bottom: 2px solid gray;
}

.cartCard img {
    height: 65px;
}

.cartCard p {
    font-weight: 800;
}

.habisName{
    width: 200px;
}

.habiName i {
    cursor: pointer;
}

.habiName i:hover{
    color: rgb(240, 61, 61);
}

</style>
