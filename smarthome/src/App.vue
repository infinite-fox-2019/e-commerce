<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" app>
            <v-list-item>
                <v-list-item-avatar>
                    <v-img :src="gravatar" alt></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title class="text-uppercase">{{$store.state.username}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense>
                <v-list-item @click="$router.push('/')">
                    <v-list-item-action>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Shop</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click="$router.push('cart')">
                    <v-list-item-action>
                        <v-icon>mdi-cart</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Cart</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click="$router.push('transaction')">
                    <v-list-item-action>
                        <v-icon>mdi-book-open</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>History Transaction</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="headline text-uppercase">
                <span>Smart Home</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
        </v-app-bar>

        <v-content>
            <router-view />
        </v-content>
    </v-app>
</template>

<script>
import { mapState } from "vuex";
import axios from "@/config/axios";
import md5 from "md5";
export default {
    name: "App",
    data() {
        return {
            drawer: null,
            gravatar: ""
        };
    },
    methods: {
        hash(email) {
            return md5(email);
        }
    },
    computed: {
        ...mapState(["token"])
    },
    created() {
        if (localStorage.getItem("token")) {
            let vm = this;
            vm.$awn.asyncBlock(
                axios.get("/users/verify"),
                function({ data }) {
                    vm.$store.commit("setToken");
                    vm.$store.commit("setUserMeta", data);
                    vm.gravatar = `https://www.gravatar.com/avatar/${md5(
                        vm.$store.state.email
                    )}?s=100`;
                },
                function(err) {
                    vm.next(err);
                    localStorage.removeItem("token");
                    vm.$router.push("login");
                },
                "Loading..."
            );
        } else {
            this.$router.push("login");
        }
    }
};
</script>
