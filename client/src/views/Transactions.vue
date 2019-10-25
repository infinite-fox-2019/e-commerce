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
        <div>{{new Date(transaction.createdAt).toDateString() }}</div>
        <div>Status: {{ transaction.status }}</div>
        <div>
           <button v-if="role==='user'" class="text-blue-500 hover:text-gray-900" @click.prevent="updateTransaction({ status: transaction.status, id: transaction._id })">{{ updateUser(transaction.status) }}</button>
           <button v-if="role==='admin'" class="text-blue-500 hover:text-gray-900" @click.prevent="updateTransaction({ status: transaction.status, id: transaction._id })">{{ updateAdmin(transaction.status) }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      action: ''
    }
  },
  created () {
    this.$store.dispatch('getTransaction')
  },
  computed: {
    ...mapState(['transactions', 'role'])
  },
  methods: {
    updateAdmin (status) {
      switch (status) {
        case 'paid':
          return 'Send'
        case 'confirmed':
          return 'Finish'
        case 'finished':
          return 'Finished'
      }
    },
    updateUser (status) {
      switch (status) {
        case 'pending':
          return 'Pay'
        case 'sent':
          return 'Confirm'
      }
    },
    updateTransaction (obj) {
      let next = ''
      switch (obj.status) {
        case 'pending':
          next = 'paid'
          break
        case 'paid':
          next = 'sent'
          break
        case 'sent':
          next = 'confirmed'
          break
        case 'confirmed':
          next = 'finished'
          break
        case 'finished':
          next = 'finished'
      }
      this.$store.dispatch('updateTransaction', { id: obj.id, status: next })
      this.$store.dispatch('getTransaction')
    }
  }
}
</script>

<style>

</style>
