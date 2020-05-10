<template>
    <b-navbar transparent>
      
            <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <h2 class="logo">
                    StudyWorks
                </h2>
            </b-navbar-item>
            </template>
            <template slot="start">
                <b-navbar-item href="#">
                    Pricing
                </b-navbar-item>
                <b-navbar-item href="#">
                    How it works
                </b-navbar-item>
                
            </template>

            <template slot="end">
                <b-navbar-item tag="div">
                    <div class="buttons">
                        <b-button type="is-primary" rounded inverted outlined>Sign Up</b-button>
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
                                class="login__modal">
                                <form action="">
                                    <div class="modal-card" style="width:300px;">
                                        <section class="modal-card-body">
                                            <b-field label="Email">
                                                <b-input
                                                    type="email"
                                                    placeholder="Your email"
                                                    required>
                                                </b-input>
                                            </b-field>

                                            <b-field label="Password">
                                                <b-input
                                                    type="password"
                                                    password-reveal
                                                    placeholder="Your password"
                                                    required>
                                                </b-input>
                                            </b-field>

                                            <b-checkbox>Remember me</b-checkbox>
                                        </section>
                                        <footer class="modal-card-foot">
                                            <button class="button is-primary">Login</button>
                                        </footer>
                                    </div>
                                </form>
                            </b-dropdown-item>
                        </b-dropdown>
                    </div>
                </b-navbar-item>
            </template>
        
    </b-navbar>

</template>


<script>
export default {

}
</script>

<style lang="scss">

    .logo {
        font-weight: bold;
        color: white
    }

    .navbar-item {
        color: white !important;
    }

    .login {
        margin: -10px 0 0 !important;
    }

    .dropdown-content {
        padding-bottom: 0 !important;
    }
</style>