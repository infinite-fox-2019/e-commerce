<template>
    <div>
        <v-navigation-drawer v-model="drawer" @input="getInput" @close="closeDrawer" app>
            <NavigationDrawer />
        </v-navigation-drawer>
        <v-app-bar app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="headline text-uppercase">
                <span>{{currentPath}}</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text v-if="(admin || home) && !loading" @click="refreshProducts">
                <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <v-progress-circular v-if="loading" indeterminate></v-progress-circular>
            <v-btn text>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
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
            drawer: null,
            admin: false,
            home: false,
            loading: false
        };
    },
    methods: {
        closeDrawer() {
            this.drawer = false;
        },
        refreshProducts() {
            this.loading = true;
            this.$store
                .dispatch("product/getProducts")
                .then(() => {})
                .catch(this.next)
                .finally(() => (this.loading = false));
        },
        getInput(val) {
            this.drawer = val;
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
    },
    watch: {
        $route() {
            if (this.$route.path === "/") {
                this.home = true;
                this.admin = false;
            } else if (this.$route.path === "/admin") {
                this.admin = true;
                this.home = false;
            } else {
                this.admin = false;
                this.home = false;
            }
        }
    },
    created() {
        if (this.$route.path === "/") {
            this.home = true;
        }
        if (this.$route.path === "/admin") {
            this.admin = true;
        }
    }
};
</script>

<style>
</style>