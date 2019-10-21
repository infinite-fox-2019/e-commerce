<template>
<div>
  <Navbar></Navbar>
  <div class="box-product">
    <p class="title">Cart List</p>
    <div class="container box">
      <p>{{total}}</p>
      <CartList v-for="cart in carts" :key="cart._id" :cart="cart" />
    </div>
    <div style="margin-left: 25px;">
      <p><b> Sub Total : Rp.{{total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}}</b></p><br>
      <button class="button is-success ">Checkout</button>
    </div>
  </div>
</div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import CartList from '../components/CartList.vue'

export default {
  name: 'Carts',
  components: {
    Navbar,
    CartList
  },
  data () {
    return {
    }
  },
  computed: {
    carts: {
      get () {
        return this.$store.state.carts
      }
    },
    total: {
      get () {
        let total1 = 0
        this.carts.forEach(el => {
          total1 += el.totalPrice
        })
        return total1
      }
    }
  },
  watch: {
    carts () {}
  },
  created () {
    this.$store.dispatch('getCart')
    // this.carts = this.$store.state.carts
  }
}
</script>
<style scoped>
.box-product {
    margin: 50px 15%;
    width: 50%;
}
.container {
  padding-left: 10%;
  max-height: 400px;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
    /* display: flex ;
    flex-wrap: wrap;
    justify-content: space-around; */
}
.card {
    margin-top: 100px;
    height: 430px;
    width: 300px;
    overflow: hidden;
    margin: 20px;
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
