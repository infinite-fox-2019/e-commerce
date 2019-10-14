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

        <v-content></v-content>
    </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "App",
    computed: {
        ...mapState(["token"])
    }
};
</script>
