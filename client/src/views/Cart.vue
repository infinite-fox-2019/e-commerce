<template>
  <a-row>
    <a-col span="1"></a-col>
    <a-col span="22">
      <br />
      <h1>Sansmarket Cart!</h1>
      <div class="wrapper" v-if="user.cart.length">
        <CartCard v-for="(product, i) in user.cart" :key="i" :product="product"></CartCard>
      </div>
      <div v-else class="wrapper" id="empty">
        <a-empty
          image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
        >
          <span slot="description">
            Your cart is still empty, start shopping now!
            <a @click="toHome">Start shopping!</a>
          </span>
        </a-empty>
      </div>
      <div id="container">
        <a-button
          type="primary"
          shape="round"
          icon="plus-square"
          size="large"
          block
          @click="calculateCart"
        >Checkout</a-button>
      </div>

      <a-modal v-model="visible" title="Checkout form" onOk="handleOk" >
        <template slot="footer">
          <a-button key="back" @click="handleCancel">Cancel</a-button>
          <a-button key="submit" type="primary" :loading="loading" @click="handleOk">Checkout</a-button>
        </template>

        <a-table :columns="columns" :dataSource="cart" bordered :pagination="pagination"></a-table>
      </a-modal>
    </a-col>
    <a-col span="1"></a-col>
  </a-row>
</template>
<script>
import { mapState } from "vuex";
import CartCard from "../components/CartCard";

const columns = [
  {
    title: "Name",
    dataIndex: "product.name"
  },
  {
    title: "quantity",
    className: "quantity",
    dataIndex: "qty"
  },
  {
    title: "price",
    dataIndex: "totalPrice"
  }
];
export default {
  name: "cart",
  components: {
    CartCard
  },
  data() {
    return {
      loading: false,
      visible: false,
      total: 0,
      cart: [],
      columns,
      pagination : false
    };
  },
  methods: {
    toHome() {
      this.$router.push("/");
    },
    calculateCart() {
      let obj = {};
      let total = 0;
      let container = []
      this.user.cart.forEach(product => {
        total += product.price;
        if (!obj[product._id]) {
          obj[product._id] = {
            product,
            qty: 1,
            totalPrice: product.price
          };
        } else {
          obj[product._id].qty++;
          obj[product._id].totalPrice += product.price;
        }
      });
      (this.container = obj), (this.total = total);
      for(let key in obj){
          container.push(obj[key])
      }
      this.cart = container
      this.visible = true;
    },
    handleCancel(e) {
      this.visible = false;
    },
    handleOk(e) {
      this.visible = false;
      this.$store.dispatch('checkout' , {cart : this.cart} )
      // .then( data => {
      //   console.log(data)
      // })
      // .catch(err => {
      //   console.log(err.response)
      // })
    }
  },
  computed: mapState(["user"])
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Lobster|Varela+Round&display=swap");
h1 {
  font-family: "Lobster", cursive;
  margin: 2vh;
  font-size: 48px;
}
#container {
  padding: 2vh 12vh;
}
.wrapper {
  padding: 1vh;
  border: 0.51px solid rgb(209, 209, 209) !important;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-self: center;
  justify-content: center;
  background-color: rgb(251, 251, 251);
  min-height: 50vh;
}
#empty {
  padding: 12vh;
}
</style>
