<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-group label="Username:">
        <b-form-input v-model="username" placeholder="Username"></b-form-input>
      </b-form-group>
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
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    <div style="margin-left: 25vw;">
    <p class="h-4">Old User?</p>
    <b-button @click="redirectToLogin" variant="primary">Login</b-button>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "Register",
  data() {
    return {
      email: "",
      username: "",
      password: ""
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      const data = {
        username: this.username,
        email: this.email,
        password: this.password
      };
      Axios({
        method: "post",
        url: "http://localhost:3000/user/register",
        data
      })
        .then(data => {
          this.$store.commit("LOGIN", data);
          localStorage.setItem("token", data.token);
          this.$router.push("/");
        })
        .catch(({ response }) => {
          const { errors } = response.data;
          Swal.fire("Oops", errors[0], "error");
        });
    },
    redirectToLogin() {
      this.$router.push("/login");
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
