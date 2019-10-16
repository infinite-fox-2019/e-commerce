<template>
<div class='leftside'>
    <b-list-group>
        <b-list-group-item 
            button
            @click='goVideo()'
             class='group'
            >Preliminary
        </b-list-group-item>
        <b-list-group-item 
            button
            @click='goUsers()'
             class='group'
            >Users
        </b-list-group-item>
        <b-list-group-item 
            button
            @click='goProduct()'
             class='group'
            >Products
        </b-list-group-item>
        <b-list-group-item 
            button
            @click='goCreateProduct()'
             class='group'
            >Create New Product
        </b-list-group-item>
        <b-list-group-item 
            button
            disabled
             class='group'
            >ericsudhartio2509@gmail.com
        </b-list-group-item>
        <div class="spinner-grow text-secondary" v-if='isloading' role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </b-list-group>

</div>
</template>

<script>
import Right from './Rightside';
import axios from 'axios';
import swal from 'sweetalert2';

export default {
    data(){
        return {
            isloading: false
        }
    },
    methods:{
        goVideo(){
            this.$emit('get-video','video');
        },
        goUsers(){
            this.$emit('get-users','user');
        },
        goCreateProduct(){
            this.$emit('get-createproduct','create');
        },
        goProduct(){
            this.isloading = true;
            this.$emit('get-product','products');
            axios({
                method : 'get',
                url: 'http://localhost:3000/products',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(({data})=>{
                    this.isloading=false;
                    this.$emit('list-product',data)
                })
                .catch(err=>{
                    this.isloading= false;
                    swal.fire({
                        type: 'error',
                        title: 'Don\'t have access!',
                        text: err.response.data.msg
                    })
                })
        }
    }
}
</script>

<style scoped>
.leftside{
    padding:10px;
    margin: 100px 70px;
}
.group{
    margin:10px 0px;;
}
</style>