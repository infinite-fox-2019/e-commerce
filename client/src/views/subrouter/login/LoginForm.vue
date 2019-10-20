<template>
    <v-row>
        <v-col cols="12">
            <v-form @submit.prevent="submit">
                <v-text-field
                    prepend-icon="mdi-account"
                    v-model="identity"
                    label="Username or Email"
                ></v-text-field>
                <v-text-field
                    prepend-icon="mdi-textbox-password"
                    v-model="password"
                    label="Password"
                    type="password"
                ></v-text-field>
                <v-btn type="submit" block dark>Log In</v-btn>
            </v-form>
        </v-col>
        <v-col cols="12" class="d-flex justify-center align-center flex-column">
            <p>Not a User?</p>
            <v-btn outlined @click="$router.push('/login/register')">Register</v-btn>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data() {
        return {
            identity: "",
            password: ""
        };
    },
    methods: {
        submit() {
            const vm = this;
            const payload = {
                identity: this.identity,
                password: this.password
            };
            vm.$awn.asyncBlock(
                vm.$store.dispatch("user/login", payload),
                () => {
                    vm.$router.push("/");
                    vm.$awn.success("Login");
                },
                vm.next,
                "Login"
            );
        }
    }
};
</script>

<style>
</style>