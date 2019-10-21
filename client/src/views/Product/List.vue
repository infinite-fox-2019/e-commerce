<template>
  <div id="product-list">
    <div v-if="isAdmin" class="row mt-5">
      <div class="col-md-12 d-flex justify-content-center">
        <button
          @click="$router.push('/home/add')"
          class="btn btn-warning"
          style="width:100%"
        >
          Add Product
          <i class="fa fa-plus ml-2"></i>
        </button>
      </div>
    </div>
    <div class="row mt-5">
      <div v-for="product in products" :key="product._id" class="col-md-3">
        <div class="card">
          <a @click.prevent="show(product._id)" href="#">
            <img :src="product.image" class="card-img-top" alt="..." />
          </a>
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="text-warning">Rp. {{ product.price }}</p>
            <button
              v-if="!isAdmin"
              @click="addToCart({ product: product._id, quantity: 1 })"
              class="btn btn-primary"
              style="width:100%"
            >
              Add to cart
              <i class="fa fa-plus ml-2"></i>
            </button>
            <div v-if="isAdmin">
              <hr />
              <button
                @click="editProduct(product._id)"
                class="btn btn-info"
                style="width:100%"
              >
                Edit Product
                <i class="fa fa-edit ml-2"></i>
              </button>
              <hr />
              <button
                @click="deleteProduct(product._id)"
                class="btn btn-danger"
                style="width:100%"
              >
                Delete Product
                <i class="fa fa-trash ml-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "product-list",
  computed: {
    ...mapState(["isAdmin", "products"])
  },
  created() {
    this.fetchProduct();
  },
  methods: {
    ...mapMutations(["initProduct"]),
    fetchProduct() {
      this.axios({
        url: "/products",
        method: "get",
        baseURL: this.baseURL
      })
        .then(response => {
          const { data } = response;
          this.initProduct({
            data
          });
        })
        .catch(err => {
          this.Swal.fire({
            type: "error",
            text: err.response.data.message[0]
          });
        });
    },
    show(id) {
      this.$router.push(`/home/show/${id}`);
    },
    editProduct(id) {
      this.$router.push(`/home/edit/${id}`);
    },
    deleteProduct(id) {
      this.Swal.fire({
        text: "Permanent delete.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Delete"
      })
        .then(result => {
          if (result.value) {
            this.Swal.fire({
              title: "Deleting product",
              allowOutsideClick: () => !this.Swal.isLoading()
            });
            this.Swal.showLoading();
            return this.axios({
              url: `/products/${id}`,
              method: "delete",
              baseURL: this.baseURL,
              headers: {
                token: localStorage.getItem("token")
              }
            });
          }
        })
        .then(() => {
          this.fetchProduct();
          this.Swal.close();
        })
        .catch(err => {
          this.Swal.close();
          this.Swal.fire({
            type: "error",
            text: err.response.data.message[0]
          });
        });
    },
    addToCart(obj) {
      this.axios({
        headers: {
          token: localStorage.getItem("token")
        },
        method: "patch",
        url: "/users/carts/push",
        baseURL: this.baseURL,
        data: {
          product: obj.product,
          quantity: obj.quantity
        }
      })
        .then(({ data }) => {
          this.Swal.fire({
            type: "success",
            text: data.message
          });
        })
        .catch(err => {
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
