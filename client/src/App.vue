<template>
    <v-app>
        <MainNavBar />
        <v-content>
            <router-view />
        </v-content>
    </v-app>
</template>

<script>
import MainNavBar from "@/components/NavBar/MainNavBar";
export default {
    name: "App",
    components: {
        MainNavBar
    },
    created() {
        if (localStorage.getItem("token")) {
            let vm = this;
            vm.$awn.asyncBlock(
                vm.$store.dispatch("user/verifyUser"),
                null,
                vm.next,
                "Verifying User..."
            );
        }
    }
};
</script>
