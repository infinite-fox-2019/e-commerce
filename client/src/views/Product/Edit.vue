<template>
  <div v-if="isAdmin" class="row mt-5">
    <div class="col-md-12">
      <form @submit.prevent="updateProduct">
        <div class="form-group">
          <label for="#">Product name</label>
          <input autofocus type="text" class="form-control" v-model="name" />
        </div>
        <div class="form-group">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroupFileAddon01"
                >Product Image</span
              >
            </div>
            <div class="custom-file">
              <input
                type="file"
                class="custom-file-input"
                id="inputGroupFile01"
                aria-describedby="inputGroupFileAddon01"
                ref="file"
                v-on:change="handlefileupload($event)"
              />
              <label class="custom-file-label" for="inputGroupFile01"
                >Choose file</label
              >
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="#">Price</label>
          <input type="number" class="form-control" v-model="price" />
        </div>
        <div class="form-group">
          <label for="#">Description</label>
          <textarea class="form-control" rows="3" v-model="des"></textarea>
        </div>
        <div class="form-group">
          <label for="#">Stock</label>
          <input type="number" class="form-control" v-model="stock" />
        </div>
        <button class="btn btn-warning" style="width:100%">
          Update Product
          <i class="fa fa-plus ml-2"></i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "product-edit",
  computed: {
    ...mapState(["isAdmin", "token"])
  },
  data() {
    return {
      name: "",
      price: "",
      stock: "",
      des: "",
      image: ""
    };
  },
  created() {
    this.getProduct();
  },
  methods: {
    getProduct() {
      this.axios({
        headers: {
          token: localStorage.getItem("token")
        },
        method: "get",
        url: `/products/${this.$route.params.id}`,
        baseURL: this.baseURL
      })
        .then(({ data }) => {
          (this.name = data.name),
            (this.price = data.price),
            (this.stock = data.stock),
            (this.des = data.des);
        })
        .catch(err => {
          this.Swal.fire({
            type: "error",
            text: err.response.data.message[0]
          });
        });
    },
    handlefileupload() {
      let file = event.target.files || event.dataTransfer.files;
      this.image = file[0];
    },
    updateProduct() {
      let formData = new FormData();
      formData.set("name", this.name);
      formData.set("des", this.des);
      formData.set("stock", this.stock);
      formData.set("price", this.price);
      formData.set("image", this.image);
      this.Swal.fire({
        title: "Updating product",
        allowOutsideClick: () => !this.Swal.isLoading()
      });
      this.Swal.showLoading();
      this.axios({
        url: `/products/${this.$route.params.id}`,
        method: "patch",
        baseURL: this.baseURL,
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token")
        },
        data: formData
      })
        .then(() => {
          this.Swal.close();
          this.$router.push("/home/list");
        })
        .catch(err => {
          this.Swal.close();
          this.Swal.fire({
            type: "error",
            text: err.response.data.message[0]
          });
        });
    }
  }
};
</script>

<style></style>
