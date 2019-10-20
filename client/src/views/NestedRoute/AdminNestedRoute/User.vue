<template>
<div class="cardss">
  <div class="cards" v-for='(user,_id) in theUser' :key='_id'>
    <h2>{{user.username.toUpperCase()}}</h2>
    <p>{{ user.email }}</p>
    <p>{{ user.address }}</p>
    <h3>{{ user.role }}</h3> <small>ROLE</small>
    <hr>
    <ul>
      <li>
        <button @click='eEditRole(user.id,user.role)'>Edit Role</button>
      </li>
      <li>
        <button @click='deleteee(user.id)'>Delete</button>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import axios from "axios";
import swal from 'sweetalert2';

export default {
    data() {
      return {
        theUser: ''
      }
    },
    methods: {
      deleteee(id){
        axios({
          method: 'delete',
          url: `http://dreamcarserver.dreamcarofficial.com/${id}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({data})=>{
            this.$awn.success(data.msg)
            this.fetchData()
          })
          .catch(err=>{
            this.$awn.error('something Wrong')
          })
      },
      fetchData(){
        axios({
              method: 'get',
              url: 'http://dreamcarserver.dreamcarofficial.com/',
              headers: {token: localStorage.getItem('token')
                  
              }
          })
              .then(({data})=>{
                  this.theUser = data
              })
              .catch(err=>{
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
      eEditRole(id,role){
        console.log(id)
        axios({
          method: 'patch',
          url: `http://dreamcarserver.dreamcarofficial.com/${id}`,
          data: {
            role
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(_=>{
            this.$awn.success('Update Done');
            this.fetchData()
          })
      }
    },
    created() {
      this.fetchData()
      this.$awn.success('Fetching Data')
    }
}
</script>

<style scoped>
.cardss {
  display: flex;
  margin-top:100px;
  align-items: center;
}
.cards {
   color: white;
  background-image: linear-gradient(
    to top right,
    rgb(60, 60, 60),
    rgb(40, 40, 40)
  );
  border-radius: 1rem;
  padding: 5rem 3rem;
  box-shadow: 4px 4px 12px 1px rgba(0, 0, 0, 0.35);
  transition: 0.4s ease;
}

.cards:not(:first-child) {
  margin-left: -13rem;
}

.cards:hover {
  transform: translateY(-2rem);
}

.cards:hover ~ .cards {
  transform: translateX(13rem);
}

</style>