<template>
    <div class="container">
        <TransactionsCard  v-for="transaction in transactions" :key="transaction._id" :transaction="transaction"/>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import TransactionsCard from '@/components/TransactionsCard.vue'
export default {
    name: 'transactions',
    components: {
        TransactionsCard
    },
    computed: mapState(['transactions']),
    created() {
        this.$store.dispatch('getTrasactions')
    },

}
</script>

<style>



</style>