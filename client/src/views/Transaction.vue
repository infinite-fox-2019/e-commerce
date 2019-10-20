<template>
  <div>
      <a-divider></a-divider>
      <h1>Transaction History</h1>
    <TransactionCard v-for="(trans, index) in transaction" :key="index" :transaction="trans"></TransactionCard>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TransactionCard from "../components/TransactionCard.vue";

export default {
  name: "transaction",
  components: {
    TransactionCard
  },
  computed: mapState(["transaction"])
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Lobster|Varela+Round&display=swap");
h1{
    font-family: "Lobster", cursive;
}
</style>