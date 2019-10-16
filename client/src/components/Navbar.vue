<template>
    <b-navbar>
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="../assets/logo.png"
                    alt="logo"
                >
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
                    <a class="button is-light">
                      Sign up
                    </a>
                    <router-link to="/login" class="button is-info" type="">Login</router-link> 
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
export default {}
</script>
