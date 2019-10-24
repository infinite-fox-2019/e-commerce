<template>
  <div id="cart">
    <CartTable />
  </div>
</template>

<script>
import CartTable from "@/components/CartTable.vue";

export default {
  components: {
    CartTable
  }
};
</script>

<style scoped>
#cart {
  margin: 30px;
}
</style>