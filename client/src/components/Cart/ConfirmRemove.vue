<template>
    <v-card :loading="loading">
        <v-container>
            <v-row>
                <v-col cols="12" class="d-flex justify-center">
                    <v-card-title class="headline">Remove?</v-card-title>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn block color="red" dark @click="remove">Yes</v-btn>
                </v-col>
                <v-col>
                    <v-btn block color="blue" dark @click="$emit('close')">No</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
export default {
    name: "confirm-remove",
    props: ["product"],
    data() {
        return {
            loading: false
        };
    },
    methods: {
        remove() {
            this.loading = true;
            this.$store
                .dispatch("cart/removeProductToCart", this.product.product._id)
                .then(() => {
                    this.$emit("close");
                })
                .catch(this.next)
                .finally(() => (this.loading = false));
        }
    }
};
</script>

<style>
</style>