<template>
<div class='leftside'>
    <div class="menu effect-08">
        <h3 class="menu_title">Dream Car</h3>
        <ul>
            <li>
                <a href="#"
                    button
                    @click='goVideo()'
                    class='group'
                    >Preliminary
                </a>
            </li>
            <li>
                <a href="#"
                    button
                    @click='goUsers()'
                    class='group'
                    >
                    Users
                </a>
            </li>
            <li>
                <a href="#"
                    button
                    @click='goProduct()'
                    class='group'
                    >
                    Products
                </a>
            </li>
            <li>
                <a href="#"
                    button
                    @click='goCreateProduct()'
                    class='group'
                    >
                    Create New Product
                </a>
            </li>
            <li>
                <a href='#'
                    button
                    disabled
                    >
                    ericsudhartio2509@gmail.com
                </a>
            </li>
        </ul>
    </div>
        <div class="spinner-grow text-secondary" v-if='isloading' role="status">
            <span class="sr-only">Loading...</span>
        </div>
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
    margin:10px 0px;
}
.group:hover{
    transform: rotate(10deg);
}
	.menu.effect-08 ul li a {
		border-radius: 3px;
		overflow: hidden;
		position: relative;
	}
	.menu.effect-08 ul li a:after,
	.menu.effect-08 ul li a:before {
		content: ' ';
		display: block;
		height: 0;
		position: absolute;
		width: 120%;
		z-index: 0;
	}
	.menu.effect-08 ul li a:after {
		background: rgba(14, 249, 14, 0.9);
		bottom: 50%;
		right: 0%;
		-webkit-transition: all 200ms 250ms ease-in-out;
		transition: all 200ms 250ms ease-in-out;
	}
	.menu.effect-08 ul li a:before {
		background: rgba(76, 76, 171, 0.9);
		top: 50%;
		left: 0%;
		-webkit-transition: all 200ms 125ms ease-in-out;
		transition: all 200ms 125ms ease-in-out;
	}
	.menu.effect-08 ul li a:hover {
		box-shadow: inset 0 0 80px rgba(0,0,0,.6);
		color: gold;
		text-shadow: 0.05em .05em .05em rgba(255, 234, 4, 0.5);
	}
	.menu.effect-08 ul li a:hover:after {
		background: rgba(255, 247, 4, 0.1);
		bottom: -10%;
		height: 120%;
		position: relative;
		right: -10%;
	}
	.menu.effect-08 ul li a:hover:before {
		background: rgba(255, 56, 10, 0.3);
		height: 120%;
		left: -10%;
		position: relative;
		top: -10%;
	}
.menu,
.menu .menu_title,
.menu ul li a,
.menu ul li a:after,
.menu ul li a:before {
	-webkit-transition: all 300ms ease-in-out;
	transition: all 300ms ease-in-out;
}
.menu {
	border-bottom: 1px solid rgba(0,0,0,.05);
	border-top: 1px solid gold;
	margin: 0;
	padding: 60px 0;
}
.menu:hover {
	background: #fff;
	border-bottom: 1px solid rgba(0,0,0,.2);
}
.menu .menu_title {
	color: gold;
	font-size: 1.5em;
	font-weight: 300;
	margin: 0 0 20px;
}
.menu:hover .menu_title {
	color: #0af;
	text-shadow: 0 1px 1px rgba(0,0,0,.1);	
}
.menu ul {
	display: block;
	list-style: none;
	margin: 0;
	padding: 0;
}
.menu ul li {
	display: inline-block;
}
.menu ul li a {
	color: #555;
	display: block;
	line-height: 50px;
	padding: 0 30px;
	text-decoration: none;
}

</style>