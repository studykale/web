<template>
   <div class="dashboard">
      <div class="sidebar">
          <section class="top">
              <div class="wrapper">
                  <div class="links">
                      <ul>
                          <router-link to="/dashboard/projects" class="flex flex-row top-links">
                              <span><award-icon size="1.5x" class="text-white"></award-icon></span>
                              <span>Tasks</span>
                          </router-link>
                          <router-link  to="/dashboard/notifications" :class="{ 'notbell': notifications }"  class="flex flex-row top-links">
                              <span><bell-icon size="1.5x" class="text-white "></bell-icon></span>
                              <span>Notifications</span>
                          </router-link>
                          <!-- <router-link to="/dashboard/chats" class="flex flex-row top-links">
                              <span>
                                <message-circle-icon size="1.5x" class="custom-class"></message-circle-icon>
                              </span>
                              <span>Chats</span>
                          </router-link> -->
                      </ul>
                  </div>
              </div>
          </section>
          <section class="bottom">
              <div class="links">
                  <ul>
                      <router-link v-if="!loggedInUser.photoURL" to="/dashboard/profile" class="profile items-center">
                            <span>{{ userInitials }}</span>
                      </router-link>
                      <router-link to="/dashboard/profile" class="profile present" v-else>
                          <img :src="loggedInUser.photoURL" alt="User profile photo">
                      </router-link>
                      <router-link to="/dashboard/settings" class="flex flex-row">
                            <span><settings-icon size="1.5x" class="custom-class"></settings-icon></span>
                            <span>Settings</span>
                      </router-link>
                      <li @click="signout" class="flex flex-row">
                            <span><log-out-icon size="1.5x" class="custom-class"></log-out-icon></span>
                            <span>Log Out</span>
                      </li>
                  </ul>
              </div>
          </section>
      </div>
      <div class="main_view">
          <menu-icon @click="showSide" size="1.5x" class="m-1 sidebutton"></menu-icon>
          <b-sidebar
            type="is-light"
            :fullheight=true
            :fullWidth=false
            :open.sync="openSide"
          >
            <div class="p-1">
                <arrow-left-icon @click="showSide" size="1.5x" class="custom-class"></arrow-left-icon>
                <b-menu>
                  <b-menu-list label="Projects">
                    <b-menu-item @click="goto('/dashboard/projects')" icon="case" label="My projects"></b-menu-item>
                    <b-menu-item @click="goto('/dashboard/notifications')" icon="bell" label="Notifications"></b-menu-item>
                  </b-menu-list>
                  <b-menu-list label="Account">
                    <b-menu-item @click="goto('/dashboard/profile')" icon="user" label="Profile"></b-menu-item>
                    <b-menu-item @click="goto('/dashboard/settings')" icon="cog" label="Settings"></b-menu-item>
                    <b-menu-item @click="logout" icon="sign-out-alt" label="Logout"></b-menu-item>
                  </b-menu-list>
                </b-menu>
              </div>
          </b-sidebar>
          <router-view></router-view>
      </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { AwardIcon, BellIcon, SettingsIcon, LogOutIcon, MenuIcon, ArrowLeftIcon } from 'vue-feather-icons'
import { currentUser } from '../../db';

