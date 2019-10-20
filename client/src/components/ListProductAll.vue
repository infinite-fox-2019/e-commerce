<template>
    <div class="container">
      <div class="d-flex justify-content-center flex-wrap">
        <div class="col">
          <div class="sm-2 md-3">
            <div v-for="(item, index) in arrProductAll" class="card" v-bind:key="index" style="max-width: 18rem;">
              <h2 class="card-title" v-html="item.product">
              </h2>
              <h4 class="card-text" v-html="item.category"></h4>
              <img :src="item.picture" alt="image">
              <label for="stock">Stock :</label>
              <h3 class="card-text" v-html="item.stock"></h3>
              <label for="price">Price :</label>
              <h4 class="card-text" v-html="item.price"></h4>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => {
    return {
      product: '',
      price: '',
      category: '',
      stock: ''
    }
  },
  computed: {
    ...mapState(['arrProductAll'])
  },
  created () {
    this.$store.dispatch('showAllProduct')
  }
}
</script>

<style>
.container {
    max-width: 80%;
    max-height: 100%;
}
.card {
    max-width: 400px;
    margin-top: 20px;
    padding: 10px;
    flex-wrap: wrap;
}
img {
  height: 250px;
  width: 100%;
}
</style>
