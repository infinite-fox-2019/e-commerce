<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <template v-slot:activator="{ on }">
            <v-card :loading="loading" class="text-truncate mx-auto my-12" max-width="374">
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
                    <v-btn color="deep-purple accent-4" v-on="on" text>Edit</v-btn>
                    <v-btn color="red accent-4" text @click="deleteProduct(product.id)">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </template>
        <EditProductForm :product="product" @close="dialog = false" />
    </v-dialog>
</template>

<script>
import EditProductForm from "./EditProductForm";
export default {
    name: "product-card",
    props: ["product"],
    components: {
        EditProductForm
    },
    data: () => ({
        loading: false,
        selection: 1,
        dialog: false
    }),

    methods: {
        edit(id) {
            this.loading = true;

            setTimeout(() => (this.loading = false), 2000);
        },
        deleteProduct(id) {
            return;
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