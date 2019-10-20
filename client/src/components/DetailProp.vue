<template>
  <div class="back">
    <figure>
        <img :src="item.featured_image" alt="" srcset="" style="object-fit:contain">
    </figure>
    <div class="name">
        <h1>{{item.name}}</h1>
    </div>
    <div class="desc">
        <p>{{item.description}}</p>
    </div>
    <div class="stck">
        <p>stock : <b>{{item.stock}}</b></p>
    </div>
    <div class="tags">
      <b-button class="is-primary" v-for="(tag, index) in item.tags" :key="index" style="margin:8px">{{tag}}</b-button>
    </div>
    <div class="price">
       <h3> {{priceItem}} </h3>
    </div>
    <div>
      <br>
      <b-button class="is-success is-large" @click="toCart(item._id)">Buy</b-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data () {
    return {
    }
  },
  computed: {
    priceItem () {
      if (this.item.price) {
        return this.item.price.toLocaleString('id', { style: 'currency', currency: 'IDR' })
      }
      return 'loading'
    }
  },
  methods: {
    toCart (id) {
      this.$store.dispatch('addCart', { itemId: id })
    }
  }
}
</script>

<style scoped>
.back{
  background: url(../assets/homeback.jpg);
  margin-top: -50px;
  z-index: 2;
  height: 500px;
  width: 500px;
}
img{
height: 40%;
width: 40%
}
h1{
  font-size: 28pt;
  font-weight: 500
}
h3{
  font-size: 16pt;
  font-weight: 400
}
.tags{
  display: flex;
  flex-direction: row;
  justify-content: center
}
</style>
