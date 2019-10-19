<template>
  <div>
    <div class="container form-container">
      <div class="notification has-background-white">
        <form @submit.prevent="register">
          <div class="field">
            <div class="control has-icons-right">
              <input v-model="name" class="input" type="text" placeholder="Product Name">
            </div>
          </div>
          <section>
            <div class="block">
              <b-radio v-for="(series, index) in this.$store.state.seriesDict" :key="`series-${index}`"
                v-model="selectedSeries"
                name="name"
                type="is-danger"
                :native-value="series">
                {{ series }}
              </b-radio>
            </div>
          </section>
          <div class="field">
            <div class="control has-icons-left has-icons-right">
              <input v-model="email" class="input" type="text" placeholder="Email">
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
          </div>
          <div class="field">
            <div class="control has-icons-left has-icons-right">
              <input v-model="password" class="input" type="password" placeholder="Password">
              <span class="icon is-small is-left">
                <i class="fas fa-key"></i>
              </span>
            </div>
          </div>
          <div class="control">
            <button class="button is-danger">Sign Up</button>
          </div>
          <div class="control">
            <button class="button is-text">Log in</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      admin_password: '',
      isAdmin: false,
      selectedSeries: ''
    }
  },
  methods: {
  }
}
</script>

<style>
.form-container {
  max-width: 900px;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: 1px 1px 10px 0px #d1d1d1;
}

button {
  width: 100%;
  margin-top: 5px;
}

.admin-show-link {
  margin-bottom: 10px;
  float: right;
  text-decoration: none;
  text-decoration-style: none;
}

.admin-show-link {
  cursor: pointer;
}

.is-text-reddish {
  color: #f73737;
}
</style>
