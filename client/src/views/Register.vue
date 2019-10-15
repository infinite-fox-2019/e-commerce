<template>
<div class='allthis'>
      <div class="inside">
          <form @submit.prevent='register()'>
          <table>
              <tr>
                  <td>
                    <label>Username</label>
                  </td>
                  <td>
                    <input 
                        v-model='form.username' 
                        type='text' 
                        placeholder="username"
                        ><br>
                  </td>
              </tr>
              <tr>
                  <td>
                    <label>Password</label>
                  </td>
                  <td>
                    <input 
                        type='password' 
                        v-model='form.password' 
                        placeholder='password'
                        ><br>
                  </td>
              </tr>
              <tr>
                  <td>
                    <label>Address</label>
                  </td>
                  <td>
                    <input 
                        type='text' 
                        v-model='form.address' 
                        placeholder='jl.example'
                        ><br>
                  </td>
              </tr>
              <tr>
                  <td>
                    <label>Email</label>
                  </td>
                  <td>
                    <input 
                        type='email' 
                        v-model='form.email' 
                        placeholder='username@example.id'
                        ><br>
                  </td>
              </tr>
              <tr>
                  <td>
                        <input 
                            class='btn-primary' 
                            type='submit'
                            value='Register'
                            >
                  </td>
                    <div class="spinner-grow text-secondary" v-if='isloading' role="status">
                    <span class="sr-only">Loading...</span>
                </div>
              </tr>
          </table>
          </form>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert2';

export default {
    data(){
        return{
            form:{
                username: '',
                password: '',
                email: '',
                address: ''
            },
            isloading: false,
        }
    },
    methods: {
        register(){
            const {username,password,email,address} = this.form;
            this.isloading= true;
            axios({
                method: 'post',
                url: 'http://localhost:3000/register',
                data:{
                    username,
                    password,
                    email,
                    address
                }
            })
                .then(({data})=>{
                    swal.fire({
                        type: 'success',
                        title: 'Yeah created!',
                        text: data.msg
                    })
                    this.$router.push('/login')
                    this.isloading= false;
                })
                .catch(err=>{
                    swal.fire({
                        type: 'error',
                        title: 'Oooopss!',
                        text: err.response.data.msg
                    })
                    this.isloading= false;
                })
        }
    }
}
</script>

<style>
.inside{
    margin: 100px 700px;
    justify-content: center;
}
</style>