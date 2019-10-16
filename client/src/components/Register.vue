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
            <b-form-group label="Username:">
                <b-form-input
                    v-model="username"
                    placeholder="Username"
                ></b-form-input>
            </b-form-group>
            <b-form-group label="Password:">
                <b-form-input
                    v-model="password"
                    type="password"
                    placeholder="Password"
                ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
        <p class="h-4">Old User?</p>
        <b-button @click="redirectToLogin" variant="primary">Login</b-button>
    </div>
</template>

<script>
    export default {
    name: "Register",
    data() {
        return {
            email: "",
            username: "",
            password: ""
        }
    },
    methods: {
        onSubmit(e) {
            e.preventDefault()
            this.$emit("formValue", {
                username: this.username,
                email: this.email,
                password: this.password
            })
            this.email = ""
            this.username = ""
            this.password = ""
        },
        redirectToLogin() {
            this.$router.push("/login")
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
