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

            <v-dialog v-model="dialog" max-width="374" v-if="(path === '/cart') && cart.length">
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
                let p = this.$route.path;
                switch (p) {
                    case p.includes("cart"):
                        return "Cart";
                    case p.includes("admin"):
                        return "Admin";
                    case p.includes("transaction"):
                        return "History";
                    case p.includes("login"):
                        return "Login";
                    default:
                        return "Visual Novel";
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
    created() {}
};
</script>

<style>
</style>