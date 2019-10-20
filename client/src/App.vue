<template>
  <div id="app">
      <router-link to="/"></router-link>
      <router-link to="/addProduct"></router-link>
      <router-link to="/detail/:id"></router-link>
      <router-link to="/search"></router-link>
      <router-link to="/cart"></router-link>
      <router-link to="/register"></router-link>
    <router-view/>
  </div>
</template>
