<template>
<transition name="slide">
  <div class="detail d-flex justify-content-center align-items-center">
      <div class="box d-flex">
          <div class="d-flex align-items-center productimage">
              <img :src="product.image" alt="">
          </div>
          <div class="producDes d-flex flex-column align-items-end p-3">
            <div class="align-self-end pr-3">
                <router-link to="/">x</router-link>
            </div>
            <div>
                <h3 class="text-left pl-3">{{ product.name }}</h3>
                <p class="text-left pl-4">{{ '$'+product.price+'.00' }}</p>
                <p class="text-left pl-4">{{product.description}}</p>
                <hr>
                <p class="text-left pl-4 text-info"> Stock: {{ product.stock }}</p>
                <hr>
                <p class="text-left pl-4">{{ product.description }}</p>
                <div class="d-flex mt-3" v-if="!isAdmin">
                    <input  v-model="qty" type="number" class="text-center">
                    <button class="btn btn-secondary" @click="addToCart">Add To Cart</button>
                </div>
            </div>
          </div>
      </div>
  </div>
</transition>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['product', 'isAdmin']),
  data () {
    return {
      qty: 1
    }
  },
  methods: {
    addToCart () {
      if (this.qty > 0) {
        this.$store.dispatch('addToCart', { productId: this.product._id, qty: this.qty })
      } else {
        // this.$swal('Count minimal is 1!');
        console.log('Count minimal is 1!')
      }
    }
  },
  created () {
    this.$store.dispatch('getOneProduct', this.$route.params.id)
  }
}
</script>

<style>
@keyframes slide-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.slide-enter-active {
  animation: slide-in .4s
}
.slide-leave-active /* .fade-leave-active below version 2.1.8 */ {
  animation: slide-in .4s reverse
}

.detail {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
}

.box{
    height: 80%;
    width: 75%;
    background: rgba(255, 255, 255);
    border-radius: 10px;
}

.box .productimage{
    height: 100%;
}

.box .productimage img{
    height: 80%;
    padding: 10px;
}

.box input {
    width: 50px;
    height: 38px;
    margin: 0 15px;
}

.box .producDes{
    height: 100%;
}
</style>
