<template>
   <div class="trasactionContainer">
        <div class="header">
            <h4>Trasaction</h4>
            <p>{{ getDate }}</p>
            <p v-if="isAdmin">{{ transaction.userId.email }}</p>
        </div>
        <div class="pl-5">
            <div v-for="(item, index) in transaction.items" :key="index" class="itemsContainer">
                <img :src="item.productId.image" :alt="item.productId.name" style="height: 50px;" class="my-2">
                <p class="text-left ml-3" style="display: inline">{{ item.productId.name }}</p>
            </div>
        </div>
        <div class=" p-2 d-flex justify-content-between">
            <h4 class="p-2">${{ transaction.totalPrice }}.00</h4>
            
            <button v-if="transaction.status == 'pending' && !isAdmin" @click.prevent="pay" class="btn btn-secondary w-25">Pay</button>
            <button v-if="transaction.status == 'paid' && !isAdmin" class="btn btn-success w-25" disabled>Paid</button>
            <button v-if="transaction.status == 'paid' && isAdmin" @click.prevent="confirmPayment" class="btn btn-info w-25">Confirm Payment</button>
            <button v-if="transaction.status == 'payment confirmed' && !isAdmin" @click.prevent="done" class="btn btn-info w-25">Product Received</button>
            <button v-if="transaction.status == 'done'" @click.prevent="done" class="btn btn-success w-25" disabled>Done</button>

        </div>
        
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  
    props:['transaction'],
    methods: {
        pay(){
            this.$store.dispatch('changeStatus', {  transactionsId : this.transaction._id, status: 'paid'})
        },
        confirmPayment(){
            this.$store.dispatch('changeStatus', {  transactionsId : this.transaction._id, status: 'payment confirmed'})
        },
        done(){
            console.log(`masuk sini`);
            this.$store.dispatch('changeStatus', {  transactionsId : this.transaction._id, status: 'done'})
        },
    },
    computed: {
            ...mapState(['isAdmin']),
          getDate(){
            let options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
            }
            return new Date(this.transaction.createdAt).toLocaleDateString("en-US", options);
        },
      }
}

</script>

<style>
.trasactionContainer{
    margin: 50px;
    width: 90%;
    box-shadow: 3px 3px 23px 0px rgba(0, 0, 0, 0.198);
    border-radius: 15px;
    padding: 15px;
}

.header {
    width: 100%;
}

.header p {
    font-size: 10px;
    margin: 0;
}

.itemsContainer {
    width: 30%;
    display: flex;
    align-items: center;    
    justify-content: start;
}

</style>