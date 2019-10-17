<template>
  <div id="app">
    <Nav
      :login-status='loginStatus'
      :login-role='loginRole'
      @changeloginstatus='changeStatus'
      @changeloginrole='changeRole'
      >
    </Nav>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view
      @islogin='gotStatus'
      :login-role='loginRole'
    />



    
  </div>
</template>

<script>
import Nav from './components/Nav'

export default {
  data(){
    return{
      loginStatus: false,
      loginRole: ''
    }
  },
  components: {
    Nav
  },
  methods:{
    gotStatus(status,role){
      this.loginStatus = status
      this.loginRole = role
    },
    changeStatus(status){
      this.loginStatus = status
    },
    changeRole(role){
      this.loginRole = role
    }
  },
  created(){
    if(localStorage.getItem('token')){
      this.loginStatus=true;
    }
    const role = localStorage.getItem('pos');
    if(role === 'Admin'){
      this.loginRole = role;
    }else {
      this.loginRole = 'Customer'
    }
  },
  watch:{
    loginRole(val){
      this.loginRole = val
    }
  }
}
</script>

<style>
body{
  background-image: url("https://images.unsplash.com/photo-1570280407069-9017ba84a3a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80");
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  background-color:red
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
