<template>
<div class="bodyyy">
    <div class="shadow">BOOK NOW!</div>

<div class="card">
  <div class="card__front card__part">
    <img class="card__front-square card__square" src="https://image.ibb.co/cZeFjx/little_square.png">
    <p class="card_numer">{{oneProduct.brand + ' ' + oneProduct.name}}</p>
    <div style='margin-top:-20px'>Your code for book behind this card</div>
    <div class="card__space-75">
      <span class="card__label">don't take it seriously</span>
    </div>
    <div class="card__space-25">
      <span class="card__label">Just Project</span>
            <p class="card__info">10/25</p>
    </div>
  </div>

  <div class="card__back card__part">
    <div class="card__black-line"></div>
    <div class="card__back-content">
      <div class="card__secret">
        <p class="card__secret--last">{{getCode}}</p>
      </div>
        <a class ='a2'><span class='span2'></span><router-link :to="{ name: 'transaction', params: {id:this.$route.params.id} }">Ready?{{time}}</router-link></a>
      <img class="card__back-square card__square" src="https://image.ibb.co/cZeFjx/little_square.png">
      <img class="card__back-logo card__logo" src="https://www.fireeye.com/partners/strategic-technology-partners/visa-fireeye-cyber-watch-program/_jcr_content/content-par/grid_20_80_full/grid-20-left/image.img.png/1505254557388.png">

    </div>
  </div>

</div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'book',
  data () {
    return {
      oneProduct: '',
      getCode: 0,
      idTransaction: '',
      time: '5s'
    }
  },
  methods: {
    fetchData () {
      axios({
        method: 'get',
        url: `http://dreamcarserver.dreamcarofficial.com/products/sc/${this.$route.params.id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          if (data.brand == 'Lamborghini') {
            this.getCode = 420
          } else if (data.brand == 'Honda') {
            this.getCode = 450
          } else if (data.brand == 'Ferrari') {
            this.getCode = 225
          } else if (data.brand == 'Audi') {
            this.getCode = 500
          } else if (data.brand == 'Toyota') {
            this.getCode = 190
          } else if (data.brand == 'BMW') {
            this.getCode = 775
          } else if (data.brand == 'Mercedes-Benz') {
            this.getCode = 772
          } else {
            this.getCode = 335
          }
          this.oneProduct = data
        })
        .catch(err => {
          this.$awn.warning('Something Wrong')
        })
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<style>
:root {
    --gradient-shadow: linear-gradient(
        45deg,
        #fb0094,
        #0000ff,
        #00ff00,
        #ffff00,
        #ff0000,
        #fb0094,
        #0000ff,
        #00ff00,
        #ffff00,
        #ff0000
    );
}
.bodyyy {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50vh
}
.shadow {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    color: #fff;
    text-align: center;
    font-size: 50px;
    font-weight: bold;
    width: 600px;
    height: 100px;
    background: linear-gradient(0deg, #000, #262626);
}
.shadow:before,
.shadow:after {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    background: var(--gradient-shadow);
    background-size: 400%;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    z-index: -1;
    animation: animate 20s linear infinite;
}

.shadow:after {
    filter: blur(20px);
}

@keyframes animate {
    0% {
        background-position: 0 0;
    }
    50% {
        background-position: 300% 0;
    }
    100% {
        background-position: 0 0;
    }
}

@import url('https://fonts.googleapis.com/css?family=Space+Mono:400,400i,700,700i');

.title {
    margin-bottom: 30px;
    color: #162969;
}

.card{
width: 320px;
height: 190px;
margin-top: 50px;
  -webkit-perspective: 600px;
  -moz-perspective: 600px;
  perspective:600px;

}

.card__part{
  box-shadow: 1px 1px #aaa3a3;
    top: 0;
  position: absolute;
  left: 0;
  display: inline-block;
    width: 320px;
    height: 190px;
    background-image: url('https://image.ibb.co/bVnMrc/g3095.png'), linear-gradient(to right bottom, #fd696b, #fa616e, #f65871, #f15075, #ec4879); /*linear-gradient(to right bottom, #fd8369, #fc7870, #f96e78, #f56581, #ee5d8a)*/
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 8px;

    -webkit-transition: all .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    -moz-transition: all .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    -ms-transition: all .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    -o-transition: all .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition: all .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
}

.card__front{
  padding: 18px;
-webkit-transform: rotateY(0);
-moz-transform: rotateY(0);
}

.card__back {
  padding: 18px 0;
-webkit-transform: rotateY(-180deg);
-moz-transform: rotateY(-180deg);
}

.card__black-line {
    margin-top: 5px;
    height: 38px;
    background-color: #303030;
}

.card__logo {
    height: 16px;
}

.card__front-logo{
      position: absolute;
    top: 18px;
    right: 18px;
}
.card__square {
    border-radius: 5px;
    height: 30px;
}

.card_numer {
    display: block;
    width: 100%;
    word-spacing: 4px;
    font-size: 20px;
    letter-spacing: 2px;
    color: #fff;
    text-align: center;
    margin-bottom: 20px;
    margin-top: 20px;
}

.card__space-75 {
    width: 75%;
    float: left;
}

.card__space-25 {
    width: 25%;
    float: left;
}

.card__label {
    font-size: 8px;
    text-transform: uppercase;
    color: black;
    letter-spacing: 1px;
}

.card__info {
    margin-bottom: 0;
    margin-top: 5px;
    font-size: 16px;
    line-height: 18px;
    color: #fff;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.card__back-content {
    padding: 15px 15px 0;
}
.card__secret--last {
    color: #303030;
    text-align: right;
    margin: 0;
    font-size: 14px;
}

.card__secret {
    padding: 5px 12px;
    background-color:black;
    position:relative;
}

.card__secret:before{
  content:'';
  position: absolute;
top: -3px;
left: -3px;
height: calc(100% + 6px);
width: calc(100% - 42px);
border-radius: 4px;
  background: repeating-linear-gradient(45deg, #ededed, #ededed 5px, #f9f9f9 5px, #f9f9f9 10px);
}

.card__back-logo {
    position: absolute;
    bottom: 15px;
    right: 15px;
}

.card__back-square {
    position: absolute;
    bottom: 15px;
    left: 15px;
}

.card:hover .card__front {
    -webkit-transform: rotateY(180deg);
    -moz-transform: rotateY(180deg);

}

.card:hover .card__back {
    -webkit-transform: rotateY(0deg);
    -moz-transform: rotateY(0deg);
}

.a2
{
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 45px;
    background: #232323;
    text-decoration: none;
    text-transform: uppercase;
    text-align: center;
    line-height: 50px;
    color: #FF0;
    font-size: 10px;
    font-family: verdana;
    letter-spacing: 4px;
/*    border-radius: 20px; */
}

.a2:before,
.a2:after,
.span2:before,
.span2:after
{
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    background: #FF0;
    transition: 5s;
}

.a2:before
{
    top: -2px;
    left: -2px
}
a:after
{
    top: -2px;
    right: -2px;
}
.span2:before
{
    bottom: -2px;
    left: -2px
}
.span2:after
{
    bottom: -2px;
    right: -2px
}

.a2:hover:before,
.a2:hover:after,
.a2:hover span:before,
.a2:hover span:after
{
    width: calc( 180px/2 );
    height: calc( 50px/2 )
}
</style>
