<template>
  <div class="card">
    <div class="left">
      <p>{{ transaction.UserId.email }}</p>
      <p>{{ transaction.UserId.username }}</p>
    </div>
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
      <a-button
        @click="confirm"
        v-if="transaction.status != 'confirmed'"
        type="primary"
        size="small"
      >
        Confirm
        <a-icon type="right" />
      </a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TransactionCard",
  props: ["transaction"],
  methods: {
    confirm() {
      this.$store
        .dispatch("confirmTransaction", this.transaction._id)
        .then(data => {
          this.$notification.open({
            message: "Success",
            description: "Successfully confirm transaction",
            icon: <a-icon type="smile" style="color: #108ee9" />
          });
          this.$store.dispatch('fetchTransaction')
        })
        .catch(err => {
          this.$notification.open({
            message: "Fail",
            description: err.response.message,
            icon: <a-icon type="meh" style="color: #108ee9" />
          });
        });
    }
  }
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