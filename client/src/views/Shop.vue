<template>
  <div>
    <Slideout :touch="false" :toggleSelectors="['.toggle-button', '.another-toggle']" @on-open = "logger" ><Main/></Slideout>
  </div>
</template>

<script>
import Slideout from 'vue-slideout'
import Main from '../components/Main.vue'

export default {
  name: 'Shop',
  components: {
    Slideout, Main
  },
  mounted: function () {
    console.log(this.$children[0].slideout.isOpen())
  },
  methods: {
    logger: function () {
      console.log('open event')
    }
  }
}
</script>
<style>
body {
  width: 100%;
  height: 100%;
  margin: 0;
}

.slideout-menu {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 256px;
  height: 100vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  z-index: 0;
  display: none;
  background-color: #1d1f20;
  color: white;
}

.slideout-menu-left {
  left: 0;
}

.slideout-menu-right {
  right: 0;
}

.slideout-panel {
  background-color: aliceblue;
  color: white;
  position: relative;
  z-index: 1;
  will-change: transform;
  min-height: 100vh;
}

.slideout-open,
.slideout-open body,
.slideout-open .slideout-panel {
  overflow: hidden;
}

.slideout-open .slideout-menu {
  display: block;
}
</style>
