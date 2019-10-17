<template>
    <v-card :loading="loading" class="text-truncate mx-auto my-12" max-width="374">
        <v-img height="250" :src="product.image"></v-img>

        <v-card-title class="subtitle-1">{{product.name}}</v-card-title>

        <v-card-text>
            <v-row align="center" class="mx-0">
                <div>{{convertToRp}}</div>
            </v-row>

            <div class="my-4 subtitle-2 black--text">Available Stock: {{stockSeparator}}</div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-actions>
            <v-btn color="deep-purple accent-4" text @click="addToCart(product.id)">Add To Cart</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: "product-card",
    props: ["product"],
    data: () => ({
        loading: false,
        selection: 1
    }),

    methods: {
        addToCart(id) {
            this.loading = true;

            setTimeout(() => (this.loading = false), 2000);
        }
    },
    computed: {
        stockSeparator() {
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