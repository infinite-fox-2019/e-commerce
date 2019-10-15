<template>
  <div class="product-container">
    <div>
      <img :src="product.image"/>
    </div>
    <div>
      <strong>{{ product.name }}</strong>
    </div>
    <div class="has-text-grey">
      <small>{{ product.brand }}</small>
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
}

.is-text-reddish {
  color: #f73737;
}
</style>
