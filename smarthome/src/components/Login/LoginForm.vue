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
import axios from "@/config/axios";

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
            this.$store.dispatch("login", payload);
        }
    }
};
</script>

<style>
</style>