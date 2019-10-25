<template>
  <div class="row">
    <div class="col-md-12 d-flex align-items-stretch justify-content-between">
      <div class="d-flex" style="width: 30%">
        <button
          v-if="!isAdmin"
          @click="$router.push('/cart')"
          class="btn btn-primary btn-sm"
        >
          <i class="fa fa-shopping-cart" style="width: 20px"></i>
        </button>
        <button
          v-if="!isAdmin"
          @click="$router.push('/transaction')"
          class="btn btn-primary btn-sm ml-2"
        >
          <i class="fa fa-money" style="width: 20px"></i>
        </button>
        <button
          v-if="isAdmin"
          @click="$router.push('/transaction/all')"
          class="btn btn-primary btn-sm ml-2"
        >
          <i class="fa fa-money" style="width: 20px"></i>
        </button>
      </div>
      <a @click.prevent="$router.push('/home/list')" href="/home">
        <img class="img-logo-home" src="@/assets/logo.png" alt />
      </a>
      <div class="d-flex justify-content-end" style="width:30%;">
        <button
          v-if="token !== null"
          @click="logout"
          class="btn btn-primary btn-sm"
        >
          <i class="fa fa-sign-out" style="width: 20px"></i>
        </button>
        <button v-else @click="login" class="btn btn-primary btn-sm">
          <i class="fa fa-user" style="width: 20px"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar",
  computed: {
    isAdmin() {
      return this.$store.state.isAdmin;
    },
    token() {
      return this.$store.state.token;
    }
  },
  methods: {
    setAdmin(payload) {
      return this.$store.commit("setAdmin", payload);
    },
    removeToken() {
      return this.$store.commit("removeToken");
    },
    logout() {
      this.removeToken();
      this.setAdmin(false);
      this.$router.push("/");
    },
    login() {
      this.$router.push("/login");
    }
  }
};
</script>

<style></style>
