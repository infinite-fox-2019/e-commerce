<template>
  <div class="home">
    <b-card-group deck>
      <Product
        v-for="product in products"
        :key="product._id"
        :product="product"
        :customer="customer"
        @responseFromProduct="addSuccess"
        @updated="refresh"
        @deleted="refresh"
      />
    </b-card-group>
  </div>
</template>

<script>
// @ is an alias to /src
import Product from "@/components/Product.vue";
import Axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "home",
  components: {
    Product
  },
  props: {
    customer: Object
  },
  data() {
    return {
      products: []
    };
  },
  methods: {
    fetchProducts() {
      Axios({
        method: "get",
        url: "http://localhost:3000/product"
      })
        .then(({ data }) => {
          this.products = data;
        })
        .catch(console.log);
    },
    addSuccess(msg) {
      Swal.fire("Congratulations!", msg, "success");
    },
    refresh() {
      this.fetchProducts();
    }
  },
  mounted() {
    this.fetchProducts();
  }
};
</script>

<style scoped>
div {
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
}
</style>
