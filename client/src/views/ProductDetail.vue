<template>
    <div style="position: absolute;" class="flex justify-between items-center p-10 border border-black">
        <div class="p-10">
            <img :src="product.image" :alt="product.image" class="object-cover">
        </div>
        <div class="flex-column justify-around text-left p-4 m-6 border border-black">
            <span class="m-2">
              <h3><strong>{{ product.name }}</strong></h3>
            </span>
            <span class="m-2">
                <h5>In Stock: {{ product.stock}}</h5>
            </span>
            <span class="m-2">
              <h5>{{ priceUSD }}</h5>
            </span>
            <span class="m-2">
              <p>{{ product.description }}</p>
            </span>
            <div class="flex justify-end m-2 p-2">
                <div class="inline-block relative w-64 mx-4">
                  <select class=" p-2 block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" v-model="qty">
                    <option v-for="index in product.stock" :key="index">{{ index }}</option>
                  </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
                <button class="cursor-pointer border shadow bg-black hover:bg-gray-800 text-white hover:text-grey-900 p-2" @click.prevent="addToCart">Add to Cart</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'productDetail',
  data () {
    return {
      qty: null
    }
  },
  methods: {
    addToCart () {
      let qty = Number(this.qty)
      if (qty >= 1) {
        console.log(this.$route.params.id, qty)
        this.$store.commit('ADD_TO_CART', { id: this.$route.params.id, qty })
        this.$store.dispatch('updateCart')
      } else {
        alert('quantity must be minimum of 1!')
      }
    }
  },
  computed: {
    product () {
      return this.$store.state.product
    },
    priceUSD () {
      return this.product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    }
  },
  created () {
    console.log(this.$route.params.id)
    this.$store.dispatch('getProduct', { id: this.$route.params.id })
  }
}
</script>

<style>

</style>
