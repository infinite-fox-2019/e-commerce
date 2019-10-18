<template>
  <div class="nav">
      <div>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
      </div>
      <div>Logo Bikelah</div>
      <div>
        <router-link to="/products">Products</router-link> |
        <router-link to="/user">Account</router-link> |
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.nav{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    background-color: rgba(95, 0, 0, 0.795);
    color: aliceblue;
    margin-left: 20px;
    margin-right: 20px;
    width: 100%;
}

router-link{
    color:white;
    text-emphasis: none;
}
</style>
