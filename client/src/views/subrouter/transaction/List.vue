<template>
    <v-container>
        <v-data-table :headers="headers" :items="transactions" class="elevation-1">
            <template v-slot:item._id="{ item }">
                <v-btn outlined @click="getSingleTransaction(item._id)">{{ item._id }}</v-btn>
            </template>
            <template v-slot:item.createdAt="{ item }">
                <v-list-item class="px-0 mx-0">
                    <v-list-item-content>{{ item.createdAt | moment("dddd, MMMM Do YYYY") }}</v-list-item-content>
                </v-list-item>
            </template>
            <template v-slot:item.status="{ item }">
                <v-chip @click="setStatus(item.status)" dark>{{ item.status }}</v-chip>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    data() {
        return {
            headers: [
                {
                    text: "Invoice ID",
                    align: "left",
                    sortable: false,
                    value: "_id"
                },
                {
                    text: "Invoice Date",
                    value: "createdAt"
                },
                {
                    text: "Status",
                    value: "status"
                }
            ]
        };
    },
    computed: {
        ...mapState("transaction", ["transactions"])
    },
    methods: {
        ...mapActions("transaction", [
            "getTransactions",
            "setTransactionDelivered"
        ]),
        setStatus(status) {
            console.log(status);
        },
        getSingleTransaction(id) {
            this.$router.push("/transaction/" + id);
        }
    },
    created() {
        this.$awn.asyncBlock(
            this.getTransactions(),
            null,
            this.next,
            "Fetching User Transaction"
        );
    }
};
</script>

<style>
</style>