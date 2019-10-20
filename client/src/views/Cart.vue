<template>
  <div class="all">
    <h1>My Cart</h1>
    <div class="halfhalf">
    <div class="half1">
      <table class="table is-bordered">
        <thead>
          <tr>
            <th>Item</th>
            <th>
              <abbr>Qty</abbr>
            </th>
            <th>
              <abbr>price</abbr>
            </th>
            <th>
              <abbr>Total</abbr>
            </th>
            <th>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item._id">
            <td ><router-link :to="'/cart/'+item._id">{{item.name}}</router-link></td>
            <td>
              {{item.quantity}}
            </td>
            <td>{{item.pricerp}}</td>
            <td>{{item.sumrp}}</td>
            <td>
              <div class="update">
              <b-button class="mini" @click="toCart(item._id)" size="is-small is-success"></b-button>
              <b-button class="mini" @click="delCart(item._id)" size="is-small is-primary"></b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <h4>Total Payment <b>{{totalPayment}}</b></h4>
        <br>
      </div>
      <div class="buton">
        <b-button class="is-danger" @click="toshop">Back</b-button>
        <b-button class="is-success" @click="pay">Pay Now</b-button>
      </div>
    </div>
    <router-view class="half2"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Cart',
  computed: {
    ...mapState(['cart']),
    items () {
      let cart = this.cart
      let listItem = {}
      for (let i = 0; i < cart.length; i++) {
        listItem[cart[i]._id] = {
          _id: cart[i]._id,
          name: cart[i].name,
          featured_image: cart[i].featured_image,
          price: cart[i].price,
          sum: 0,
          quantity: 0
        }
      }
      for (let k in listItem) {
        for (let i = 0; i < cart.length; i++) {
          if (k === cart[i]._id) {
            listItem[k].quantity += 1
          }
        }
        listItem[k].sum = listItem[k].price * listItem[k].quantity
        listItem[k].sumrp = listItem[k].sum.toLocaleString('id', { style: 'currency', currency: 'IDR' })
        listItem[k].pricerp = listItem[k].price.toLocaleString('id', { style: 'currency', currency: 'IDR' })
      }
      return Object.values(listItem)
    },
    totalPayment () {
      let totalPayment = 0
      this.items.forEach(element => {
        totalPayment += element.sum
      })
      return totalPayment.toLocaleString('id', { style: 'currency', currency: 'IDR' })
    }
  },
  methods: {
    toshop () {
      console.log('hereee')
      this.$router.push({ path: '/shop' })
    },
    toCart (id) {
      this.$store.dispatch('addCart', { itemId: id })
    },
    delCart (id) {
      this.$store.dispatch('removeCart', { itemId: id })
    },
    pay () {
      this.$store.dispatch('payNow')
    }
  }
}
</script>

<style scoped>
.update{
  display: flex;
  flex-direction: column
}
.mini{
  margin-bottom: 5px;
height: 20px;
width: 27px;
}
.halfhalf{
  display: flex;
  flex-direction: row;
  margin: 30px;
  width: calc(100vw - 60px);
  padding: 20px;
}
.half1{
  padding: 25px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: calc(50% - 50px);
}
.half2{
  padding: 14px;
  margin-left: 20px;
  width: 50%;
  border: rgb(9, 194, 40) 4pt dashed;
  border-radius: 10pt
}

h1{
  font-size: 30pt;
  color: aliceblue
}
.buton{
  width: 200px;
  margin: 10px;
  display: flex;
  justify-content: space-around
}

a {
color : rgb(17, 199, 17);
font-weight: bold
}

a.router-link-exact-active {
  color: #7957d5;
}

.all{
  background: linear-gradient(rgb(22, 20, 20), rgb(46, 31, 85));
  height: calc(100vh - 5.5vh);
  padding-top: 10px;
}

h4{
  color: white
}
</style>
