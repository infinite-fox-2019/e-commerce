<template>
    <div>
        <v-navigation-drawer v-model="drawer" @close="closeDrawer" app>
            <NavigationDrawer />
        </v-navigation-drawer>
        <v-app-bar app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="headline text-uppercase">
                <span>{{currentPath}}</span>
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
    },
    computed: {
        currentPath: {
            get() {
                switch (this.$route.path) {
                    case "/cart":
                        return "Cart";
                    case "/admin":
                        return "Admin";
                    case "/transaction":
                        return "History";
                    case "/login":
                        return "Login";
                    default:
                        return "Smart Home";
                }
            },
            set() {
                return;
            }
        }
    }
};
</script>

<style>
</style>