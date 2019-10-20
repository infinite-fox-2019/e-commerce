<template>

<body class="text-center">

      <div class="container d-flex align-items-center justify-content-center">

      <main role="main" class="inner cover justify-content-center p-5 rounded">
        <h1 class="cover-heading"><strong>WELCOME TO HACKTIV8-COMMERCE</strong></h1>
        <p class="lead">TO SEE ALL OF OUR PRODUCTS AND OUR CONTENTS, PLEASE LOGIN FIRST</p>

          <button class="btn btn-lg btn-primary"><router-link to="login">LOGIN</router-link></button>

      </main>

    </div>
</body>

</template>

<script>
export default {

}
</script>

<style scoped>
/*
 * Globals
 */

/* Links */
a,
a:focus,
a:hover {
  color: #fff;
}

/* Custom default button */
.btn-secondary,
.btn-secondary:hover,
.btn-secondary:focus {
  color: #333;
  text-shadow: none; /* Prevent inheritance from `body` */
  background-color: #fff;
  border: .05rem solid #fff;
}

/*
 * Base structure
 */

html,
body {
  height: 750px;
  background: linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url('../../public/opening.jpg');
  background-size: cover;
}

body {
  display: -ms-flexbox;
  display: flex;
  color: #fff;
  text-shadow: 0 .05rem .1rem rgba(0, 0, 0, .5);
  box-shadow: inset 0 0 5rem rgba(0, 0, 0, .5);
}

h1, p{
    font-family: 'Timmana', sans-serif;
}

main{
    background-color: rgba(0, 0, 0, 0.673);
}
.cover-container {
  max-width: 42em;
}

/*
 * Header
 */
.masthead {
  margin-bottom: 2rem;
}

.masthead-brand {
  margin-bottom: 0;
}

.nav-masthead .nav-link {
  padding: .25rem 0;
  font-weight: 700;
  color: rgba(255, 255, 255, .5);
  background-color: transparent;
  border-bottom: .25rem solid transparent;
}

.nav-masthead .nav-link:hover,
.nav-masthead .nav-link:focus {
  border-bottom-color: rgba(255, 255, 255, .25);
}

.nav-masthead .nav-link + .nav-link {
  margin-left: 1rem;
}

.nav-masthead .active {
  color: #fff;
  border-bottom-color: #fff;
}

@media (min-width: 48em) {
  .masthead-brand {
    float: left;
  }
  .nav-masthead {
    float: right;
  }
}

/*
 * Cover
 */
.cover {
  padding: 0 1.5rem;
}
.cover .btn-lg {
  padding: .75rem 1.25rem;
  font-weight: 700;
}

/*
 * Footer
 */
.mastfoot {
  color: rgba(255, 255, 255, .5);
}
</style>
