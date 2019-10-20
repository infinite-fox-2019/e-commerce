<template>
<div>
     <div class="card33__image-container">
       <img class="card33__image" :src="getProduct.image" alt="">
    </div>
      
      <svg class="card33__svg" viewBox="0 0 800 500">

        <path d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500" stroke="transparent" fill="#333"/>
        <path class="card33__line" d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400" stroke="pink" stroke-width="3" fill="transparent"/>
      </svg>
    
     <div class="card33__content">
       <ul>
         <li>
            <h1 class="card33__title">{{getProduct.brand+' '+getProduct.name}}</h1>
         </li>
       </ul>
       <ul>
         <li>
          <span style='font-size: 12px'>
              <p>{{getProduct.description}}</p>
          </span>
         </li>
       </ul>
       <ul>
         <li>
           <button>Edit</button>
         </li>
         <li>
           <button @click='sureDelete(getProduct._id,getProduct.brand)'>Delete</button>
         </li>
       </ul>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'

export default {
  props: ['getProduct'],
  methods: {
    sureDelete(id,brand){
      axios({
        method: 'delete',
        url: `http://localhost:3000/products/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data})=>{
          swal.fire({
            type: 'success',
            title: 'Deleted',
            text: data.msg
          })
        })
        .catch(err=>{
          swal.fire({
            type: 'error',
            title: 'woops',
            text: err.response.data.msg
          })
        })
    }
  }
}
</script>

<style lang='scss'>
li{
  display : inline-block
}
.card33 {
  margin-left: 30px;
  margin-top: 10px;
  position: relative;
  background: #333;
  width: 500px;
  height: 50vh;
  border-radius: 6px;
  padding: 2rem;
  color: #aaa;
  box-shadow: 0 .25rem .25rem rgba(0,0,0,0.2),
    0 0 1rem rgba(0,0,0,0.2);
  overflow: auto;
  
  &__image-container {
    margin: -2rem -2rem 1rem -2rem;
  }
  
  &__line {
  opacity: 0;
  animation: LineFadeIn .8s .5s forwards ease-in;
  }

  &__image {
    opacity: 0;
    animation: ImageFadeIn .8s 1.4s forwards;
  }

  &__title {
    color: white;
    margin-top: 0;
    font-size:30px;
    font-weight: 800;
    letter-spacing: 0.01em;
  }
  
  &__content {
    margin-top: -1rem;
    opacity: 0;
    animation: ContentFadeIn .8s 1.6s forwards;
  }
  
  &__svg {
    position: absolute;
    left: 0;
    top: 100px;
  }
}
</style>