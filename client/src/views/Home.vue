<template>
  <section id="home-page" class="py-3">
    <div class="container">
      <navbar />
      <!-- Nested Route -->
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "home",
  components: {
    Navbar
  }
};
</script>
<style>
.img-logo-home {
  height: 50px;
  width: auto;
}
</style>
