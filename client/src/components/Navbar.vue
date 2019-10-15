<template>
    <b-navbar>
        <template slot="brand">
            <b-navbar-item class="brand is-text-reddish" tag="router-link" :to="{ path: '/' }">
                MULTIVERSE
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item href="#">
                Home
            </b-navbar-item>
            <b-navbar-item href="#">
                Documentation
            </b-navbar-item>
            <b-navbar-dropdown label="Info">
                <b-navbar-item href="#">
                    About
                </b-navbar-item>
                <b-navbar-item href="#">
                    Contact
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                  <router-link to="/register">
                    <a class="button is-danger">
                        <strong>Sign up</strong>
                    </a>
                  </router-link>
                  <router-link to="/about">
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
  color: #f73737;
}
</style>
