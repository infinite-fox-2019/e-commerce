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
              </tr>
            </thead>
            <tbody>
              <tr v-for="(transaction, index) in transactions" :key="index">
                <th scope="row">{{ index + 1 }}</th>
                <td>
                  {{ new Date(transaction.createdAt).toDateString() }} /
                  {{ transaction._id }}
                </td>
                <td class="text-warning">{{ transaction.status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <img :src="chart" />
    </div>
  </section>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "transaction-all",
  data() {
    return {
      transactions: [],
      chartLink: "https://quickchart.io/chart?width=500&height=150&c=",
      chartData: {
        type: "bar",
        data: {
          labels: [],
          datasets: [
            { label: "Paid", data: [] },
            { label: "Accepted", data: [] }
          ]
        }
      }
    };
  },
  computed: {
    chart() {
      return this.chartLink + JSON.stringify(this.chartData);
    }
  },
  components: {
    Navbar
  },
  created() {
    this.getTransactions();
  },
  methods: {
    getTransactions() {
      this.axios({
        method: "get",
        url: "/transactions/all",
        baseURL: this.baseURL,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.transactions = data;

          let labels = [];
          data.forEach(tr => {
            let date = new Date(tr.createdAt).toDateString();
            if (labels.indexOf(date) === -1) labels.push(date);
          });

          this.chartData.data.labels = labels;

          labels.forEach((date, index) => {
            let paid = 0;
            let accepted = 0;
            data.forEach(tr => {
              let trDate = new Date(tr.createdAt).toDateString();
              if (trDate === date) {
                if (tr.status === "paid") paid += 1;
                else if (tr.status === "accepted") accepted += 1;
              }
            });

            this.chartData.data.datasets[0].data[index] = paid;
            this.chartData.data.datasets[1].data[index] = accepted;
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
