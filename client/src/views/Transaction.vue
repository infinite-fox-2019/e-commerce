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
                <th scope="col">Transaction</th>
                <th scope="col">Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(transaction, index) in transactions" :key="index">
                <th scope="row">{{ index + 1 }}</th>
                <td>
                  <a
                    @click.prevent="transactionDetail(transaction._id)"
                    href="#"
                  >
                    {{ new Date(transaction.createdAt).toDateString() }} /
                    {{ transaction._id }}
                  </a>
                </td>
                <td class="text-warning">{{ transaction.status }}</td>
                <td>
                  <button
                    v-if="transaction.status === 'paid'"
                    @click="updateTransaction(transaction._id)"
                    class="btn btn-success"
                    style="float:right"
                  >
                    Accepted
                  </button>
                </td>
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
  name: "transaction",
  data() {
    return {
      transactions: []
    };
  },
  components: {
    Navbar
  },
  created() {
    this.getTransactions();
  },
  methods: {
    transactionDetail(id) {
      this.$router.push(`/transaction/${id}`);
    },
    updateTransaction(id) {
      this.axios({
        method: "patch",
        url: `/transactions/${id}`,
        baseURL: this.baseURL,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(() => {
          this.getTransactions();
        })
        .catch(err => {
          this.Swal.fire({
            type: "error",
            text: err.response.data.message[0]
          });
        });
    },
    getTransactions() {
      this.axios({
        method: "get",
        url: "/transactions",
        baseURL: this.baseURL,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.transactions = data;
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
