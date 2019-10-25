<template>
<div
  class="car">
  <figure
    class="card"
    style="--bg-image-url: url();">
      <img
        class="card__image"
        alt="Alt text here"
        :src="getProduct.image"
        >
      <figcaption
        class="card__info"
        >{{getProduct.brand+ ' ' +getProduct.name}}
        <br>
         Started $ {{getProduct.price}}
      <button>
        <router-link
          :to="{ name: 'book', params: {id: getProduct._id} }"
          >Book Now!
        </router-link>
      </button>
      </figcaption>
  </figure>
</div>

</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: ['getProduct']
}

</script>

<style>

button{
  background:transparent;
  color:turquoise;
  border:none;
  position:relative;
  height:35px;
  font-size:1em;
  padding:0 2em;
  cursor:pointer;
  transition:800ms ease all;
  outline:none;
}
button:hover{
  background:black;
  color:red;
}
button:before,button:after{
  content:'';
  position:absolute;
  top:0;
  right:0;
  height:2px;
  width:0;
  background: gold;
  transition:400ms ease all;
}
button:after{
  right:inherit;
  top:inherit;
  left:0;
  bottom:0;
}
button:hover:before,button:hover:after{
  width:100%;
  transition:550ms ease all;
}

.car{
  padding-left:15px;
  padding-right: 10px
}
.card {
  margin-top: 25px;
  position: relative;
  width: 600px;
  height: 350px;

  border-radius: 20px;
  overflow: hidden;

  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
}

.card > * {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.card__image {
  display: block;
}

.card__info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  padding: 2em;
  opacity: 0;
  font-size: 20px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);

  transition: opacity 300ms ease;
}

.card:hover .card__info,
.card:focus-within .card__info {
  opacity: 1;
}

.card__info a {
  color: #fdca40;
}

</style>
