<template>
    <div>
        <v-menu>
            <template v-slot:activator="{ on }">
                <v-list-item>
                    <v-list-item-avatar>
                        <v-img :src="gravatar" alt></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title v-on="on" class="text-uppercase">
                            {{username}}
                            <v-icon>mdi-chevron-down</v-icon>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>
            <v-list>
                <v-list-item @click="signOut">
                    <v-list-item-action>
                        <v-icon>mdi-logout</v-icon>
                    </v-list-item-action>
                    <v-list-item-title>Sign Out</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <v-divider></v-divider>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    name: "nav-bar-profile",
    computed: {
        ...mapState("user", ["username", "gravatar"])
    },
    methods: {
        ...mapMutations("user", ["destroyCredentials"]),
        signOut() {
            this.$emit("close");
            this.destroyCredentials();
            this.$router.push("/bouncetohome");
            this.$router.push("/");
            this.$awn.info("User logged out");
        }
    },
    created() {}
};
</script>

<style>
</style>