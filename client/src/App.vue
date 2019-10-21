<template>
  <v-app>
    <Header />
    <Navbar />
    <UserForm />
    <v-content>
      <!-- <HelloWorld/> -->
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld'
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import UserForm from '@/components/UserForm'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    Header,
    Navbar,
    UserForm
  },
  data: () => ({
    //
  })
}
</script>
