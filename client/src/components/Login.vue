<template>
    <div>
        <b-form @submit="onSubmit">
            <b-form-group label="Email address:">
                <b-form-input
                    v-model="email"
                    type="email"
                    placeholder="Email"
                ></b-form-input>
            </b-form-group>
            <b-form-group label="Password:">
                <b-form-input
                    v-model="password"
                    type="password"
                    placeholder="Password"
                ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Log In</b-button>
        </b-form>
        <p class="h-4">New User?</p>
        <b-button @click="redirectToRegister" variant="primary">Register</b-button>
    </div>
</template>

<script>
    export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        onSubmit(e) {
            e.preventDefault()
            this.$emit("formValue", {
                email: this.email,
                password: this.password
            })
            this.email = ""
            this.password = ""
        },
        redirectToRegister() {
            this.$router.push("/register")
        }
    }
}
</script>

<style scoped>
form {
    width: 50%;
    margin-left: 25%;
    margin-top: 10%;
}
</style>
