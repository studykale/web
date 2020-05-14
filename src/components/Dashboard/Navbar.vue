<template>
  <b-navbar class="container" type="is-primary" transparent>
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/dashboard/brian' }">
               Brian
            </b-navbar-item>
        </template>

        <template slot="start">
            <b-navbar-item href="#">
                Settings
            </b-navbar-item>
            <b-navbar-item href="#">
                Profile
            </b-navbar-item>
        </template>
            
        <template slot="end">
            <b-navbar-item tag="div">
                <b-button type="is-danger" icon-left="plus" rounded inverted>Add New Project</b-button>
            </b-navbar-item>
            
        </template>
    </b-navbar>
</template>

<script>
export default {
    name: 'Navbar',
    data() {
        return {
            navigation: 'Home'
        }
    }
}
</script>

<style>

</style>