<template>
    <b-navbar class="navbar">
        <template slot="brand">
            <div class="brand is-text-reddish" @click="toHome()">
                MULTIVERSE
            </div>
        </template>

        <template slot="end">
            <b-navbar-item v-if="!this.$store.state.isLogin" tag="div">
                <div class="buttons">
                  <router-link to="/register">
                    <a class="button is-danger">
                        <strong>Sign up</strong>
                    </a>
                  </router-link>
                  <router-link to="/login">
                    <a class="button is-light">
                        Log in
                    </a>
                  </router-link>
                </div>
            </b-navbar-item>
            <b-navbar-item v-if="this.$store.state.isLogin" tag="div">
                <div class="buttons">
                  <router-link v-if="this.$store.state.userRole !== 'admin'" to="/cart">
                    <a class="button is-danger">
                        <i class="fa fa-shopping-cart" style="margin-right: 5px;"></i>
                        <strong>Cart</strong>
                    </a>
                  </router-link>
                  <router-link v-if="this.$store.state.userRole === 'admin'" to="/add-product">
                    <a class="button is-danger">
                        <strong><i class="fa fa-plus" style="margin-right: 5px;"></i>Product</strong>
                    </a>
                  </router-link>
                  <a class="button is-light" @click="logout">
                      Log out
                  </a>
                  <div style="margin-bottom: 10px;">
                    {{ this.$store.state.username }}
                  </div>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
export default {
  props: {
    isLogin: Boolean,
    role: String
  },
  methods: {
    logout () {
      this.$store.commit('LOGOUT')
    },
    toHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.brand {
  font-family: 'Anton', sans-serif;
  font-size: 25px;
  cursor: pointer;
  margin: 10px;
}

.is-text-reddish {
  color: #FF3860;
}

.button {
  margin-right: 10px;
}

.navbar {
  box-shadow: 1px 1px 10px 0px #d1d1d1;
}
</style>
