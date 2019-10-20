<template>
  <div class="div">
    <h1>Transactions</h1>
    <br>
    <section>
      <b-field grouped group-multiline>
        <div class="control">
          <b-switch v-model="showDetailIcon">Show detail icon</b-switch>
        </div>
      </b-field>

      <b-table :data="data" ref="table" paginated per-page="5" :opened-detailed="defaultOpenedDetails"
        detailed detail-key="_id" @details-open="open" :show-detail-icon="showDetailIcon" aria-next-label="Next page"
        aria-previous-label="Previous page" aria-page-label="Page" aria-current-label="Current page" >
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
          <b-table-column label="Change Delivery Status" sortable centered>
            <span v-if="!props.row.deliveryStatus">
              <b-button class="is-success" @click="arriveItem(props.row._id)">Yes, Item is arrive</b-button>
            </span>
            <span v-else>---</span>
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
    <b-button class="is-danger" @click="toShop">Back</b-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      defaultOpenedDetails: [1],
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
    arriveItem (id) {
      this.$store.dispatch('changeDelStatus', id)
    },
    toShop () {
      this.$router.push({ path: '/shop' })
    }
  },
  computed: {
    items () {
      return this.$store.state.history
    },
    data () {
      let data = this.items
      for (let i in data) {
        data[i].id = i + 1
      }
      return data
    }
  }
}
</script>

<style scoped>
section {
  width: 65%;
  margin: 0 auto
}
h1 {
  font-size: 32pt;
  font-weight: 500;
  padding: 20px
}
.div {
  background: url(../assets/homeback.jpg);
  min-height: 94vh
}
</style>
