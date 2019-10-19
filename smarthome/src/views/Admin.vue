<template>
    <v-container>
        <v-row>
            <v-col v-for="product in products" :key="product._id" cols="12" lg="3" md="4" sm="6">
                <ProductCardAdmin :product="product" />
            </v-col>
            <v-dialog
                v-model="dialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
            >
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" dark fixed fab bottom right color="pink" @click="formKey++">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </template>
                <CreateProductForm @close="dialog = false" :key="formKey" />
            </v-dialog>
        </v-row>
    </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ProductCardAdmin from "@/components/Admin/ProductCardAdmin";
import CreateProductForm from "@/components/Admin/CreateProductForm";

export default {
    components: {
        ProductCardAdmin,
        CreateProductForm
    },
    data() {
        return {
            dialog: false,
            formKey: 0
        };
    },
    created() {
        this.$awn.async(
            this.getProducts(),
            null,
            this.next,
            "Fetching Products..."
        );
    },
    methods: {
        ...mapActions("product", ["getProducts"])
    },
    computed: {
        ...mapState("product", ["products"])
    }
};
</script>
