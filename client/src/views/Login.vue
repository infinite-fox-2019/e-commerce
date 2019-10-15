<template>
  <div class='allthis'>
      <div class="inside">
          <form @submit.prevent='login()'>
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
                        <input 
                            class='btn-primary' 
                            type='submit'
                            >
                  </td>
                  <td>
                        <router-link
                            to='/register'
                            >Register
                        </router-link>
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
import axios from 'axios'
import swal from 'sweetalert2'

export default {
    data(){
        return {
            form: {
                username: '',
                password: ''
            },
            isloading: false
        }
    },
    methods: {
        login(){
            const username = this.form.username;
            const password = this.form.password;
            this.isloading= true;
            axios({
                method : 'post',
                url: 'http://localhost:3000/login',
                data: {
                    username,
                    password
                }
            })
                .then(({data})=>{
                    swal.fire({
                        type: 'success',
                        title: 'You\'re Online now',
                        text: data.msg
                    })
                    localStorage.setItem('token',data.token)
                    this.$router.push('/');
                    this.$emit('islogin',true);
                    this.$emit('isrole',data.role)
                    this.isloading= false;
                })
                .catch(err=>{
                    swal.fire({
                        type: 'error',
                        title: 'Ooooops!',
                        text: err.response.data.msg
                    })
                    this.isloading= false;
                })
        }
    }
}
</script>

<style scoped>
.inside{
    margin: 100px 700px;
    justify-content: center;
}
</style>