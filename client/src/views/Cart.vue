<template>
  <div>
    <b-list-group>
      <b-list-group-item v-for="Item in cart" :key="Item._id">
        <Item :Item="Item" />
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import Axios from "axios";
import Item from "@/components/Item.vue";
export default {
  name: "cart",
  components: {
    Item
  },
  props: {
    product: Object
  },
  data() {
    return {
      cart: []
    };
  },
  methods: {
    fetchCart() {
      Axios({
        method: "get",
        url: "http://shopify-server.ricky-works.online/cart",
        headers: {
          token: this.$attrs.customer.token
        }
      }).then(({ data }) => {
        this.cart = data;
      });
    }
  },
  created() {
    if (!this.$attrs.customer) {
      this.$router.push("/login");
    } else {
      this.fetchCart();
    }
  },
  watch: {
    cart() {
      this.fetchCart();
    }
  }
};
</script>

<style scoped>
.list-group-item {
  width: 60%;
  margin-left: 20%;
}
</style>
