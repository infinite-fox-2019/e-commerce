<template>
  <section id="cart-page" class="py-3">
    <div class="container">
      <navbar />
      <div class="row pt-5">
        <div class="col-md-12">
          <h4>
            Transaction : {{ new Date(transaction.createdAt).toDateString() }} /
            {{ transaction._id }}
          </h4>
          <table class="table">
            <thead class="bg-primary text-white">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product Name</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in transaction.items" :key="index">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ product.name }}</td>
                <td class="text-warning">Rp. {{ product.price }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "transaction-detail",
  data() {
    return {
      transaction: {}
    };
  },
  components: {
    Navbar
  },
  created() {
    this.getTransaction();
  },
  methods: {
    getTransaction() {
      this.axios({
        method: "get",
        url: `/transactions/${this.$route.params.id}`,
        baseURL: this.baseURL,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.transaction = data;
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
