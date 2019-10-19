<template>
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
            <button class="button">
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
          <div v-if="this.$store.state.userRole === 'customer'" class="row">
            <button class="button is-danger add-cart-button">
              <i class="fa fa-cart-plus" style="margin-right: 5px;"></i>
              to Cart
            </button>
          </div>
          <div class="row has-text-grey">
            <hr>
            {{ product.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailContent',
  data () {
    return {
      product: ''
    }
  },
  methods: {
    toUpdate () {
      this.$router.push(`/update-product/${this.product._id}`)
    }
  },
  created () {
    this.product = this.$store.state.products.find(x => x._id === this.$route.params.id)
  }
}
</script>

<style>
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
}
</style>