export default {
  components: {
    SettingsIcon,
    AwardIcon,
    BellIcon,
    LogOutIcon,
    MenuIcon,
    ArrowLeftIcon
  },
  metaInfo() {
    return {
  title: currentUser.displayName,
  titleTemplate: '%s - Dashboard',
      meta: [
        {
          name: "description",
          vmid: "description",
          content: this.description
        }, 
        {
          author: "Studykale",
          content: "This site was developed by studykale developers."
        },
        {
          name: "Keywords",
          content: "Study, Students, Exams, Essay service"
        }
      ]
    }
  },
  data() {
    return {
      activeClass: "is-active",
      dashUrl: `/dashboard/projects`,
      username: "brian",
      windowWidth: 0,
      notifications: false,
      openSide: false,
      // For paypal.
      payLoaded: false
    }
  },
  methods: {
    ...mapActions('projects', ['initDrafts', 'initProjects']),
    ...mapActions('user', ['signout']),
    goto(link) {
      if(link) {
        this.$router.push(link)
      }

      if(this.openSide) this.openSide = false;
    },
    createProject() {
      this.$emit('create');
    },
    showSide() {
      this.openSide = !this.openSide;
    },
    logout() {
      this.signout();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$root.$on('notCount', (arg) => {
        this.notifications = arg
      })
    })
  },
  computed: {
    ...mapState({
      loggedInUser: state => state.user.user
    }),
    currentPage() {
      return this.$route.path;
    },
    userInitials() {
      return this.loggedInUser.username.substring(0, 2).toUpperCase()
    }
  },
  created () {
    if(!this.loggedInUser || !this.loggedInUser.username) {
      this.$router.push('/')
    } else {
      this.initDrafts(this.loggedInUser.email);
    }

    this.$crisp.load()
    this.$crisp.do("chat:toggle");
    this.$crisp.push(["set", "user:email", [this.loggedInUser.email]])
    // this.$crisp.push(["set", "user:nickname", [this.loggedInUser.username]])
    this.$crisp.set("user:nickname", [this.loggedInUser.username]);
    // Introduce company by calling out whoever has just logged in.
    
    this.$crisp.push(["on", "chat:initiated", () => {
      console.log("Okay")
    }])
    
  }
}
</script>

<style lang="scss" scoped>
  .dashboard {
        display: grid;
        height: 100vh;
        grid-template-columns: 20% 1fr;
        grid-template-rows: 1fr;
        overflow: hidden;

        @media screen and (max-width: 450px) {
          grid-template-columns: 1fr;
        }
        

        .sidebar {
           background-color: #761CEA;
           padding: 1em;
           position: sticky;
           top: 0;
           left: 0;
           color: white;
           display: grid;

           @media screen and (max-width: 450px) {
             display: none;
           }
        }

        

        .sidebar .top {
            grid-row-start: 1;
            display: flex;
            flex-direction: column;
            margin-top: 20px;

            .wrapper .top-links {
                color: white;
                margin-bottom: 14px;
                font-size: .85rem;

                span:not(:last-of-type) {
                    margin-right: 1em;
                }
            }

            .wrapper .project-links {
              margin-bottom: 14px;
              margin-left: auto;
              display: flex;
              flex-direction: column;
              
            }
          }

        .sidebar .bottom {
            grid-row-start: 5;
            display: flex;
            flex-direction: column;
            margin-bottom: 20px;
            justify-content: center;

            .links {
                ul a, ul li {
                    margin-top: 14px;
                    list-style-type: none;
                    transition: ease-in 250ms;
                    font-size: .85rem;
                }

                a {
                  color: white;
                }

                a span:not(:last-of-type) {
                    margin-right: 15px;
                }

                li span:not(:last-of-type) {
                    margin-right: 15px;
                }
            }

            .profile {
                background-color: #FFC11E;
                border-radius: 50%;
                width: 35px;
                text-align: center;
                height: 35px;
                font-size: .75rem !important;
                display: flex;
                justify-content: center;

                &.present {
                  background-color: white;
                }

                img {
                  border-radius: 50%;
                  object-fit: cover;
                }
            }
        }

        .main_view {
            background: #F1F2F2;
            padding: 1.3em;
            overflow-y: scroll;

            ::-webkit-scrollbar {
                width: 12px;
            }
            
            ::-webkit-scrollbar-track {
                -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
                border-radius: 10px;
            }
            
            ::-webkit-scrollbar-thumb {
                border-radius: 10px;
                -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
            }
        }
    }

    .notbell {
      position: relative;

      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 15px;
        height: 8px;
        z-index: 2;
        width: 8px;
        border-radius: 4px;
        background-color: #FFAD32;
      }
    }

    .sidebutton {
      @media screen and (min-width: 450px){
        display: none;
      }
    }
</style>