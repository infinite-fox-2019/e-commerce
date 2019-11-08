<template>
    <v-container>
        <v-row>
            <v-col v-for="(product, index) in cart" :key="index" cols="12" lg="6">
                <CardProduct :product="product" />
            </v-col>
            <v-col cols="12" v-if="cart.length">
                <v-btn block color="indigo" @click="buy" dark>Purchase</v-btn>
            </v-col>
            <v-col cols="12" v-if="!cart.length" class="d-flex justify-center">
                <h1>Empty Cart...</h1>
            </v-col>
            <v-col cols="12" v-if="!cart.length" class="d-flex justify-center">
                <v-img contain max-width="500" src="@/assets/602652_1.png"></v-img>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CardProduct from "@/components/Cart/CartProduct";
export default {
    name: "cart-page",
    components: {
        CardProduct
    },
    created() {
        this.$awn.asyncBlock(
            this.$store.dispatch("cart/getCart"),
            () => {},
            this.next,
            "Fetching User Cart"
        );
    },
    computed: {
        ...mapState("cart", ["cart"])
    },
    methods: {
        ...mapActions("transaction", ["purchase"]),
        buy() {
            this.$awn.asyncBlock(
                this.purchase(),
                () => this.$router.push("transaction"),
                this.next,
                "Purchasing"
            );
        }
    }
};
</script>

<style>
</style>