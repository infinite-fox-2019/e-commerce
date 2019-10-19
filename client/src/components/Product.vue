<template>
  <div class="product-container" @click="seeDetail">
    <div>
      <img :src="product.image"/>
    </div>
    <div>
      <strong>{{ product.name }}</strong>
    </div>
    <div class="has-text-grey">
      <small>{{ product.series }}</small>
    </div>
    <div class="has-text-danger">
      <strong >{{ formattedPrice }}</strong>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object
  },
  methods: {
    seeDetail () {
      this.$router.push(`/products/${this.product._id}`)
    }
  },
  computed: {
    formattedPrice () {
      return `IDR ${this.product.price.toLocaleString()}`
    }
  }
}
</script>

<style scoped>
.product-container{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
}

.is-text-reddish {
  color: #f73737;
}
</style>
