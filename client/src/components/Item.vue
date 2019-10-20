<template>
   <div class="card column is-one-fifth mar">
  <div class="card-content">
    <p>
      {{item.name}}
    </p>
    <figure>
  <img :src="item.featured_image">
</figure>
    <p class="subtitle">
      {{price}}
    </p>
  </div>
  <footer class="card-footer">
      <div class="card-footer-item">
        <b-button type="is-primary" class="btm"  @click="toDetail(item._id)">Show More</b-button>
        <b-button type="is-success" class="btm" v-if="isLogin && maximum !== 0" @click="addTOcart(item._id)">Buy Item</b-button>
      </div>
  </footer>
</div>
</template>

<script>
export default {
  name: 'item',
  props: ['item'],
  data () {
    return {
      maximum: 0
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    price () {
      return this.item.price.toLocaleString('id', { style: 'currency', currency: 'IDR' })
    }
  },
  methods: {
    addTOcart (id) {
      this.$store.dispatch('addCart', { itemId: id })
      this.maximum -= 1
    },
    toDetail (id) {
      // console.log(this.$router)
      this.$router.push({ path: '/shop/item/' + id })
      // this.$router.push({ path: '/' })
    }
  },
  created () {
    this.maximum = this.item.stock
  }
}
</script>

<style scoped>
.btm{
    margin-top: 4px;
    margin-left: 4px;
    margin-right: 4px
}
.mar{
  margin: 25px;
}
.board{
    padding: 30px
}
img{
  width: 265px;
  height: 256px;
  object-fit: contain
}
</style>
