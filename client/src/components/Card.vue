<template>
 <div class="card flex m-4 shadow items-between flex-wrap justify-center" style="height:500px;">
   <div class="flex-column justify-center items-center">
    <div class="flex justify-center items-center p-4 h-1/2" >
      <img :src="product.image" :alt="product.image" style="width:300px; height:300px object-fit:fill;" class="rounded">
    </div>
    <div class="p-4 flex-column justify-end">
      <h1>{{ product.name }}</h1>
      <h2>{{ priceUSD }}</h2>
      <h5>In Stock: {{ product.stock}}</h5>
      <p class="title">{{ productSummary }}</p>
    </div>
   </div>
   <div class="flex items-end w-full">
    <div class="w-full p-4 h-20">
      <button @click.prevent="goToDetail" class="w-full bg-black text-white hover:bg-gray-800 hover:text-gray-100 p4">Detail</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['product'],
  methods: {
    goToDetail () {
      this.$router.push(`/products/${this.product._id}`)
    }
  },
  computed: {
    productSummary () {
      return this.product.description.slice(0, 140) + '...'
    },
    priceUSD () {
      return this.product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    }
  }
}
</script>

<style>
</style>
