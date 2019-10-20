<template>
  <div>
    <div class="card" v-for="(transaction,i) in transactions" :key="i">
      <div class="center">
        <div v-for="(product,index) in transaction.items" :key="index">
          <p>
            <b>{{ product.product.name }}</b>
            | qty : {{ product.qty }}
          </p>
        </div>
      </div>
      <div class="action">
        <p>{{ transaction.status }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserTransactionInfo",
  props: ["transactions"]
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2vh 10vh;
  margin: 1vh;
  border: 1px solid rgb(216, 216, 216);
}
p,
h3 {
  margin: 0;
}
</style>