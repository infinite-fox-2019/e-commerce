<template>
  <div>
    <b-card
      bg-variant="light"
      :title="product.name"
      :img-src="product.file"
      style="width: 20rem;"
      class="mb-2"
    >
      <b-card-text>{{ product.description }}</b-card-text>
      <b-card-text>Price : Rp. {{ product.price }}</b-card-text>
      <b-card-text>Available : {{ product.stock }}</b-card-text>
      <b-button
        v-if="this.$store.state.user && this.$store.state.user.role === 'customer'"
        @click="addToCart(product._id)"
        variant="outline-dark"
        >Add To Cart</b-button
      >
      <b-button-group v-if="checkAuthorized()">
        <b-dropdown text="Option">
          <b-dropdown-item v-b-modal="`modal${product._id}`"
            >Update</b-dropdown-item
          >
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item @click="destroy(product._id)"
            >Destroy</b-dropdown-item
          >
        </b-dropdown>
      </b-button-group>
    </b-card>
    <b-modal :id="`modal${product._id}`" hide-footer>
      <b-form @submit.prevent="update">
        <b-form-group label="Name:">
          <b-form-input
            v-model="name"
            type="text"
            placeholder="Name"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Description:">
          <b-form-input
            v-model="description"
            type="text"
            placeholder="Description"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Stock:">
          <b-form-input v-model="stock" type="number"></b-form-input>
        </b-form-group>
        <b-form-group label="Price:">
          <b-form-input v-model="price" type="number"></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Update</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import Axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Product",
  props: {
    product: Object
  },
  data() {
    return {
      name: "",
      description: "",
      price: null,
      stock: null
    };
  },
  methods: {
    addToCart(product_id) {
      if (!this.$store.state.user) {
        this.$router.push("/login");
      } else {
        Axios({
          method: "post",
          url: "http://localhost:3000/cart",
          headers: { token: localStorage.getItem("token") },
          data: { product_id }
        })
          .then(({ data }) => {
            const { response } = data;
            this.$emit("responseFromProduct", response);
          })
          .catch(console.log);
      }
    },
    checkAuthorized() {
      return this.$store.state.user
        ? this.$store.state.user.role === "admin" || this.$store.state.user.role === "owner"
          ? true
          : false
        : false;
    },
    trigger() {
      this.$bvModal.show("modal");
    },
    update() {
      const defaultData = {
        name: this.name,
        description: this.description,
        stock: Number(this.stock),
        price: Number(this.price)
      };
      let data = {};
      for (let prop in defaultData) {
        if (
          defaultData[prop].length > 0 ||
          defaultData[prop] === Number(defaultData[prop])
        ) {
          data[prop] = defaultData[prop];
        }
      }
      Axios({
        method: "patch",
        url: `http://localhost:3000/product/${this.product._id}`,
        headers: { token: localStorage.getItem("token") },
        data
      })
        .then(({ data }) => {
          const { response } = data;
          this.$emit("updated");
          this.$bvModal.hide(this.product._id);
          Swal.fire("Congratulations!", response, "success");
        })
        .catch(console.log);
    },
    destroy(id) {
      Axios({
        method: "delete",
        url: `http://localhost:3000/product/${id}`,
        headers: { token: localStorage.getItem("token") }
      })
      .then(({ data }) => {
        const { response } = data
        Swal.fire("Congratulations!", response, "success");
        this.$emit("deleted");
      })
      .catch(console.log);
    }
  },
  mounted() {
    const { name, description, stock, price } = this.product;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
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
