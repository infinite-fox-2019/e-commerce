<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
      <b-breadcrumb-item to="/cart" v-if="this.$store.state.user && this.$store.state.user.role === 'customer'">Cart</b-breadcrumb-item>
      <b-breadcrumb-item to="/register" v-if="!this.$store.state.user">Sign Up</b-breadcrumb-item>
      <b-breadcrumb-item
        v-b-modal="'create'"
        v-if="this.$store.state.user && (this.$store.state.user.role === 'admin' || this.$store.state.user.role === 'owner')"
        >Add New</b-breadcrumb-item
      >
      <b-breadcrumb-item @click="logout" v-if="this.$store.state.user">Logout</b-breadcrumb-item>
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
      this.$store.commit("LOGOUT");
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
    },
    create() {
      const formdata = new FormData();
      formdata.append("name", this.name);
      formdata.append("description", this.description);
      formdata.append("stock", this.stock);
      formdata.append("price", this.price);
      formdata.append("file", this.file);
      Axios({
        method: "post",
        url: "http://localhost:3000/product",
        headers: { token: localStorage.getItem("token") },
        data: formdata
      })
        .then(({ data }) => {
          const { response } = data;
          Swal.fire("Congratulations!", response, "success");
          this.$store.dispatch("fetchProducts");
          if (this.$route.path !== "/") {
            this.$router.push("/");
          } else {
            this.$bvModal.hide("create");
          }
        })
        .catch(console.log);
    }
  }
};
</script>
