<template>
  <b-navbar class="container" type="is-primary" transparent>
        <template slot="brand">
            <div class="avatar">
                <img src="../../assets/images/brown.jpg" alt="user avatar">
            </div>
            <b-navbar-item tag="router-link" :to="{ path: '/dashboard/brian' }">
               {{ name }}
            </b-navbar-item>
        </template>

        <template slot="start">
            <b-navbar-item href="#">
                Settings
            </b-navbar-item>
            <b-navbar-item>
                Profile
            </b-navbar-item>
            <b-navbar-item @click="signout">
                Log out
            </b-navbar-item>
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
        ...mapActions('user', ['signput']),
        addNewProject() {
            console.log("added new project")
        }
    }
}
</script>

<style lang="scss" scoped>
    .avatar {
        margin: 8px 0 8px 20px;
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