<template>
    <v-form @submit.prevent="submit">
        <v-text-field prepend-icon="mdi-account" v-model="identity" label="Username or Email"></v-text-field>
        <v-text-field
            prepend-icon="mdi-textbox-password"
            v-model="password"
            label="Password"
            type="password"
        ></v-text-field>
        <v-btn type="submit" block dark>Log In</v-btn>
    </v-form>
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
            const payload = {
                identity: this.identity,
                password: this.password
            };
            this.$awn.asyncBlock(
                this.$store.dispatch("login", payload),
                () => {
                    this.$router.push("home");
                    this.$awn.success("Login");
                },
                this.next,
                "Login"
            );
        }
    }
};
</script>

<style>
</style>