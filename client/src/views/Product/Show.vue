<template>
  <div id="product-list">
    <div class="row mt-5">
      <div class="col-md-12">
        <div class="card">
          <div class="row">
            <div class="col-md-6">
              <a href="#">
                <img :src="product.image" class="card-img-top" alt="..." />
              </a>
            </div>
            <div class="col-md-6 pt-5">
              <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
                <p class="text-warning">Rp. {{ product.price }}</p>
                <p>{{ product.des }}</p>
                <button
                  v-if="!isAdmin"
                  @click="addToCart({ product: product._id, quantity: 1 })"
                  class="btn btn-primary"
                  style="width:100%"
                >
                  Add to cart
                  <i class="fa fa-plus ml-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      product: {}
    };
  },
  created() {
    this.getProduct();
  },
  methods: {
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
    },
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
          this.product = data;
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
