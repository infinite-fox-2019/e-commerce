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
                <div class="col" style='background-color: green'>
                    <b-button pill variant="success">Order Now</b-button>
                </div>
                <div class="col" style='background-color: blue'>
                    Price <h1>$ {{takeProduct.price}}</h1>
                </div>
            </div>
        </b-card>
        </b-card-group>
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