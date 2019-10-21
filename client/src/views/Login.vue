<template>
  <section id="login-page">
    <div class="container my-5">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div style="width:100%" class="d-flex justify-content-center mb-5">
            <a @click.prevent="$router.push('/home/list')" href="#">
              <img id="logo-login" src="../assets/logo.png" />
            </a>
          </div>
          <div class="card">
            <div class="card-header">Login</div>
            <div class="card-body">
              <form id="form-login" @submit.prevent="Login">
                <div class="form-group">
                  <label for="input-email">Email</label>
                  <input
                    autofocus
                    type="email"
                    class="form-control"
                    v-model="email"
                  />
                </div>
                <div class="form-group">
                  <label for="input-password">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="password"
                  />
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
                <hr />
                <p>
                  To create new account
                  <a @click.prevent="$router.push('/register')" href="/register"
                    >register here</a
                  >
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  created() {
    this.Reset();
  },
  methods: {
    Reset() {
      this.email = "";
      this.password = "";
    },
    setToken(token) {
      return this.$store.commit("setToken", token);
    },
    checkAdmin() {
      return this.$store.dispatch("checkAdmin");
    },
    Login() {
      this.axios({
        url: "/users/login",
        method: "post",
        baseURL: this.baseURL,
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          this.Reset();
          this.setToken(data.token);
          this.checkAdmin();
          this.$router.push("/home/list");
        })
        .catch(err => {
          this.Swal.fire({
            type: "error",
            text: err.response.data.message[0]
          });
        });
    }
  }
};
</script>

<style>
#logo-login {
  width: 100px;
  height: auto;
}
</style>
