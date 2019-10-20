<template>
  <div class="setwidth">
    <section>
      <h1>Items</h1>
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
          <b-table-column field="user.name" label="Name" sortable>
            <template v-if="showDetailIcon">{{ props.row.name }}</template>
            <template v-else>
              <a @click="toggle(props.row)">{{ props.row.name }}</a>
            </template>
          </b-table-column>
          <b-table-column
            label="Stock"
            sortable
          >{{ props.row.stock }}</b-table-column>
         <b-table-column
            label="Price"
            sortable
          >{{ props.row.price }}</b-table-column>
        </template>
        <template slot="detail" slot-scope="props">
          <article class="media">
            <div class="media-content">
              <div class="content">
                <div class="half1">
                  <div style="display:flex">
                    <img :src="props.row.featured_image" alt="" style="object-fit:containt; height:180px">
                    <div style="margin-left: 15px">
                    <label for="Description">Description :</label>
                    <p>{{props.row.description}}</p>
                    </div>
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
    }
  },
  computed: {
    items () {
      return this.$store.state.allitems
    },
    data () {
      let data = this.items
      for (let i in data) {
        data[i].id = i + 1
      }
      return data
    }
  },
  created () {
    this.$store.dispatch('fetchItems')
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
