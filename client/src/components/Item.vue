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
        <b-button type="is-primary" class="btm">Show More</b-button>
        <b-button type="is-success" class="btm" v-if="isLogin">Buy Item</b-button>
      </div>
  </footer>
</div>
</template>

<script>
export default {
  name: 'item',
  props: ['item'],
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    price () {
      return this.item.price.toLocaleString('id', { style: 'currency', currency: 'IDR' })
    }
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
