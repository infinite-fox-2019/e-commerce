<template>
    <v-card class="mx-auto">
        <v-list-item three-line>
            <v-list-item-content>
                <v-list-item-title class="display-1 mb-4">{{product.product.name}}</v-list-item-title>
                <v-list-item-subtitle class="mb-3">
                    <strong>Single Price:</strong>
                    {{ convertToRp }}
                </v-list-item-subtitle>
                <v-list-item-subtitle class="mb-3">
                    <strong>Buy Quantity:</strong>
                    {{product.quantity}}
                </v-list-item-subtitle>
                <v-list-item-subtitle class="subtitle-1">
                    <strong>Total Price</strong>
                    : {{totalPrice}}
                </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile size="80" color="grey">
                <v-img :src="product.product.image" alt="product image"></v-img>
            </v-list-item-avatar>
        </v-list-item>
    </v-card>
</template>

<script>
export default {
    name: "cart-product",

    props: ["product"],
    computed: {
        convertToRp() {
            return `Rp.${this.product.product.price
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
        },
        totalPrice() {
            let total = this.product.product.price * this.product.quantity;
            return `Rp.${total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
        }
    }
};
</script>

<style>
</style>