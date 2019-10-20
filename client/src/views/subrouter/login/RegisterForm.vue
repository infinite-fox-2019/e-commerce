<template>
    <v-row>
        <v-col cols="12">
            <v-form @submit.prevent="submit">
                <v-text-field
                    prepend-icon="mdi-account"
                    v-model="username"
                    label="Username"
                    :success-messages="usernameTriggers.success ? 'Username Available' : ''"
                    :error-messages="usernameTriggers.error ? usernameTriggers.errorMessage : ''"
                    :loading="usernameTriggers.loading"
                ></v-text-field>
                <v-text-field
                    prepend-icon="mdi-email"
                    v-model="email"
                    label="Email"
                    type="email"
                    :success-messages="emailTriggers.success ? 'Email Available' : ''"
                    :error-messages="emailTriggers.error ? emailTriggers.errorMessage : ''"
                    :loading="emailTriggers.loading"
                ></v-text-field>
                <v-text-field
                    prepend-icon="mdi-textbox-password"
                    v-model="password"
                    label="Password"
                    type="password"
                ></v-text-field>
                <v-btn type="submit" block dark>Register</v-btn>
            </v-form>
        </v-col>
        <v-col cols="12" class="d-flex justify-center align-center flex-column">
            <p>Already a User?</p>
            <v-btn outlined @click="$router.push('/login')">Login</v-btn>
        </v-col>
    </v-row>
</template>

<script>
import axios from "@/config/axios";
import debounce from "lodash.debounce";

export default {
    data() {
        return {
            username: "",
            email: "",
            password: "",
            usernameTriggers: {
                success: false,
                error: false,
                loading: false,
                errorMessage: ""
            },
            emailTriggers: {
                success: false,
                error: false,
                loading: false,
                errorMessage: ""
            }
        };
    },
    methods: {
        submit() {
            const payload = {
                username: this.username,
                email: this.email,
                password: this.password
            };
            this.$awn.asyncBlock(
                this.$store.dispatch("user/register", payload),
                () => {
                    this.$router.push("home");
                    this.$awn.success("User Registered");
                },
                this.next,
                "Registering User"
            );
        },
        checkUsername() {
            if (!this.username) {
                return;
            } else {
                axios
                    .post("/users/verify/username", { username: this.username })
                    .then(() => {
                        this.usernameTriggers.error = false;
                        this.usernameTriggers.success = true;
                    })
                    .catch(({ response: { data: { message } } }) => {
                        this.usernameTriggers.error = true;
                        this.usernameTriggers.success = false;
                        this.usernameTriggers.errorMessage = message;
                    })
                    .finally(() => (this.usernameTriggers.loading = false));
            }
        },
        checkEmail() {
            const regex = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!this.email) {
                return;
            } else if (!regex.test(this.email)) {
                this.emailTriggers.loading = false;
                this.emailTriggers.error = true;
                this.emailTriggers.errorMessage = "Invalid Email Format";
            } else {
                axios
                    .post("/users/verify/email", { email: this.email })
                    .then(() => {
                        this.emailTriggers.error = false;
                        this.emailTriggers.success = true;
                    })
                    .catch(({ response: { data: { message } } }) => {
                        this.emailTriggers.error = true;
                        this.emailTriggers.success = false;
                        this.emailTriggers.errorMessage = message;
                    })
                    .finally(() => (this.emailTriggers.loading = false));
            }
        }
    },
    watch: {
        username(val) {
            this.usernameTriggers.error = false;
            this.usernameTriggers.success = false;
            if (!val) {
                this.usernameTriggers.loading = false;
            } else {
                this.usernameTriggers.loading = true;
                this.debouncedCheckUsername();
            }
        },
        email(val) {
            this.emailTriggers.error = false;
            this.emailTriggers.success = false;
            if (!val) {
                this.emailTriggers.loading = false;
            } else {
                this.emailTriggers.loading = true;
                this.debouncedCheckEmail();
            }
        }
    },
    created() {
        this.debouncedCheckUsername = debounce(this.checkUsername, 1500);
        this.debouncedCheckEmail = debounce(this.checkEmail, 1500);
    }
};
</script>

<style>
</style>