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
        <Right
            :the-command='command'
            :the-users='users'
            :the-products='getAllProduct'
            >
        </Right>
    </div>
</div>
</template>

<script>
import Left from '../components/Leftside';
import Right from '../components/Rightside';
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
        Right,
    },
    props:['login-role'],
    created(){
        axios({
            method: 'get',
            url: 'http://localhost:3000/',
            headers: {
                token: localStorage.getItem('token')
            }
        })
            .then(({data})=>{
                console.log(data)
                this.getAllUser = data
            })
            .catch(err=>{
                console.log(err.response.data.msg)
                if(err.response.data.msg == 'Authentication Error'){
                    swal.fire({
                        type: 'warning',
                        title: 'Hmmmmm',
                        text: "Please Login First!"
                    })
                }else if(err.response.data.msg == 'Authorization Error'){
                    swal.fire({
                        type: 'error',
                        title: 'DANGER!!',
                        text: "You went too far, do not have access to enter here"
                    })
                }else{
                    swal.fire({
                        type: 'warning',
                        title: 'oops!!',
                        text: err.response.data.msg
                    })
                }
                this.$router.push('/');
            })
    },
    watch:{
        command(){
            this.command;
        }
    }
}
</script>

<style scoped>
.row{
    background-color: grey
}
</style>