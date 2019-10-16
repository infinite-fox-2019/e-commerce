<template>
  <div>
    <b-card
      bg-variant="light"
      :title="product.name"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-text>{{ product.description }}</b-card-text>
      <b-card-text>Price : {{ product.price }}</b-card-text>
      <b-card-text>Available : {{ product.stock }}</b-card-text>
      <b-button @click="addToCart(product._id)" variant="outline-dark">Add To Cart</b-button>
      <b-button @click="update(product)" v-if="checkAuthorized()" variant="outline-danger"> Update Data </b-button>
    </b-card>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "Product",
  props: {
    product: Object,
    customer: Object
  },
  methods: {
    addToCart(product_id) {
      if (!this.customer) {
        this.$router.push("/login")
      } else {
        Axios({
          method: "post",
          url: "http://localhost:3000/cart",
          headers: { token: localStorage.getItem("token") },
          data: { product_id }
        })
        .then(({ data }) => {
          const { response } = data
          this.$emit("responseFromProduct", response)
        })
        .catch(console.log)
      }
    },
    checkAuthorized() {
      return this.customer ? ((this.customer.role === "admin" || this.customer.role === "owner") ? true : false) : false
    },
    update(product) {
      console.log(product)
    }
  }
};
</script>

<style scoped>
div {
  margin: 10px;
}
.card-body {
  width: 100%;
}
.btn {
  margin: 10px;
}
</style>
