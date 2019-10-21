<template>
  <section id="register-page">
    <div class="container my-5">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div style="width:100%" class="d-flex justify-content-center mb-5">
            <a @click.prevent="$router.push('/home/list')" href="#">
              <img id="logo-register" src="../assets/logo.png" />
            </a>
          </div>
          <div class="card">
            <div class="card-header">Register</div>
            <div class="card-body">
              <form id="form-register" @submit.prevent="Register">
                <div class="form-group">
                  <label for="input-name">Name</label>
                  <input
                    autofocus
                    type="text"
                    class="form-control"
                    v-model="name"
                  />
                </div>
                <div class="form-group">
                  <label for="input-email">Email</label>
                  <input type="email" class="form-control" v-model="email" />
                </div>
                <div class="form-group">
                  <label for="input-password">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="password"
                  />
                </div>
                <button type="submit" class="btn btn-primary">Register</button>
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
  name: "register",
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  created() {
    this.Reset();
  },
  methods: {
    Reset() {
      this.name = "";
      this.email = "";
      this.password = "";
    },
    setToken(token) {
      return this.$store.commit("setToken", token);
    },
    checkAdmin() {
      return this.$store.dispatch("checkAdmin");
    },
    Register() {
      this.axios({
        url: "/users/register",
        method: "post",
        baseURL: this.baseURL,
        data: {
          name: this.name,
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
#logo-register {
  width: 100px;
  height: auto;
}
</style>
