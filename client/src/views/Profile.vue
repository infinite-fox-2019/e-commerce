<template>
<div id="card">
    <h1>{{ fetchUser.username.toUpperCase() }}</h1>
    <div class="image-crop">
        <img id="avatar" src="https://nianow.com/sites/nianow.com/files/support-graphics/icons/profile-default-photo.png">
    </div>
    <div id="bio">
        <p>{{ fetchUser.email }}</p>
        <p>{{ fetchUser.address }}</p>
    </div>
    <div id="stats">
        <div class="col">
            <p class="stat">108</p>
            <p class="label">Posts</p>
        </div>
                <div class="col">
            <p class="stat">457</p>
            <p class="label">Followers</p>
        </div>
                <div class="col">
            <p class="stat">229</p>
            <p class="label">Following</p>
        </div>
    </div>
    <div id="buttons">
        <button>Edit Profile</button>
        <button class="button button--moema button--text-thick button--text-upper button--size-s">Verification</button>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            fetchUser: ''
        }
    },
    methods: {
        goProfile(){
          axios({
            method: 'get',
            url: 'http://localhost:3000/findprofile',
            headers: {
              token: localStorage.getItem('token')
            }
          })
            .then(({data})=>{
              this.fetchUser = data
            })
        }
    },
    created(){
        this.goProfile()
    }
}
</script>

<style scoped>
#card {
	background-color: #393B45;
	height: auto;
	width: 350px;
	margin: 10vh auto;
	border-radius: 25px;
	padding-bottom: 1px;
	box-shadow: 2px 2px 5px #4069E2;
}

h1 {
	color: white;
	text-align: center;
	width: 100%;
    font-size: 30px;
	background-color: #E6EBEE;
	border-radius: 25px 25px 0 0;
	color: #393B45;
	padding: 30px 0;
	font-weight: 500;
	margin: 0;
}

.image-crop {
	display: block;
	position: relative;
	background-color: #E6EBEE;
	width: 150px;
	height: 150px;
	margin: 0 auto;
	margin-top: 30px;
	overflow: hidden;
	border-radius: 50%;
	box-shadow: 1px 1px 5px #4069E2;
}

#avatar {
	display: inline;
	margin-left: -34px;
}

#bio {
	display: block;
	margin: 30px auto;
	width: 280px;
	height: auto;
}

#bio p {
	color: #E6EBEE;
	font-weight: lighter;
	font-size: 15px;
	text-align: justify;
}

#stats {
	display: flex;
	flex-direction: row;
	height: auto;
	width: 280px;
	justify-content: space-between;
	align-items: center;
	margin: 0 auto;
	font-weight: 500;
}

.col {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: auto;
}

.stat {
	font-size: 25px;
	margin: 0;
}

.label {
	margin: 0;
}

#buttons {
	display: flex;
	margin: 0 auto;
	justify-content: space-between;
	width: 280px;
}

button {
	display: block;
	position: relative;
	padding: 10px 0;
	width: 130px;
	margin: 30px 0;
	border-radius: 25px;
	border: none;
	font-size: 20px;
	letter-spacing: 0.2px;
	font-weight: 500;
	background-color: #4069E2;
	color: #E6EBEE;
}

button:focus {
	display: none;
}

button:hover {
	transform: scale(1.03);
	cursor: pointer;
	transition: all 0.2s ease-in-out;
}

#msg{
	background-color: #E6EBEE;
	color: #393B45;
}
</style>