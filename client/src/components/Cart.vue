<template>
  <div id="cart">
      <b-card no-body class="overflow-hidden" style="max-width: 540px;">
        <b-row no-gutters>
        <b-col md="6">
            <b-card-img :src="cartfromhome.image" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="6">
            <b-card-body :title="cartfromhome.name">
            <b-card-text>
              Price: ${{ cartfromhome.price }}
            </b-card-text>
             <b-button class="b" href="#" variant="danger">Remove</b-button>
            </b-card-body>
        </b-col>
        </b-row>
    </b-card> <br><br>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Cart',
  props: ['cartfromhome', 'getCart'],
  created() {
    this.getCart()
  }
}
</script>

<style>
#cart {
  padding: 0px;
  margin: 0px;
}
</style>