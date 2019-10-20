<template>
  <div class="setwidth">
    <section>
      <h1>Delivered</h1>
      <b-field grouped group-multiline>
        <div class="control">
          <b-switch v-model="showDetailIcon">Show detail icon</b-switch>
        </div>
      </b-field>

      <b-table
        :data="data"
        ref="table"
        paginated
        per-page="5"
        :opened-detailed="defaultOpenedDetails"
        detailed
        detail-key="_id"
        @details-open="open"
        :show-detail-icon="showDetailIcon"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
        <template slot-scope="props">
          <b-table-column field="index" label="No." width="40" numeric>{{ props.index + 1 }}</b-table-column>
          <b-table-column field="user.first_name" label="Date" sortable>
            <template v-if="showDetailIcon">{{ new Date (props.row.createdAt).toDateString() }}</template>
            <template v-else>
              <a @click="toggle(props.row)">{{ new Date (props.row.createdAt).toDateString() }}</a>
            </template>
          </b-table-column>
          <b-table-column
            field="user.last_name"
            label="Total Payment"
            sortable
          >{{ props.row.totalPayment.toLocaleString('id', { style: 'currency', currency: 'IDR' }) }}</b-table-column>
          <b-table-column label="Delivery Status">
            <span>
              <b-icon pack="fas" :icon="props.row.deliveryStatus === true ? 'check' : 'car'"></b-icon>
              {{ props.row.deliveryStatus}}
            </span>
          </b-table-column>
        </template>
        <template slot="detail" slot-scope="props">
          <article class="media">
            <div class="media-content">
              <div class="content">
                <div class="half1">
                  <table class="table is-bordered">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>
                          <abbr>Qty</abbr>
                        </th>
                        <th>
                          <abbr>price</abbr>
                        </th>
                        <th>
                          <abbr>Total</abbr>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in props.row.listItem" :key="item._id">
                        <td>{{item.name}}</td>
                        <td>{{item.quantity}}</td>
                        <td>{{item.price.toLocaleString('id', { style: 'currency', currency: 'IDR' })}}</td>
                        <td>{{item.sum}}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div>
                    <h4>
                      Total Payment
                      <b>{{props.row.totalPayment.toLocaleString('id', { style: 'currency', currency: 'IDR' })}}</b>
                    </h4>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </article>
        </template>
      </b-table>
    </section>
    <section>
      <h1>Still Shipped</h1>
      <b-field grouped group-multiline>
        <div class="control">
          <b-switch v-model="showDetailIcon">Show detail icon</b-switch>
        </div>
      </b-field>

      <b-table
        :data="data2"
        ref="table"
        paginated
        per-page="5"
        :opened-detailed="defaultOpenedDetails1"
        detailed
        detail-key="_id"
        @details-open="open2"
        :show-detail-icon="showDetailIcon"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
        <template slot-scope="props">
          <b-table-column field="index" label="No." width="40" numeric>{{ props.index + 1 }}</b-table-column>
          <b-table-column field="user.first_name" label="Date" sortable>
            <template v-if="showDetailIcon">{{ new Date (props.row.createdAt).toDateString() }}</template>
            <template v-else>
              <a @click="toggle(props.row)">{{ new Date (props.row.createdAt).toDateString() }}</a>
            </template>
          </b-table-column>
          <b-table-column
            field="user.last_name"
            label="Total Payment"
            sortable
          >{{ props.row.totalPayment.toLocaleString('id', { style: 'currency', currency: 'IDR' }) }}</b-table-column>
          <b-table-column label="Delivery Status">
            <span>
              <b-icon pack="fas" :icon="props.row.deliveryStatus === true ? 'check' : 'car'"></b-icon>
              {{ props.row.deliveryStatus}}
            </span>
          </b-table-column>
        </template>
        <template slot="detail" slot-scope="props">
          <article class="media">
            <div class="media-content">
              <div class="content">
                <div class="half1">
                  <table class="table is-bordered">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>
                          <abbr>Qty</abbr>
                        </th>
                        <th>
                          <abbr>price</abbr>
                        </th>
                        <th>
                          <abbr>Total</abbr>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in props.row.listItem" :key="item._id">
                        <td>{{item.name}}</td>
                        <td>{{item.quantity}}</td>
                        <td>{{item.price.toLocaleString('id', { style: 'currency', currency: 'IDR' })}}</td>
                        <td>{{item.sum}}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div>
                    <h4>
                      Total Payment
                      <b>{{props.row.totalPayment.toLocaleString('id', { style: 'currency', currency: 'IDR' })}}</b>
                    </h4>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </article>
        </template>
      </b-table>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      defaultOpenedDetails: [1],
      defaultOpenedDetails1: [1],
      showDetailIcon: true
    }
  },
  methods: {
    toggle (row) {
      this.$refs.table.toggleDetails(row)
    },
    open (input) {
      console.log(input._id)
      this.defaultOpenedDetails = [input._id]
    },
    open2 (input) {
      console.log(input._id)
      this.defaultOpenedDetails1 = [input._id]
    }
  },
  computed: {
    transactions () {
      return this.$store.state.admintrx
    },
    transactionsPending () {
      return this.$store.state.trxpending
    },
    data () {
      let data = this.transactions
      for (let i in data) {
        data[i].id = i + 1
      }
      return data
    },
    data2 () {
      let data = this.transactionsPending
      for (let i in data) {
        data[i].id = i + 1
      }
      return data
    }
  },
  created () {
    this.$store.dispatch('fetchTransactionAdm')
    this.$store.dispatch('fetchPendingAdm')
  }
}
</script>

<style scoped>
.setwidth{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column
}
section{
  margin-top: 20px;
  width: 60%
}
h1{
  font-size: 30px;
  font-weight: 500
}
</style>
