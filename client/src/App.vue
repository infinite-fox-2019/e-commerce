<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created() {
    this.checkAdmin();
  },
  methods: {
    checkAdmin() {
      return this.$store.dispatch("checkAdmin");
    }
  }
};
</script>
<style></style>
