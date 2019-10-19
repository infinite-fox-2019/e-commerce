<template>
    <v-card :loading="loading" class="text-truncate mx-auto my-12">
        <v-img height="250" contain :src="product.image"></v-img>

        <v-card-title class="subtitle-1">{{product.name}}</v-card-title>

        <v-card-text>
            <v-row align="center" class="mx-0">
                <div>{{convertToRp}}</div>
            </v-row>

            <div class="my-4 subtitle-2 black--text">Available Stock: {{stockSeparator}}</div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-actions>
            <v-dialog v-model="dialog" max-width="374">
                <template v-slot:activator="{ on }">
                    <v-btn color="deep-purple accent-4" text v-on="on">Add To Cart</v-btn>
                </template>
                <AddToCart
                    @close="dialog = false"
                    @loading-start="loading = true"
                    @loading-end="loading = false; dialogKey++"
                    :product="product"
                />
            </v-dialog>
        </v-card-actions>
    </v-card>
</template>

<script>
import AddToCart from "./AddToCart";

export default {
    name: "product-card",
    props: ["product"],
    components: {
        AddToCart
    },
    data: () => ({
        loading: false,
        selection: 1,
        dialog: false,
        dialogKey: 0
    }),

    methods: {},
    computed: {
        stockSeparator() {
            if (this.product.stock === 0) return "Out of Stock";
            return this.product.stock
                .toString()
                .replace(/\d(?=(\d{3})+\.)/g, "$&.");
        },
        convertToRp() {
            return `Rp.${this.product.price
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
        }
    }
};
</script>