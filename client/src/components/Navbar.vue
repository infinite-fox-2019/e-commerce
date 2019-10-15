<template>
    <b-navbar>
        <template slot="brand">
            <b-navbar-item class="brand is-text-reddish" tag="router-link" :to="{ path: '/' }">
                MULTIVERSE
            </b-navbar-item>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
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
        </template>
    </b-navbar>
</template>

<script>
export default {

}
</script>

<style scoped>
.brand {
  font-family: 'Anton', sans-serif;
  font-size: 25px;
}

.is-text-reddish {
  color: #FF3860;
}
</style>
