<template>

  <div>
    <div class="row valign-wrapper">
    <div class="col s6 offset-s3 valign">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">Transactions {{ getData }} </span>
          <table>
            <tr>
              <td>
                Transaction ID
              </td>
              <td>
                <span> {{ transactions.transactionId }} </span>
              </td>
            </tr>
            <tr>
              <td>
                Buyer
              </td>
              <td>
                <span>{{ transactions.buyer }}</span>
              </td>
            </tr>
            <tr>
              <td>
                Purshace
              </td>
              <td>
                <span>{{ transactions.brand+ ' ' +transactions.name }}</span>
              </td>
            </tr>
            <tr>
              <td>
                DP
              </td>
              <td>
                <span>${{ transactions.dp }} </span>
              </td>
            </tr>
            <tr>
              <td>
                Minus
              </td>
              <td>
                <span>${{ transactions.minus }} </span>
              </td>
            </tr>
            <tr>
              <td>
                CreatedAt
              </td>
              <td>
                <span>{{ transactions.date }} </span>
              </td>
            </tr>
            <tr>
              <td>
                Proccess
              </td>
              <td>
                <button @click='deleteTransaction(transactions._id)'>Denied</button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
            
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['transactions', 'getData'],
  methods: {
    deleteTransaction (id) {
      axios({
        method: 'delete',
        url: `http://dreamcarserver.dreamcarofficial.com/transactions/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.$awn.success('Transactions deleted!')
          this.$emit('fetchData')
          this.getData()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
table{
  width:100%
}
.row {
  top: 0;
  left: 0;
  width: 100%;

  margin: 0 auto;
}
.card {
  height: 220px;
  width: 500px
}
</style>
