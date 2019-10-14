<template>
    <v-app>
        <v-app-bar app>
            <v-toolbar-title class="headline text-uppercase">
                <span>Vuetify</span>
                <span class="font-weight-light">MATERIAL DESIGN</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank">
                <span class="mr-2">Latest Release</span>
            </v-btn>
        </v-app-bar>

        <v-content>
            <HelloWorld />
        </v-content>
    </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import debounce from "lodash.debounce";

export default {
    name: "App",
    components: {
        HelloWorld
    },
    data: () => ({
        count: 0
    }),
    created() {
        setInterval(() => {
            this.count++;
        }, 3000);
        this.debouncedCall = debounce(this.callback, 2000);
    },
    methods: {
        callback() {
            this.$awn.info("Debounce Test");
        }
    },
    watch: {
        count(val) {
            this.debouncedCall();
        }
    }
};
</script>
