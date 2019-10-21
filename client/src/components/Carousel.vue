<template>
   <v-carousel :cycle="false" interval="6000">
    <v-carousel-item
      v-for="(color, i) in colors"
      :key="color"
      transition="fade-transition"
    >
      <v-sheet
        :color="color"
        height="100%"
        tile
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="display-3">Slide {{ i + 1 }}</div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data () {
    return {
      colors: [
        'primary',
        'secondary',
        'yellow darken-2',
        'red',
        'orange'
      ]
    }
  }
}
</script>

<style>

</style>
