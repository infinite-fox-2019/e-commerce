<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
      <b-breadcrumb-item to="/cart" v-if="user">Cart</b-breadcrumb-item>
      <b-breadcrumb-item to="/register" v-else>Sign Up</b-breadcrumb-item>
      <b-breadcrumb-item
        v-b-modal="'create'"
        v-if="user && (user.role === 'admin' || user.role === 'owner')"
        >Add New</b-breadcrumb-item
      >
      <b-breadcrumb-item @click="logout" v-if="user">Logout</b-breadcrumb-item>
      <b-breadcrumb-item to="/login" v-else>Login</b-breadcrumb-item>
      <b-breadcrumb-item></b-breadcrumb-item>
    </b-breadcrumb>
    <b-modal id="create" hide-footer>
      <b-form @submit.prevent="create" enctype="multipart/form-data">
        <b-form-group label="Name:">
          <b-form-input
            v-model="name"
            type="text"
            placeholder="Name"
            required
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
        <b-form-group label="Image:">
          <b-form-file
            v-model="file"
            :state="Boolean(file)"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
          ></b-form-file>
        </b-form-group>
        <b-button type="submit" variant="primary">Add</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Axios from "axios";

export default {
  name: "Navbar",
  props: {
    user: Object
  },
  data() {
    return {
      routes: [],
      name: "",
      description: "",
      stock: 0,
      price: 0,
      file: null
    };
  },
  methods: {
    logout() {
      this.$emit("logout");
    },
    create() {
      const data = {
        name: this.name,
        description: this.description,
        stock: this.stock,
        price: this.price,
        file: this.file
      };
      Axios({
        method: "post",
        url: "http://shopify-server.ricky-works.online/product",
        headers: { token: localStorage.getItem("token") },
        data
      })
        .then(({ data }) => {
          const { response } = data;
          Swal.fire("Congratulations!", response, "success");
        })
        .catch(console.log);
    }
  }
};
</script>
