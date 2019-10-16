<template>
    <div class="row">
        <div class="col">
        <h1>Name : {{ Item.product_id.name }}</h1>
        <h4>Price Per Piece : {{ rupiah }} </h4>
        <h4>Quantity : {{ Item.quantity }}</h4>
        </div><div class="col">
        <b-button-group vertical>
            <b-button @click="plus(Item.product_id._id)" variant="outline-dark"> Add + </b-button>
            <b-button @click="minus(Item.product_id._id)" variant="outline-dark"> Remove - </b-button>
        </b-button-group><br>
        <b-button @click="deleteOne(Item.product_id._id)" variant="outline-dark"> Remove From Cart </b-button>
        </div>
    </div>
</template>

<script>
import Swal from "sweetalert2";
import Axios from "axios";

export default {
    name: "Item",
    props: {
        Item: Object
    },
    methods: {
        fetchCart() {
            Axios({
                method: "get",
                url: "http://localhost:3000/cart",
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            .then(({ data }) => {
                this.cart = data
            })
        },
        plus(product_id) {
            Axios({
                method: "patch",
                url: `http://localhost:3000/cart/${product_id}`,
                headers: { token: localStorage.getItem("token") },
                data: { operation: "plus" }
            })
            .then(({ data }) => {
                const { response } = data
                Swal.fire("Congratulations!", response, "success")
            })
            .catch(console.log)
        },
        minus(product_id) {
            Axios({
                method: "patch",
                url: `http://localhost:3000/cart/${product_id}`,
                headers: { token: localStorage.getItem("token") },
                data: { operation: "minus" }
            })
            .then(({ data }) => {
                const { response } = data
                Swal.fire("Congratulations!", response, "success")
            })
            .catch(console.log)
        },
        deleteOne(product_id) {
            Axios({
                method: "delete",
                url: `http://localhost:3000/cart/${product_id}`,
                headers: { token: localStorage.getItem("token") }
            })
            .then(({ data }) => {
                const { response } = data
                Swal.fire("Congratulations!", response, "success")
            })
            .catch(console.log)
        }
    },
    computed: {
        rupiah() {
            const number_string = this.Item.product_id.price.toString()
            const remainder = number_string.length % 3
            let money = number_string.substr(0, remainder)
            const thousand = number_string.substr(remainder).match(/\d{3}/g)
            if (thousand) {
                const separator = remainder ? '.' : '';
                money += separator + thousand.join('.');
            }
            return `Rp. ${money}`
        }
    }
}
</script>

<style scoped>
</style>