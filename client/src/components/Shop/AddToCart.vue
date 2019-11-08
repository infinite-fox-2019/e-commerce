<template>
    <v-card>
        <v-container>
            <v-card-title class="headline">Set Buy Amount</v-card-title>
            <v-form ref="form" lazy-validation @submit.prevent="submit">
                <v-text-field
                    type="number"
                    :rules="required"
                    v-model="quantity"
                    label="Quantity"
                    outlined
                    prepend-inner-icon="mdi-numeric"
                ></v-text-field>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text type="submit">Add to cart</v-btn>
                </v-card-actions>
            </v-form>
        </v-container>
    </v-card>
</template>

<script>
export default {
    name: "add-to-cart",
    props: ["product"],
    data() {
        return {
            quantity: 1,
            required: [
                v => !!v || "Please set buy amount",
                v => v > 0 || "Buy amount cannot be 0 or negative"
            ]
        };
    },
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                this.$emit("close");
                this.$emit("loading-start");
                this.$awn.async(
                    this.$store.dispatch("cart/addProductToCart", {
                        id: this.product._id,
                        quantity: this.quantity
                    }),
                    () => {
                        this.$awn.success("Product added to cart");
                        this.$emit("loading-end");
                    },
                    err => {
                        this.$emit("loading-end");
                        this.next(err);
                    },
                    "Adding product to cart"
                );
            }
        }
    }
};
</script>

<style>
</style>