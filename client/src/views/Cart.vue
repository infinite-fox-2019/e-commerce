<template>
  <div>
    <div class="flex flex-wrap justify-center items-center">
      <div class="flex justify-between px-8 py-4 m-4 w-2/3 border shadow" v-for="cart in myCart" :key="cart._id">
        <div class="flex justify-center boder border-blue-400 p-2 w-1/2">
          <div class="shadow p-2">
            <img :src="cart.id.image" :alt="cart.id.image" class="h-40 object-scale-down">
          </div>
        </div>
        <div class="flex justify-between w-1/2">
          <div class="flex items-center p-2">
            <div class="flex-column items-start">
              <p>{{ cart.id.name }}</p>
              <p>{{ cart.qty }} pcs</p>
            </div>
          </div>
          <div class="flex items-center p-2 mx-8">
            <p><strong>$ {{ cart.qty * cart.id.price }}</strong></p>
          </div>
          <div class="flex items-center p-2 mx-8">
            <button @click.prevent="deleteFromCart(cart._id)" class="bg-black text-white hover:bg-gray-800 p-2 rounded">Delete</button>
          </div>
        </div>
      </div>
    </div>
      <div class="flex flex-wrap justify-center items-center">
         <div class="flex justify-end px-8 py-4 m-4 w-2/3 border shadow">
          <div class="px-10"><p><strong>Total:</strong></p></div>
          <div class="px-10"><p><strong>  $ {{ totalPrice }}</strong></p></div>
         </div>
      </div>
       <div class="flex flex-wrap justify-center items-center w-full">
         <div class="flex justify-center py-4 m-4 w-full border shadow">
          <button class="bg-black hover:bg-gray-800 px-8 text-white hover:text-gray-100 border hover:border-white p-2" @click.prevent="checkout">Checkout</button>
         </div>
      </div>
  </div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('getCart')
  },
  computed: {
    totalPrice () {
      let price = 0
      this.$store.state.cart.forEach(el => {
        price += el.id.price
      })
      console.log(price)
      return price
    },
    myCart () {
      return this.$store.state.cart
    }
  },
  methods: {
    checkout () {
      this.$store.dispatch('checkout', { price: this.totalPrice })
    },
    deleteFromCart (id) {
      this.$store.dispatch('deleteFromCart', { id })
    }
  }
}
</script>

<style>

</style>
