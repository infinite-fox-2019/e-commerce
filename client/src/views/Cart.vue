<template>
  <section id="cart-page" class="py-3">
    <div class="container">
      <navbar />
      <div class="row pt-5">
        <div class="col-md-12">
          <table class="table">
            <thead class="bg-primary text-white">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product Name</th>
                <th scope="col">Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cart, index) in carts" :key="index">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ cart.product.name }}</td>
                <td class="text-warning">Rp. {{ cart.product.price }}</td>
                <td>
                  <button
                    @click="pullCart(cart._id)"
                    class="btn btn-danger"
                    style="float:right"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-md-12">
          <table class="table">
            <thead class="bg-primary text-white">
              <tr>
                <th scope="col">Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-warning">Rp. {{ total }}</td>
              </tr>
            </tbody>
          </table>
          <button @click="checkout" class="btn btn-primary">
            checkout
            <i class="fa fa-check ml-2"></i>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "cart",
  data() {
    return {
      carts: []
    };
  },
  computed: {
    total() {
      let result = 0;
      this.carts.forEach(el => {
        result += el.product.price * el.quantity;
      });
      return result;
    }
  },
  components: {
    Navbar
  },
  created() {
    this.getCarts();
  },
  methods: {
    checkout() {
      this.axios({
        method: "post",
        url: "/transactions",
        baseURL: this.baseURL,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.Swal.fire({
            type: "success",
            text: data.message
          });
          this.getCarts();
        })
        .catch(err => {
          this.Swal.fire({
            type: "error",
            text: err.response.data.message[0]
          });
        });
    },
    pullCart(id) {
      this.axios({
        method: "patch",
        url: `/users/carts/${id}/pull`,
        baseURL: this.baseURL,
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(() => {
        this.getCarts();
      });
    },
    getCarts() {
      this.axios({
        method: "get",
        url: "/users/carts",
        baseURL: this.baseURL,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.carts = data;
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
