<template>
  <div class="bg-light h-100">
    <section class="hero is-small is-primary">
      <div class="hero-head">
        <Navbar :username="loggedInUser.username" :photoURL="loggedInUser.photoURL"/>
      </div>
    
      <div class="hero-foot">
        <nav class="tabs is-boxed is-small">
          <div class="container">
            <ul>
              <li v-bind:class="[currentPage.includes('projects') ? activeClass : '']">
                <router-link to="/dashboard/projects">
                 Projects
                </router-link>
              </li>
              <li v-bind:class="[currentPage.includes('drafts') ? activeClass : '']">
                <router-link to="/dashboard/drafts">
                  Drafts
                </router-link>
              </li>
              <li v-bind:class="[currentPage.includes('chats') ? activeClass : '']">
                <router-link to="/dashboard/chats">
                  Chats
                </router-link>
              </li>
              <li class="banner" v-bind:class="[currentPage.includes('notifications') ? activeClass : '']">
                <router-link to="/dashboard/notifications">
                 Notifications
                </router-link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </section>
    <div class="container">
      <div class="my-5 px-2">
          <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>

import Navbar from "@/components/Dashboard/DashNav.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    Navbar
  },
  data() {
    return {
      activeClass: "is-active",
      dashUrl: `/dashboard/projects`,
      username: "brian",
      windowWidth: 0
    }
  },
  methods: {
    ...mapActions('projects', ['initDrafts', 'initProjects']),
    ...mapActions('user', ['signout']),
  },
  computed: {
    ...mapState({
      loggedInUser: state => state.user.user
    }),
    currentPage() {
      return this.$route.path;
    }
  },
  created () {
    if(!this.loggedInUser || !this.loggedInUser.username) {
      this.$router.push('/')
    } else {
      this.initDrafts(this.loggedInUser.email);
    }
  }
}
</script>

<style lang="scss" scoped>
  .my-5 {
    margin: 2em 0;
  }

  .px-2 {
    padding: 0 1em;
  }

  .banner {
    position: relative;

    &::before {
      position: absolute;
      content: "";
      height: 5px;
      width: 5px;
      background-color: red;
      border-radius: 2.5px;
      top: 4px;
      right: 5px;
    }
  }
</style>