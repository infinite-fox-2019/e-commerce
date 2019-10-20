<template>
  <div class="hello">
    <nav id="menu">
      <div class="profile">
        <h1>{{user.name}}</h1>
        <p>{{user.email}}</p>
      </div>
      <div class="butttons">
      <b-button type="is-primary" class="btm">Cart ({{totalItems}})</b-button>
      <b-button type="is-success" class="btm">Update Delivery Status</b-button>
      <b-button type="is-danger" class="btm">History</b-button>
      <div class="toleft">
        <b-button class="toggle-button is-medium" @click="show" style="border-radius:50%; width:40px; height:40px"><i class="fas fa-undo"></i></b-button>
      </div>
      </div>
      <!-- <div>
        <table class="table is-bordered" >
          <thead>
            <tr>
              <th>Item</th>
              <th><abbr>Qty</abbr></th>
              <th><abbr>price</abbr></th>
              <th><abbr>Total</abbr></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>item</td>
              <td><input type="number" name="" id="" style="width:45px" min="1"></td>
              <td>price</td>
              <td>total</td>
            </tr>
          </tbody>
        </table>
      </div> -->
    </nav>
    <main id="panel">
      <header>
        <div class="linkin">
          <b-button class="toggle-button is-medium is-success mx"  @click="none" v-if="isLogin" style="border-radius:50%; width:40px; height:40px"><i class="fas fa-user"></i></b-button>
          <router-link class="mx" to="/shop">All Items</router-link>
          <router-link class="mx" to="/shop/bestseller">Best Seller</router-link>
          <router-link class="mx" to="/shop/profesional">Profesional Item</router-link>
          <router-link class="mx" to="/shop/kids">Art For Kids</router-link>
          <router-link class="mx" to="/shop/paint">Paint</router-link>
          <router-link class="mx" to="/shop/brush">Paint Brush</router-link>
          <b-button class="toggle-button is-medium cartnya is-success mr"  @click="none" v-if="isLogin" style="border-radius:12pt; width:60px; height:40px">
            <span class="cartnya">{{totalItems}}<i class="fas fa-shopping-cart"></i></span></b-button>
        </div>
      </header>
      <div class="item" :style="{width : width}">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Main',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      width: '100vw'
    }
  },
  methods: {
    none () {
      this.width = 'calc(100vw - 260px)'
      document.getElementsByClassName('active')[0].style.visibility = 'hidden'
    },
    show () {
      this.width = '100vw'
      document.getElementsByClassName('active')[0].style.visibility = 'visible'
    }
  },
  computed: {
    ...mapState(['cart', 'isLogin', 'user']),
    totalItems () {
      return this.cart.length
    }
  },
  created () {
  }
}
</script>

<style scoped>
.table{
  margin: 0 auto
}
.butttons{
  width: 180px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 15px
}
header{
  display: flex;
  justify-content: flex-start;
  background: black;
  height: 9vh;
}
#menu{
  min-height: 100vh;
  width: 260px
}
.item{
  min-height: 100vh;
  width: 100%;
  background-color: aliceblue;
}
table{
  font-size: 9pt
}
.profile h1{
  font-size: 28pt;
  font-weight: 500
}
.cartnya{
  font-size: 10pt !important
}
.linkin{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 13pt !important;
  font-weight: 500
}
.mx{
  margin-left: 15px;
  margin-right: 15px
}
</style>
