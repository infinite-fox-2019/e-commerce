<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-btn block dark @click="$router.push('/transaction')">Back</v-btn>
            </v-col>
            <v-col
                v-for="(product, index) in singleTransaction.products"
                :key="index"
                cols="12"
                lg="6"
            >
                <CardProduct :product="product" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CardProduct from "@/components/Transaction/CartProduct";
export default {
    components: {
        CardProduct
    },
    computed: {
        ...mapState("transaction", ["singleTransaction"])
    },

    created() {
        this.$awn.asyncBlock(
            this.$store.dispatch(
                "transaction/getSingleTransaction",
                this.$route.params.id
            ),
            null,
            this.next,
            "Getting Transaction"
        );
    }
};
</script>

<style>
</style>