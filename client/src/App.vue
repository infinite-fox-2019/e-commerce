<template>
  <div id="app">
    <Navbar @logout="logout" :user="user" />
    <router-view @login="login" :customer="user" />
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
  data() {
    return {
      user: null
    };
  },
  methods: {
    login(user) {
      this.user = user;
    },
    logout() {
      localStorage.removeItem("token");
      this.user = null;
      if (this.$router.currentRoute.path !== "/") {
        this.$router.push("/");
      }
    },
    refresh() {
      if (localStorage.getItem("token")) {
        Axios({
          method: "post",
          url: "http://shopify-server.ricky-works.online/user/refresh",
          headers: { token: localStorage.getItem("token") }
        })
          .then(({ data }) => {
            this.user = data;
          })
          .catch(console.log);
      }
    }
  },
  mounted() {
    this.refresh();
  },
  watch: {
    user() {
      this.refresh();
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
