<template>
  <b-navbar class="container">
        <template slot="brand">
            <b-navbar-item href="/dashboard/brian/">
                <h3 class="text-white">
                    studykale
                </h3>
            </b-navbar-item>
            
        </template>

        <template slot="end">
            <b-navbar-item href="#">
                Settings
            </b-navbar-item>
            <b-navbar-item>
                Profile
            </b-navbar-item>
            <b-navbar-item @click="signout">
                Log out
            </b-navbar-item>
            <b-navbar-dropdown :label="name">
                <b-navbar-item  href="#">
                    Profile
                </b-navbar-item>
                <b-navbar-item href="#">
                    Settings
                </b-navbar-item>
                <b-navbar-item href="#">
                    Log out
                </b-navbar-item>
            </b-navbar-dropdown>
            <div class="avatar">
                <img src="../../assets/images/brown.jpg" alt="user avatar">
            </div>
        </template>
    </b-navbar>
</template>

<script>
import { mapActions } from "vuex"
export default {
    name: 'Navbar',
    data() {
        return {
            navigation: 'Home',
            name: this.$route.params.username
        }
    },
    firebase: {

    },
    methods: {
        ...mapActions('user', ['signout']),
        addNewProject() {
            console.log("added new project")
        }
    }
}
</script>

<style lang="scss" scoped>

    .navbar-item {
        &.navbar-link.is-active {
            color: darkblue !important;
        }
       .navbar-dropdown {
           a {
               color: #111 !important;
           }
           a:hover {
               color: white !important;
           }
       }


         &:hover {
             background: none;
         }
    }
    .avatar {
        margin: 8px 20px 8px 0;
        height: 40px;
        width: 40px;

        img {

            height: inherit;
            object-fit: cover;
            object-position: center;
            border-radius: 50%;
        }
    }
</style>