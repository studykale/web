<template>
    <b-navbar transparent :type="type">
            <slot>
                <template slot="brand">
                    <b-navbar-item tag="router-link" :to="{ path: '/' }">
                        <h2 class="logo">
                            StudyKale
                        </h2>
                    </b-navbar-item>
                    <a class="navbar-item" href="https://www.facebook.com/studykale/">
                        <facebook-icon size="1.5x" class="text-white"></facebook-icon>
                    </a>
                    <a class="navbar-item" href="https://www.instagram.com/studykale/">
                        <instagram-icon size="1.5x" class="text-white"></instagram-icon>
                    </a>
                </template>
                <template slot="start" class="start">
                    <b-navbar-item tag="router-link" to="/how-it-works">
                        How it Works
                    </b-navbar-item>
                    <b-navbar-item tag="router-link" to="/aboutus">
                        About Us
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
            </slot>
    </b-navbar>
</template>


<script>
import SignInCard from "./SignInCard"
import { FacebookIcon, InstagramIcon  } from 'vue-feather-icons'

export default {
    name: 'navbar',
    props: {
        type: String
    },
    components: {
        SignInCard,
        FacebookIcon,
        InstagramIcon
    }
}
</script>

<style lang="scss">

    .logo {
        font-weight: bold;
        color: white
    }

    .dropdown-menu {
        width: auto !important;
    }
   .navbar-item {
        @media only screen and (min-width: 1024px) {
             color: white !important;
        }
    }

    .login {
        margin: -10px 0 0 !important;
    }

    .dropdown-content {
        padding-bottom: 0 !important;
    }

    .form {
        box-shadow: 0 10px 15px 8px rgba(110, 110, 110, 0.445);
    }
</style>