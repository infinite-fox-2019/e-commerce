<template>
<div class='card'>   
    <div>
        <h2>{{takeProduct.brand}} {{takeProduct.name}}</h2>
        <b-card-group deck>
        <b-card :img-src="takeProduct.image" img-alt="Card image" img-top>
            <b-card-text>
            {{takeProduct.description}}
            </b-card-text>
            <div class="row">
                <div class="col" style='background-color: blue'>
                    Price <h1>$ {{takeProduct.price}}</h1>
                </div>
                <div class="col-2" style='background-color: green'>
                    <b-button pill variant="success">Order Now</b-button>
                </div>
                <div class="col-2">
                    <button class="slide">&nbsp;</button>
                </div>
            </div>
        </b-card>
        </b-card-group>
        <!-- cards try -->

        <div class="card card-1"></div>
    </div>
</div>

</template>

<script>
export default {
    data(){
        return {
        }
    },
    props: ['takeProduct'],
}

</script>

<style>

button {
  position: relative;
  display:block;
  height: 45px;
  width: 150px;
  margin: 10px 7px;
  padding: 5px 5px;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 2px;
  color: #383736;
  border: 2px #383736 solid;
  border-radius: 4px;
  text-transform: uppercase;
  outline: 0;
  overflow:hidden;
  background: none;
  z-index: 1;
  cursor: pointer;
  transition:         0.08s ease-in;
  -o-transition:      0.08s ease-in;
  -ms-transition:     0.08s ease-in;
  -moz-transition:    0.08s ease-in;
  -webkit-transition: 0.08s ease-in;
}
.slide:after{
  content:"View Story";
  position:absolute;
  width:100%;
  height:100%;
  left:0;
  text-align:center;
  -webkit-transition: all 400ms cubic-bezier(0.680, -0.550, 0.265, 1.550); 
}

.slide:before {
  content:"Read it →";
  height:100%;
  width:100%;
  position:absolute;
  color:#383736;
  left:-100%;
  opacity: 0;
  -webkit-transition: all 500ms cubic-bezier(0.680, -0.550, 0.265, 1.550); 
}

.slide:hover{
  background:#383736;
}

.slide:hover:before{
  left:0;
  opacity:1;
  color:#fff;
}
.slide:hover:after{
  left:100%;
  opacity:0;
}

.card{
    background-color: transparent;
    padding :10px;
}
h2{
    font-size: 35px;
    color: gold;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}


</style>