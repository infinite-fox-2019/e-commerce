<template>
  <div>
    <nav class="admin">
      <router-link to="/admin">Income</router-link>
      <router-link to="/admin/create">Add Item</router-link>
      <router-link to="/admin/items">List Item</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {

}
</script>

<style>
h2:hover {
  cursor: pointer;
}
.admin{
    height: 50px;
    background: black;
    display: flex;
    justify-content: flex-start
}
.admin a{
    padding: 20px;
    color: white
}
a.router-link-exact-active {
color : rgb(17, 199, 17);
font-weight: bold
}
</style>
