<template>
    <v-app>
        <v-app-bar app>
            <v-toolbar-title class="headline text-uppercase">
                <span>Smart Home</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text v-if="!token">
                <span class="mr-2">LOGIN</span>
            </v-btn>
        </v-app-bar>

        <v-content>
            <router-view />
        </v-content>
    </v-app>
</template>

<script>
import { mapState } from "vuex";
import axios from "@/config/axios";
export default {
    name: "App",
    computed: {
        ...mapState(["token"])
    },
    created() {
        if (localStorage.getItem("token")) {
            let vm = this;
            vm.$awn.asyncBlock(
                axios.get("/users/verify"),
                function({ data }) {
                    this.$store.commit("setToken");
                },
                function(err) {
                    this.next(err);
                    localStorage.removeItem("token");
                    this.$router.push("login");
                },
                "User Verified"
            );
        } else {
            this.$router.push("login");
        }
    }
};
</script>
