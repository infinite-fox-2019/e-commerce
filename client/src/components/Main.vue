<template>
  <div class="hello">
    <nav id="menu">
      <br><br><br>
      <div class="profile">
        <h1>{{user.name}}</h1>
        <p>{{user.email}}</p>
      </div>
      <div class="butttons">
      <b-button type="is-primary" class="btm" @click="toCart">Cart ({{totalItems}})</b-button>
      <b-button type="is-success" class="btm" @click="mytransactions">Transactions</b-button>
      <div class="toleft">
        <b-button class="toggle-button is-medium" @click="show" style="border-radius:50%; width:40px; height:40px"><i class="fas fa-undo"></i></b-button>
      </div>
      </div>
    </nav>
    <main id="panel">
      <header>
        <div class="linkin">
          <div class="leftleft">
          <b-button class="toggle-button is-medium is-success mx active"  @click="none" v-if="isLogin" style="border-radius:50%; width:40px; height:40px"><i class="fas fa-user"></i></b-button>
          <router-link class="mx" to="/shop">All Items</router-link>
          <router-link class="mx" to="/shop/bestseller">Best Seller</router-link>
          <router-link class="mx" to="/shop/profesional">Profesional Item</router-link>
          <router-link class="mx" to="/shop/kids">Art For Kids</router-link>
          <router-link class="mx" to="/shop/paint">Paint</router-link>
          <router-link class="mx" to="/shop/brush">Paint Brush</router-link>
          </div>
          <b-button class="toggle-button is-medium cartnya is-success mr"  @click="toCart" v-if="isLogin" style="border-radius:12pt; width:60px; height:40px">
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
      this.width = 'calc(100vw - 255px)'
      document.getElementsByClassName('active')[0].style.visibility = 'hidden'
    },
    show () {
      this.width = '100vw'
      document.getElementsByClassName('active')[0].style.visibility = 'visible'
    },
    toCart () {
      this.$router.push({ path: '/cart' })
    },
    mytransactions () {
      this.$router.push({ path: '/transactions' })
    }
  },
  computed: {
    ...mapState(['cart', 'isLogin', 'user']),
    totalItems () {
      return this.cart.length
    }
  },
  created () {
    this.width = '100vw'
  }
}
</script>

<style scoped>
.table{
  margin: 0 auto
}
.butttons{
  width: 180px;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 15px
}
header{
  background: black;
  padding: 10px;
  width: 100vw;
}
#menu{
  top: 47px;
  min-height: 100vh;
  width: 260px
}
.item{
  min-height: 100vh;
  width: 100%;
  background-color: aliceblue;
}
.profile h1{
  font-size: 28pt;
  font-weight: 500
}
.cartnya{
  align-self: flex-end;
  font-size: 10pt !important
}
.linkin{
  font-size: 13pt !important;
  font-weight: 500;
  width: 100%;
  display: flex;
  justify-content: space-between
}
.mx{
  margin-bottom: 10px;
  margin-left: 15px;
  margin-right: 15px;
}
.mr{
  display: flex;
  margin-bottom: 10px;
  margin-right: 15px;
  margin-right: 15px
}

.leftleft{
  display: flex;
  align-items: center
}

.leftleft a{
  color: rgb(155, 104, 212);
}

.leftleft a.router-link-exact-active {
  color: rgb(245, 92, 123);
}

.leftleft a:hover{
  color: #21C65B;
}
</style>
