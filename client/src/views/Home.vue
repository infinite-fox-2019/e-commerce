<template>
    <v-container>
        <v-row>
            <v-col v-for="product in products" :key="product._id" cols="12" lg="3" md="4" sm="6">
                <ProductCard :product="product" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ProductCard from "@/components/Shop/ProductCard";

export default {
    components: {
        ProductCard
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
