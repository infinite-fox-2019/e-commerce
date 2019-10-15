<template>
  <div>
        <Video
            v-if='theCommand=="video" '
            />
        <User
            v-else-if='theCommand=="user"'
            :the-user='theUsers'
            />
        <Setting
            v-else-if='theCommand=="products"'
            :the-products='theProducts'
            />
        <Create
            v-else-if='theCommand=="create"'
            />
  </div>
</template>

<script>
import Video from '../components/Video.vue';
import User from '../components/User.vue';
import Setting from '../components/Setting.vue';
import Create from '../components/Create.vue';

export default {
    data(){
        return {

        }
    },
    props: ['theCommand','theUsers','theProducts'],
    components:{
        Video,
        User,
        Setting,
        Create
    }
}
</script>

<style>
</style>