<template>
    <b-breadcrumb :items="routes"></b-breadcrumb>
</template>

<script>
    export default {
        data() {
            return {
                routes: [
                    {
                        text: 'Home',
                        to: "/"
                    },
                    {
                        text: "Cart",
                        to: "/cart"
                    },
                    {
                        text: 'Sign Up',
                        to: "/register"
                    },
                    {
                        text: 'Log In',
                        to: "/login"
                    },
                    {}
                ]
            }
        }
    }
</script>