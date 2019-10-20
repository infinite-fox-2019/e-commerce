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
      <ButtonTag  v-for="(tag, index) in item.tags" :key="index" :tag="tag"/>
    </div>
    <div class="price">
       <h3> {{priceItem}} </h3>
    </div>
    <div class="btnn">
      <b-button class="is-success is-large" @click="toCart(item._id)">Buy</b-button>
    </div>
  </div>
</template>

<script>
import ButtonTag from './ButtonTag.vue'

export default {
  data () {
    return {
    }
  },
  components: {
    ButtonTag
  },
  computed: {
    routerId () {
      console.log(this.$route)
      return this.$route.params.id
    },
    item () {
      return this.$store.state.itemDetail
    },
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
  },
  created () {
    console.log(this.$route.params)
    this.$store.dispatch('getItemDetail', this.$route.params.id)
  },
  watch: {
    routerId () {
      this.$store.dispatch('getItemDetail', this.routerId)
    }
  }
}
</script>

<style scoped>
.back{
  background: url(../assets/homeback.jpg)
}
img{
padding-top: 20px;
height: 32%;
width: 32%
}
h1{
  font-size: 28pt;
  font-weight: 500;
  color: black
}
h3{
  font-size: 16pt;
  font-weight: 400;
  color: black
}
.tags{
  display: flex;
  flex-direction: row;
  justify-content: center
}
p{
  color: black
}
.btnn{
  padding-top: 15px;
  padding-bottom: 30px
}
</style>
