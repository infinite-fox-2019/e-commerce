<template>
  <div class="platforms">
    <div id="switch" class="circle"><span>S</span></div>
    <div id="ps" class="circle"><span>P</span></div>
    <div id="xbox" class="circle"><span>X</span></div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.platforms {
    margin: 3%;
    display: flex;
    justify-content: center;
}

.platforms div {
    margin: 3%;
}

.circle {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  background-color: rgb(44, 44, 44);
  /* width and height can be anything, as long as they're equal */
}

.circle span {
    font-size: 50px;
    color: white;
}

.circle:hover {
    cursor: pointer;
    background-color: red;
}

</style>
