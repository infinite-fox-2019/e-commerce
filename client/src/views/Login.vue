<template>
    <Login
        @formValue="getData"
    />
</template>

<script>
import Login from "@/components/Login"
import Axios from "axios"
import Swal from "sweetalert2"
export default {
    components: {
        Login
    },
    data() {
        return {
            user: {
                username: "",
                email: "",
                role: ""
            }
        }
    },
    methods: {
        getData(data) {
            Axios({
                method: "post",
                url: "http://localhost:3000/user/login",
                data,
            })
            .then(({ data }) => {
                this.user = data
                localStorage.setItem("token", this.user.token)
                this.$emit("passUser", this.user)
                this.$router.push("/")
            })
            .catch(({ response }) => {
                const { data } = response
                Swal.fire("Oops..", data.msg, "error")
            })
        }
    }
};
</script>
