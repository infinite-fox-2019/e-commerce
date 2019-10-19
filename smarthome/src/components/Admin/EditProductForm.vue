<template>
    <v-card>
        <v-form @submit.prevent="save">
            <v-toolbar dark color="pink">
                <v-btn icon dark @click="$emit('close')">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Edit Product</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark text @click="reset">Undo</v-btn>
                </v-toolbar-items>
                <v-toolbar-items>
                    <v-btn dark text type="submit">Save</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-container>
                <v-row justify="center">
                    <v-col>
                        <v-text-field prepend-icon="mdi-rename-box" label="Name" v-model="name"></v-text-field>
                        <v-text-field
                            prepend-icon="mdi-cash-multiple"
                            label="Price"
                            type="number"
                            prefix="Rp."
                            v-model="price"
                        ></v-text-field>
                        <v-text-field
                            prepend-icon="mdi-numeric"
                            label="Stock"
                            type="number"
                            v-model="stock"
                        ></v-text-field>
                        <v-file-input
                            prepend-icon="mdi-image"
                            label="Product Image"
                            accept="image/*"
                            @change="setImage"
                            messages="Only select a new image if you want to set a new one."
                        ></v-file-input>
                        <v-row justify="center" class="mt-6" v-if="imagePreview">
                            <v-img
                                contain
                                :src="imagePreview"
                                alt="123"
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
    name: "product-form",
    data() {
        return {
            name: "",
            price: null,
            stock: null,
            image: "",
            imagePreview: ""
        };
    },
    props: ["product"],
    methods: {
        ...mapActions("product", ["editProduct"]),
        save() {
            const vm = this;
            let formData = new FormData();
            formData.append("image", vm.image);
            formData.set("name", vm.name);
            formData.set("price", vm.price);
            formData.set("stock", vm.stock);
            const payload = {
                id: vm.product._id,
                data: formData
            };
            vm.$awn.asyncBlock(
                vm.editProduct(payload),
                () => {
                    vm.$awn.success("Product Updated");
                    vm.$emit("close");
                },
                vm.next,
                "Editing Product..."
            );
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
        },
        reset() {
            this.name = this.product.name;
            this.price = this.product.price;
            this.stock = this.product.stock;
            this.imagePreview = this.product.image;
        }
    },
    created() {
        this.reset();
    }
};
</script>

<style>
</style>