<template>
  <section class="landing-page">
    <div class="container">
      <div class="row">
        <div class="col-md-12 d-flex justify-content-center text-center">
          <div>
            <img class="img-logo" src="@/assets/logo.png" alt />
            <hr />
            <button @click="$router.push('/home/list')" class="btn btn-primary">
              Get Started
              <i class="fa fa-angle-right ml-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src

export default {
  name: "landing"
};
</script>
<style>
.landing-page {
  height: 100vh;
  display: flex;
  align-items: center;
}

.img-logo {
  width: 200px;
  height: auto;
}
</style>
