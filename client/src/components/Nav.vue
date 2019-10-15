<template>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="secondary">
    <b-navbar-brand href="#">DreamCar Official</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <router-link 
            to="/" 
            style='font-size:25px; color:gold'
            >Home | 
        </router-link> 
        <router-link 
            to='/contact' 
            style='font-size:25px; color:gold'
            >| Contact
        </router-link>
      </b-navbar-nav>
      <b-badge 
        pill 
        variant="success" 
        style='margin:0 50px;'
        v-if='loginStatus'
        >Online

        </b-badge>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input 
            size="sm" 
            class="mr-sm-2" 
            placeholder="Search"
            >
        </b-form-input>
          <b-button 
            size="sm" 
            class="my-2 my-sm-0" 
            type="submit"
            >Search
        </b-button>
        </b-nav-form>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>User</em>
          </template>
          <b-dropdown-item 
            href="#"
            >Profile
        </b-dropdown-item>
          <b-dropdown-item 
            href="#" 
            v-if='!loginStatus'
            >
              <router-link 
                to='/login'
                >Login
            </router-link>
          </b-dropdown-item>
          <b-dropdown-item 
            href="#"
            @click='logout()'
            v-else
            >Sign Out
        </b-dropdown-item>
        <b-dropdown-item 
            href="#"
            v-if='loginRole=="Admin"'
            >
            <router-link
                to='/admin'
                >Admin
            </router-link>
        </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import swal from 'sweetalert2';

export default {
    data(){
        return {

        }
    },
    props: ['loginStatus','loginRole'],
    methods :{
        logout(){
            localStorage.removeItem('token');
            swal.fire({
                type: 'info',
                title: 'See you again!'
            })
            this.$emit('changeloginstatus',false);
            this.$emit('changeloginrole', '')
            this.$router.push('/');
        }
    },
    watch:{
        status(){
            this.loginStatus;
            this.loginRole
        }
    }
}
</script>

<style scoped>
</style>