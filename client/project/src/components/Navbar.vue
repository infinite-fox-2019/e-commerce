<template>
  <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
     <a-row>
      <a-col :span="4" style="color: white">Palu Gada</a-col>
      <a-col :span="14" >
        <a-input-search placeholder="Search products" style="width: 100%" v-model="search" @search="onSearch" />
      </a-col>
      <a-col :span="6" >
        <a-button-group  v-if="!login">
          <!-- <a-button-group> -->
          <a-dropdown :trigger="['click']">
            <a-button type="primary" class="ant-dropdown-link" href="#" > <a-icon type="user" />Login </a-button>
            <a-menu slot="overlay" id="login">
            <Login></Login>
            </a-menu>
          </a-dropdown>
          <a-button type="primary" @click="registerForm"> <a-icon type="user-add" /> Register </a-button>
        </a-button-group>
        <a-button type="primary" v-if="login" @click="logout"  style="margin-right: 10px">Logout</a-button>
        <a-button type="primary" v-if="admin" @click="adminPage">Admin</a-button>
        <a-button shape="circle" icon="shopping-cart" v-if="login && !admin" @click="cartUser"/>
        <!-- <a-button type="primary" shape="round" :size="size">Logout</a-button> -->
      </a-col>
    </a-row>
    </a-layout-header>
</template>

<script>
import Login from '@/components/Login'
import { mapState } from 'vuex'

  export default {
    components : {
      Login
    },
    data(){
      return {
        search: ''
      }
    },
    methods: {
      onSearch(value) {
      },
      registerForm(){
        this.$router.push({path:'/Register'})
      },
      adminPage(){
        this.$router.push({path:'/admin'})
      },
      logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('admin')
        localStorage.removeItem('id')
        // this.admin = false
        // this.login = false
        this.$store.dispatch('logout_state')
      },
      cekLogin(){
      let token = localStorage.getItem('token')
      if(token){
        this.login = true
      } else {
        this.login = false
      }
      },
      cekAdmin(){
      let admin = localStorage.getItem('admin')
      if(admin){
        this.admin = true
      } else {
        this.admin = false
      }
      },
      cartUser(){
        let id = localStorage.getItem('id')
        this.$router.push({path:`/user/${id}`})
      },
    },
    computed : {
      // ...mapState(['login','admin']),
      login : {
        get () {
          return this.$store.state.login
        },
        set (value) {
          return value
        }
      },
      admin : {
        get () {
          return this.$store.state.admin
        },
        set (value) {
          return value
        }
      }
    },
    watch : {
      search(){
        this.$store.dispatch('search', this.search)
      },
      login(newValue){
        if(newValue){
          this.login = newValue
        }
      },
      admin(newValue){
        if(newValue){
          this.admin = newValue
        }
      }
    },
    created(){
     this.cekLogin()
     this.cekAdmin()
    }
  };
</script>

<style>
  #components-layout-demo-fixed .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 24px 16px 0;
    float: left;
  }
  #search{
  z-index: 1; 
  }
</style>