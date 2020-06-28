<template>
    <div class="dashboard">
        <div class="sidebar">
            <div class="nav">
                <div class="nav-title">
                    <h4 class="font-bold"><span class="mr-2"><briefcase-icon size="1x" class="purple"></briefcase-icon> </span>Projects</h4>
                </div>
                <ul>
                    <li>
                        <router-link to="/admin/projects">Overview</router-link> 
                    </li>
                </ul>
            </div>
            <div class="nav">
                <div class="nav-title">
                    <h4 class="font-bold"><span class="mr-2"><send-icon size="1x" class="purple"></send-icon> </span>Chats</h4>
                </div>
                <ul>
                    <li>
                        <router-link to="/admin/chats">Clients</router-link> 
                    </li>
                    <li>
                        <router-link to="/admin/chats#contact">Contact Us</router-link> 
                    </li>
                    <li>
                        <router-link to="/admin/notifications">Notifications</router-link> 
                    </li>
                </ul>
            </div>
            <div class="nav">
                <div class="nav-title">
                    <h4 class="font-bold">Account</h4>
                </div>
                <ul>
                    <li>
                        <router-link to="/admin/payments"><span class="mr-2"><credit-card-icon size="1x" class="purple"></credit-card-icon> </span> Payment</router-link> 
                    </li>
                </ul>
            </div>
            <div class="nav">
                <div class="nav-title">
                    <router-link to="/admin/settings"><span class="mr-2"><settings-icon size="1x" class="purple"></settings-icon> </span>Settings</router-link>
                </div>
            </div>
            <div class="nav">
                <div class="nav-title">
                    <div @click="logOut" class="btn no-outline no-border"><span class="mr-2"><log-out-icon size="1x" class="purple"></log-out-icon> </span> Log Out</div>
                </div>
            </div>
        </div>
        <div class="main__content">
            <div class="layout-nav">
                <div class="flex justify-between flex-row">
                    <h3 class="font-bold">Admin</h3>
                    <div class="profile">
                        <router-link to="/admin/notifications">
                            <bell-icon size="1.5x" class="bell"></bell-icon>
                        </router-link>
                        <div class="profile__name">
                            <router-link to="/admin/profile">{{ user.username }}</router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="wrapper">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import { CreditCardIcon, BellIcon, SettingsIcon, SendIcon, BriefcaseIcon, LogOutIcon  } from 'vue-feather-icons'
import { mapState, mapActions } from 'vuex';

    export default {
        name: 'Layout',
        components: {
            BellIcon,
            SettingsIcon,
            SendIcon,
            CreditCardIcon,
            BriefcaseIcon,
            LogOutIcon
        },
        methods: {
            ...mapActions('user', ['signout']),
            logOut() {
                this.$buefy.dialog.confirm({
                    message: "Are you sure you want leave?",
                    confirmText: "Sign out",
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm : () => { this.signout() }
                })
            }
        },
        computed: {
            ...mapState({
                user: state => state.user.user
            })
        }
    }
</script>

<style lang="scss" scoped>
    .dashboard {
        background: #f1f6fb;
        max-height: 100vh;
        display: grid;
        grid-template-columns: 20% 1fr;
        grid-template-rows: 1fr;
        grid-row-gap: 0px;
    }

    .sidebar {
        background-color: rgba(255, 255, 255, 0.904);
        grid-area: 1 / 1 / 2 / 2;

        .nav {
            margin: 2em 0 0 1em;
        }

        .nav a {
            color: #454545;

            &:hover {
                color: #111;
            }
        }

        .nav ul {
            margin-left: 1em;
            margin-top: 1em;

            li {
                margin-top: 10px;
                transition: 200ms
            }
        }

        .nav li:hover {
            border-right: 4px solid rebeccapurple;
        }
    }

    .main-content {
        grid-area: 1 / 2 / 2 / 3;
        min-height: 100vh;
        overflow-y: auto;
        .wrapper {
            padding: 1.7em;
        }
    }
    

    .card {
        border-radius: 4px !important;
    }

    .layout-nav {
        background: #f2f2f2;
        width: 100%;
        padding: 1.75em .75em;
      
        box-shadow: 1px 0px 2px rgba(0, 0, 0, 0.16)
    }

    .profile {
        display: flex;
        flex-direction: row-reverse;
        .bell {
            margin-left: 2em;
            color: rgb(46, 151, 221);
        }

        &__name {
            font-weight: bold;;
        }
    }

    .no-border {
        border: none;
    }

    .no-bg {
        background: transparent;
    }

    .no-outline {
        outline: none;
    }

    .btn:hover {
        cursor: pointer;
    }
</style>