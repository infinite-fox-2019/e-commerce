<template>
  <div class="container flex justify-center" style="margin: 0 auto;">
    <div class="flex-column m-8 p-10 w-full">
      <div>
        <h1> <strong> TRANSACTIONS </strong> </h1>
      </div>
      <div class="flex justify-between items-center shadow p-8 m-4" v-for="transaction in transactions" :key="transaction._id">
        <div class="flex-column">
          <div v-for="item in transaction.items" :key="item._id" class="flex-column items-start p-8  shadow">
            <img :src="item.id.image" :alt="item.id.image" class="h-32">
            <div>{{ item.id.name }}</div>
            <div>$ {{ item.id.price }}</div>
          </div>
        </div>
        <div>Price: $ {{ transaction.price }}</div>
        <div>Status: {{ transaction.status }}</div>
        <div>
           <button class="bg-black hover:bg-gray-800 text-white hover:text-gray-100 border hover:border-white p-2" @click.prevent="updateTransaction({ status: transaction.status, id: transaction._id })">{{ update(transaction.status) }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('getTransaction')
  },
  computed: {
    transactions () {
      return this.$store.state.transactions
    }
  },
  methods: {
    update (status) {
      switch (status) {
        case 'pending':
          return 'Pay'
        case 'paid':
          return 'Confirm Payment'
        case 'confirmed':
          return 'Finish'
      }
    },
    updateTransaction (obj) {
      let next = ''
      switch (obj.status) {
        case 'pending':
          next = 'paid'
          break
        case 'paid':
          next = 'confirmed'
          break
        case 'confirmed':
          next = 'finished'
          break
      }
      this.$store.dispatch('updateTransaction', { id: obj.id, status: next })
    }
  }
}
</script>

<style>

</style>
