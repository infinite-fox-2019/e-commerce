<template>
  <a-layout>
    <a-layout-sider></a-layout-sider>
    <a-layout-content id="blank">
          <br>
        <h1>ADMIN AUTHORIZATION</h1>
        <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>

<script>
export default {
    name : 'admin',
    data(){
        return {

        }
    }
};
</script>

<style scoped>
#blank{
    background-color: white;
    height: 92vh;
}

</style>