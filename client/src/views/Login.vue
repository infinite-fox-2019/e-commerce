<template>
  <div>
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="Email address:">
        <b-form-input
          v-model="email"
          type="text"
          placeholder="Email"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Password:">
        <b-form-input
          v-model="password"
          type="password"
          placeholder="Password"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Log In</b-button>
    </b-form>
    <div style="margin-left: 25vw;">
    <p class="h-4">New User?</p>
    <b-button @click="redirectToRegister" variant="primary">Register</b-button>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      const info = { email: this.email, password: this.password };
      Axios({
        method: "post",
        url: "http://localhost:3000/user/login",
        data: info
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          this.$store.commit("LOGIN", data);
          this.$router.push("/");
        })
        .catch(({ response }) => {
          const { msg } = response.data;
          Swal.fire("Oops", msg, "error");
        });
    },
    redirectToRegister() {
      this.$router.push("/register");
    }
  }
};
</script>

<style scoped>
form {
  width: 50%;
  margin-left: 25%;
  margin-top: 10%;
}
</style>
