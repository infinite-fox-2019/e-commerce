<template>
  <div class="topnav">
          <ul>
            <li>DreamCar Official</li>
              <li>
                <router-link 
                  to="/" 
                  >
                  <div class="btn btn-one">
                      <span>Home</span>
                  </div>
                </router-link>
              </li>
              <li>
                <router-link 
                  to="/contact" 
                  >
                  <div class="btn btn-one">
                      <span>Contact</span>
                  </div>
                </router-link>
              </li>
              <li>
                <b-badge 
                  pill 
                  variant="success" 
                  v-if='loginStatus'
                  >Online
                </b-badge>
              </li>
              <li>
                  <b-form-input 
                    size="sm" 
                    class="mr-sm-2" 
                    placeholder="Search"
                    >
                  </b-form-input>
                <b-button 
                  size="sm" 
                  class="my-2 my-sm-0" 
                  type="submit"
                  >Search
                </b-button>
              </li>
                <router-link 
                  to="/profile" 
                  >
                  <span  class="btn btn-one">Profile</span>
                </router-link>
              <li>
                <a v-if='loginRole=="Admin"'>
                <router-link 
                  to="/admin" 
                  >
                    <span class="btn btn-one">Admin</span>
                </router-link>
                </a>
                <a v-if='!loginStatus'>
                <router-link 
                  to="/login" 
                  >
                      <span class="btn btn-one">Login</span>
                </router-link>
                </a>  
                <a v-else @click='logout()' class="btn btn-one" style='color:gold'>
                      <span>LogOut</span>
                  </a>

              </li>
              <li>
              </li>
          </ul>
      </div>
</template>

<script>
import swal from 'sweetalert2';

export default {
    data(){
        return {

        }
    },
    props: ['loginStatus','loginRole'],
    methods :{
        logout(){
            localStorage.removeItem('token');
            swal.fire({
                type: 'info',
                title: 'See you again!'
            })
            this.$emit('changeloginstatus',false);
            this.$emit('changeloginrole', '')
            this.$router.push('/');
        }
    },
    watch:{
        status(){
            this.loginStatus;
            this.loginRole
        }
    }
}
</script>

<style scoped>
.btn {
	width: 100px;
}
.btn-one {
	color: gold;
	transition: all 0.3s;
	position: relative;
}
.btn-one span {
	transition: all 0.3s;
}
.btn-one::before {
	content: '';
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1;
	opacity: 0;
	transition: all 0.3s;
	border-top-width: 1px;
	border-bottom-width: 1px;
	border-top-style: solid;
	border-bottom-style: solid;
	border-top-color: rgba(255,255,255,0.5);
	border-bottom-color: rgba(255,255,255,0.5);
	transform: scale(0.1, 1);
}
.btn-one:hover span {
  letter-spacing: 2px;
  color: red;
}
.btn-one:hover::before {
	opacity: 1;	
	transform: scale(1, 1);	
}
.btn-one::after {
	content: '';
	bottom: 0;
	left: 0;
	z-index: 1;
	transition: all 0.3s;
	background-color: rgba(255,255,255,0.1);
}
.btn-one:hover::after {
	opacity: 0;	
	transform: scale(0.1, 1);
}

div{
    width: 100%;
    height: auto;
    text-align: center;
    margin-left: 5%;
    margin-top: 2%;
   
   
}
ul{
    height: 90px;
    width: 1500px;
    list-style-type: none;
    font-family: 'levoto', sans-serif;
      
    animation: animate 20s linear;
   box-shadow: 2px 2px 15px 0px rgba(12,32,56);;
    border-style: none;
    border-radius: 20px;
}
@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
}
li{
    color: white;
    display: flex;
    float: left;
    padding: 30px;
    font-size: 18px;
     
}
li:hover{
    color:darkred;
    background-color: transparent;
    border-radius: 10px;
}
@keyframes animate{
    0%{
      box-shadow: 2px 2px 15px 3px rgba(12,32,56);;
    }
     5%{
        box-shadow: 2px 2px 16px 3px red;
    }
     10%{
      box-shadow: 2px 2px 17px 3px Aquamarine;
    }
     15%{
       box-shadow: 2px 2px 18px 3px seashell;
    }
     20%{
       box-shadow: 2px 2px 19px 3px maroon;
    }
    25%{
      box-shadow: 2px 2px 19px 3px green;
    }
     30%{
      box-shadow: 2px 2px 18px 3px darkorange;
    }
     35%{
       box-shadow: 2px 2px 27px 3px deeppink;
    }
     40%{
       box-shadow: 2x 2px 16px 3px Snow;
    }
     45%{
       box-shadow: 2px 2px 15px 3px IndianRed;
    }
    50%{
       box-shadow: 2px 2px 16px 3px Cornsilk;
    }
     55%{
       box-shadow: 2px 2px 17px 3px GreenYellow;
    }
     60%{
       box-shadow: 2px 2px 18px 3px Teal;
    } 65%{
       box-shadow: 2px 2px 19px 3px NavajoWhite;
    }
     70%{
       box-shadow: 2px2px 18px 3px YellowGreen;
    }
     75%{
       box-shadow: 2px 2px 17px 3px DarkTurquoise;
    }
     80%{
      box-shadow: 2px 2px 16px 3px DarkSlateGray;
    }
     85%{
       box-shadow: 2px2px 15px 3px Plum;
    }
     90%{
       box-shadow: 2px 2px 14px 3px ForestGreen;
    }
     95%{
       box-shadow: 2px 2px 13px 3px Purple;
    }
       100%{
       box-shadow: 2px 2px 12px 3px DarkSlateBlue	;
}
    
}

</style>