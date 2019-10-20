<template>
  <div class="card" @click="toProduct(product)">
    <a-card hoverable style="width: 250px;">
      <img
        alt="example"
        :src="product.image"
        slot="cover"
        height="162;"
        class="cover"
      />
      <a-card-meta class="slotdesc">
        <template slot="description" >
          <p class="title">{{ product.name}}</p>
          <p class="price">${{ product.price }}</p>
          <p class="">Good quality stuff by Sansmarket!</p>
          <div class="tag">
            <a-tag color="#2db7f5" v-if="!product.category.length">no category</a-tag>
            <a-tag color="#2db7f5" v-else v-for="(tag,i) in product.category" :key="i">{{ tag }}</a-tag>
          </div>
        </template>
      </a-card-meta>
    </a-card>
  </div>
</template>

<script>
export default {
  name: "Card",
  props : ['product'],
  data(){
    return {
      
    }
  },
  methods : {
    toProduct(product){
      this.$router.push(`product/${product._id}`)
    }
  }
};
</script>

<style scoped>
.card{
  margin: .5vh
}
@import url('https://fonts.googleapis.com/css?family=Bitter|Open+Sans|Source+Code+Pro&display=swap');
p{
  margin: 0;
  padding: 0;
}
.title{
  font-weight: 700; 
  font-family: 'Bitter', serif;
  font-size: 18px;
}
.price{
  font-weight: 700;
  color: rgb(218, 26, 26);
  font-family: 'Open Sans', sans-serif;
}
.ant-card-body{
  padding: 2vh !important; 
}
.tag{
  margin: 1vh;
}
.cover {
  object-fit: cover;
}
</style>