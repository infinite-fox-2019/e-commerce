<template>
  <!--Begin carousel-->
  <div class="container" id="carousel">
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
      <!-- Indicators -->
      <ol class="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
      </ol>

      <!-- Wrapper for slides -->
      <div class="carousel-inner">
        <div class="item active">
          <img src="https://images-na.ssl-images-amazon.com/images/I/81ffDBGlBtL._AC_SL1500_.jpg" />
        </div>

        <div class="item">
          <img src="https://images-na.ssl-images-amazon.com/images/I/81y%2BEICoOQL._AC_SL1500_.jpg" />
        </div>

        <div class="item">
          <img
            src="https://i.gadgets360cdn.com/large/witcher3_switch_1566387380509.jpg?output-quality=80&output-format=webp"
          />
        </div>
      </div>

      <!-- Left and right controls -->
      <a class="left carousel-control" href="#myCarousel" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="right carousel-control" href="#myCarousel" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
  <!--End carousel-->
</template>

<script>
export default {};
</script>

<style scoped>
#jumbotronHeader {
  background-image: url(https://wallpapercart.com/wp-content/uploads/2019/04/The-Witcher-3-Wild-Hunt-HD-Wallpapers-2.png);
  background-size: cover;
  text-align: left;
  color: #f0f0f0;
  text-shadow: 3px 3px #000000;
}
</style>
