<template>
  <div>
      <nav>
          <div class="logo">
                <router-link to="/">
                    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <image xlink:href='https://image.flaticon.com/icons/svg/57/57546.svg' alt="symbol" height="40" width="40"/>
                    </svg>
                </router-link>
            </div>
            <div class="click">
                <router-link class="btn btn-primary" to="/">Home</router-link>
                <router-link class="btn btn-primary" to="/register">Register</router-link>
                <router-link class="btn btn-primary" id="btn-left" to="/login">Login</router-link>
            </div>
      </nav>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.btn{
  padding: 10px;
  margin: 5px;
}
#btn-left {
  margin-right: 20px;
}
nav {
  background-color: rgb(50, 48, 70);
  height: 68px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
}
img {
  height: 61px;
}
.logo {
  margin-left: 14px;
  display: flex;
  align-items: center;
}
.logo:hover {
  cursor: pointer;
}
.click {
  display: flex;
  align-items: center;
  margin-right: 15px;
}
</style>
