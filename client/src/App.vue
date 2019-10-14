<template>
  <div id="app">
    <NavbarUser v-if="this.$store.state.isAdmin === false" />
    <NavbarAdmin v-else-if="this.$store.state.isAdmin === true" />
    <Jumbotron />
    <router-view />
  </div>
</template>

<script>
import NavbarUser from "@/components/NavbarUser";
import NavbarAdmin from "@/components/NavbarAdmin";
import Jumbotron from "@/components/Jumbotron";

export default {
  data: function() {
    return {};
  },
  components: {
    NavbarUser,
    NavbarAdmin,
    Jumbotron
  }
};
</script>

<style scoped>
#app {
  background-image: linear-gradient(to bottom right, #380036, #0cbaba);
  width: 100vw;
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
</style>
