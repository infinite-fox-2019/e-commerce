<template>
<div id='apa'>
    <b-card-group deck v-for='(user,_id) in theUser' :key='_id' style='padding:25px'>
        <b-card 
            :title="user.email" 
            header-tag="header" 
            footer-tag="footer"
            >
        <template 
            v-slot:header
            >
            <h6 
                class="mb-0"
                style='font-size: 25px; color: gold;'
                >{{user.username.toUpperCase()}}
            </h6>
        </template>
        <b-card-text>{{user.address}}</b-card-text>
        <b-button 
            href="#" 
            variant="primary"
            >Edit
        </b-button> | 
        <b-button 
            href="#" 
            variant="danger"
            >Delete
        </b-button>
        <template 
            v-slot:footer>
            <em>{{user.role}}
            
            </em>
        </template>
        </b-card>
    </b-card-group>
</div>
</template>

<script>
export default {
    props:['theUser']
}
</script>

<style>
#apa{
    display: flex;
    flex-wrap: wrap;
}
</style>