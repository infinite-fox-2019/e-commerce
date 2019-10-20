<template>
<div class="row">
    <div class="col-4">
        <Left
            @get-video='toVideo'
            @get-users='toUsers'
            @get-product='toProducts'
            @list-product='fetchProduct'
            @get-createproduct='toCreateProduct'
            >
        </Left>
    </div>
    <div class="col-8">
        <router-view />
    </div>
</div>
</template>

<script>
import Left from '../components/Leftside';
import axios from 'axios'
import swal from 'sweetalert2'

export default {
    data(){
        return{
            users: '',
            getAllUser: '',
            getAllProduct: '',
            command: ''
        }
    },
    methods: {
        toVideo(type){
            this.command = type;
        },
        toUsers(type){
            this.command = type;
            this.users = this.getAllUser
        },
        toProducts(type){
            this.command = type;
        },
        fetchProduct(data){
            this.getAllProduct = data
        },
        toCreateProduct(type){
            this.command = type
        }
    },
    components:{
        Left,
    },
    props:['login-role'],
    created(){
    },
    watch:{
        command(){
            this.command;
        }
    }
}
</script>

<style scoped>
.col-8{
    justify-content: center;
    align-items: center
}
</style>