<template>
  <div id="loginForm">
    <b-container>
      <h4>Login</h4>
      <b-alert :style="{visibility:errorShow}" variant="danger" show fade>{{errorMessage}}</b-alert>
      <b-form>
        <b-form-group id="loginEmailGroup" label="Email:" label-for="loginEmail">
          <b-form-input
            id="loginEmail"
            v-model="email"
            type="email"
            required
            placeholder="Enter email"
            class="border-left-0 border-right-0 border-top-0"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="loginPasswordGroup" label="Password:" label-for="loginPassword">
          <b-form-input
            id="loginPassword"
            v-model="password"
            required
            placeholder="Enter password"
            type="password"
            class="border-left-0 border-right-0 border-top-0"
          ></b-form-input>
        </b-form-group>
        <b-button
          id="loginButton"
          v-if="loading === false"
          @click.prevent="login"
          type="submit"
        >Login</b-button>
        <b-button id="loginButton" v-else type="submit" @click.prevent>
          <i class="fas fa-spinner fa-pulse"></i>
        </b-button>
      </b-form>
      <br />
      <p>
        Don't have an account? Click here to
        <a id="register-button">
          <router-link to="/register">register.</router-link>
        </a>
      </p>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
// const url = "http://35.246.229.159";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      errorShow: "hidden",
      loading: false
    };
  },
  methods: {
    login: function() {
      this.loading = true;
      axios({
        method: "POST",
        url: `${this.$store.state.baseUrl}/users/login`,
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          this.resetLoginForm();
          this.$swal.fire(
            "Successfully signed in",
            "Please clicked the button to close!",
            "success"
          );
          console.log("User successfully signed in");
          console.log(data.user.name);
          if (data.user.name === "admin") {
            this.$store.commit("changeIsAdmin", true);
          } else {
            this.$store.commit("changeIsAdmin", false);
          }
          this.$store.commit("changeIsLogin", true);
          this.$router.push("/");
        })
        .catch(err => {
          if (err.response) {
            this.errorMessage = err.response.data;
          } else if (err.request) {
            this.errorMessage = "No response from server side";
          }
          this.errorShow = "visible";
        })
        .finally(() => {
          this.loading = false;
        });
    },
    resetLoginForm() {
      this.email = "";
      this.password = "";
      this.errorMessage = "";
      this.errorShow = "hidden";
      this.loading = false;
    }
  }
};
</script>

<style scoped>
#loginForm {
  max-width: 50%;
  padding: 20px;
  margin-top: 10px;
  font-family: "Nunito";
}
#loginEmailGroup {
  margin-top: 20px;
}
#loginButton {
  display: inline-block;
  background-image: linear-gradient(to bottom right, #09203f, #537895);
  border: none;
  box-shadow: 0px 10px 10px -5px #111;
}
</style>