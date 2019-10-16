<template>
    <div>
        <v-navigation-drawer v-model="drawer" @close="closeDrawer" app>
            <NavigationDrawer />
        </v-navigation-drawer>
        <v-app-bar app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="headline text-uppercase">
                <span>Smart Home</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title>
                <v-icon>mdi-magnify</v-icon>
            </v-toolbar-title>
        </v-app-bar>
    </div>
</template>

<script>
import NavigationDrawer from "./NavigationDrawer";
export default {
    name: "main-nav-bar",
    components: {
        NavigationDrawer
    },
    data() {
        return {
            drawer: null
        };
    },
    methods: {
        closeDrawer() {
            this.drawer = false;
        }
    }
};
</script>

<style>
</style>