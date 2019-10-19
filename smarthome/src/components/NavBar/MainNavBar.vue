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
            <v-btn
                text
                v-if="(path === '/admin' || path === '/') && !loading"
                @click="refreshProducts"
            >
                <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <v-progress-circular v-if="loading" indeterminate></v-progress-circular>
            <v-btn text v-if="(path === '/admin' || path === '/')">
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-dialog
                v-model="dialog"
                max-width="374"
                v-if="(path === '/cart') && (cart.cart.length)"
            >
                <template v-slot:activator="{ on }">
                    <v-btn text color="red" v-on="on">Clear Cart</v-btn>
                </template>
                <ConfirmClear @close="dialog = false" />
            </v-dialog>
        </v-app-bar>
    </div>
</template>

<script>
import { mapState } from "vuex";
import NavigationDrawer from "./NavigationDrawer";
import ConfirmClear from "../Cart/ConfirmClear";
export default {
    name: "main-nav-bar",
    components: {
        NavigationDrawer,
        ConfirmClear
    },
    data() {
        return {
            drawer: null,
            loading: false,
            dialog: false
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
        ...mapState("cart", ["cart"]),
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
        },
        path: function() {
            return this.$route.path;
        }
    },
    created() {
        console.log(this.cart.cart.length);
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