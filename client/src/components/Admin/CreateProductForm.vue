<template>
    <v-card>
        <v-form @submit.prevent="save" lazy-validation ref="form">
            <v-toolbar dark color="primary">
                <v-btn icon dark @click="$emit('close')">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Add Product</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark text type="submit">Save</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-container>
                <v-row justify="center">
                    <v-col>
                        <v-text-field
                            messages="Required."
                            prepend-icon="mdi-rename-box"
                            label="Name"
                            :rules="rules"
                            v-model="name"
                        ></v-text-field>
                        <v-text-field
                            prepend-icon="mdi-cash-multiple"
                            label="Price"
                            type="number"
                            prefix="Rp."
                            v-model="price"
                            :rules="rules"
                            messages="Required."
                        ></v-text-field>
                        <v-text-field
                            prepend-icon="mdi-numeric"
                            label="Stock"
                            type="number"
                            v-model="stock"
                            :rules="rules"
                            messages="Required."
                        ></v-text-field>
                        <v-file-input
                            prepend-icon="mdi-image"
                            label="Product Image"
                            accept="image/*"
                            @change="setImage"
                            messages="Required."
                            :rules="rules"
                        ></v-file-input>
                        <v-row justify="center" v-if="imagePreview">
                            <v-img
                                contain
                                :src="imagePreview"
                                alt="new image"
                                max-height="300"
                                max-width="300"
                            ></v-img>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: "create-product-form",
    data() {
        return {
            name: "",
            price: null,
            stock: null,
            image: "",
            imagePreview: "",
            rules: [v => !!v || "Required."]
        };
    },
    methods: {
        ...mapActions("product", ["addProduct"]),
        save() {
            if (this.$refs.form.validate()) {
                const vm = this;
                let formData = new FormData();
                formData.append("image", vm.image);
                formData.set("name", vm.name);
                formData.set("price", vm.price);
                formData.set("stock", vm.stock);
                vm.$awn.asyncBlock(
                    vm.addProduct(formData),
                    () => {
                        vm.$awn.success("Product Updated");
                        vm.$emit("close");
                    },
                    vm.next,
                    "Adding product"
                );
            }
        },
        setImage(val) {
            const vm = this;
            vm.image = val;
            if (vm.image) {
                if (vm.image.type.includes("image")) {
                    const reader = new FileReader();
                    reader.readAsDataURL(vm.image);

                    reader.onload = function(event) {
                        const content = event.target.result;
                        vm.imagePreview = content;
                    };

                    reader.onerror = function(event) {
                        vm.$awn.alert("Selected file cannot be read");
                    };
                } else {
                    vm.$awn.warning("Selected file is not an image");
                }
            } else {
                vm.imagePreview = "";
            }
        }
    }
};
</script>

<style>
</style>