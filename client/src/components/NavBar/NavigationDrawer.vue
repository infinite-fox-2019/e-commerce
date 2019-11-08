<template>
    <div>
        <Profile v-if="username" @close="$emit('close')" />
        <v-list dense>
            <v-list-item v-if="!token" @click="goLogin">
                <v-list-item-action>
                    <v-icon>mdi-login</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Login</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item @click="goHome">
                <v-list-item-action>
                    <v-icon>mdi-home</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Shop</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="token" @click="goCart">
                <v-list-item-action>
                    <v-icon>mdi-cart</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Cart</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="token" @click="goTransaction">
                <v-list-item-action>
                    <v-icon>mdi-book-open</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>History Transaction</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="role === 'admin'" @click="goAdmin">
                <v-list-item-action>
                    <v-icon>mdi-account-supervisor</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Administrative Tools</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
</template>

<script>
import { mapState } from "vuex";
import Profile from "./Profile";

export default {
    name: "navigation-drawer-items",
    computed: {
        ...mapState("user", ["token", "username", "role"])
    },
    components: {
        Profile
    },
    methods: {
        goLogin() {
            if (this.$route.path === "/login") {
                return;
            } else {
                this.$router.push("/login");
            }
        },
        goHome() {
            if (this.$route.path === "/") {
                return;
            } else {
                this.$router.push("/");
            }
        },
        goCart() {
            if (this.$route.path === "/cart") {
                return;
            } else {
                this.$router.push("/cart");
            }
        },
        goTransaction() {
            if (this.$route.path === "/transaction") {
                return;
            } else {
                this.$router.push("/transaction");
            }
        },
        goAdmin() {
            if (this.$route.path === "/admin") {
                return;
            } else {
                this.$router.push("/admin");
            }
        }
    }
};
</script>

<style>
</style>