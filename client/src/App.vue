<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Axios from "axios";

export default {
  name: "App",
  components: {
    Navbar
  },
  mounted() {
    this.$store.dispatch("refresh");
  }
};
</script>
