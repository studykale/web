<template>
  <b-navbar class="container">
        <template slot="brand">
            <b-navbar-item href="/dashboard/projects/">
                <h3 class="text-white">
                    studykale
                </h3>
            </b-navbar-item>
            
        </template>

        <template slot="end">
            <b-navbar-dropdown :label="username">
                <b-navbar-item  href="/dashboard/profile">
                    Profile
                </b-navbar-item>
                <b-navbar-item href="/dashboard/settings">
                    Settings
                </b-navbar-item>
                <b-navbar-item @click="signout">
                    Log out
                </b-navbar-item>
            </b-navbar-dropdown>
            <div class="avatar">
                <img v-if="photoURL" :src="photoURL" alt="user avatar">
                <img v-else src="https://avatars.dicebear.com/api/bottts/smile.svg" alt="User avatar default">
            </div>
        </template>
    </b-navbar>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: 'Navbar',
    props: {
        username: {
            type: String,
            default: 'user'
        },
        photoURL: {
            type: String, 
        }
    },
    data() {
        return {
            navigation: 'Home',
            name: "brian"
        }
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