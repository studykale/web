<template>
    <div class="main">
        <navbar type="is-dark">
            <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <h2 class="logo">
                    StudyWorks
                </h2>
            </b-navbar-item>
            </template>
            <template slot="start" class="start">
                <b-navbar-item tag="router-link" to="/how-it-works">
                    How it Works
                </b-navbar-item>
                <b-navbar-item tag="router-link" to="/aboutus">
                    About Us
                </b-navbar-item>
                <b-navbar-item tag="router-link" to="/reviews">
                    Reviews
                </b-navbar-item>
                <b-navbar-item tag="router-link" to="/blog">
                    Blog
                </b-navbar-item>
            </template>
            <template slot="end">
                <b-navbar-item tag="div">
                    <div class="buttons">
                        <b-button type="is-primary" tag="router-link" to="/auth/signup" rounded outlined>Sign Up</b-button>
                        <b-dropdown position="is-bottom-left" append-to-body aria-role="menu" trap-focus class="login">
                            <a
                                class="navbar-item"
                                slot="trigger"
                                role="button">
                                <span>Login</span>
                                <b-icon icon="menu-down"></b-icon>
                            </a>

                            <b-dropdown-item
                                aria-role="menu-item"
                                :focusable="false"
                                custom
                                paddingless
                                class="login__modal drop">
                                <SignInCard :shadow="true"/>
                            </b-dropdown-item>
                        </b-dropdown>
                    </div>
                </b-navbar-item>
            </template>
        </navbar>
            <div class="wrapper">
                <slot></slot>
            </div>
        <Footer/>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SignInCard from "@/components/SignInCard";

export default {
    name: 'Layout',
    components: {
        'navbar': Navbar,
        Footer,
        SignInCard
    }
}
</script>

<style lang="scss" scoped>
    .wrapper {
        padding: 2em 1em;
        min-height: calc(100vh - (15vh + 8vh));
    }
</style>