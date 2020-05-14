<template>
  <div>
    
    <section class="hero is-danger">
      <div class="hero-head">
        <Navbar/>
      </div>
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Welcome
          </h1>
          <div class="buttons">
            <b-button type="is-danger" icon-left="file" size="is-small" inverted>Create a new Project</b-button>
            <b-button type="is-light" icon-left="thumbs-up" size="is-small" inverted>Completed</b-button>
          </div>
        </div>
      </div>

      <div class="hero-foot">
        <nav class="tabs is-boxed is-small">
          <div class="container">
            <ul>
              <li v-bind:class="[currentPage.includes('Projects') ? activeClass : '']">
                <router-link to="/dashboard/brian/Projects">
                 Projects
                </router-link>
              </li>
              <li v-bind:class="[currentPage.includes('Drafts') ? activeClass : '']">
                <router-link to="/dashboard/brian/Drafts">
                  Drafts
                </router-link>
              </li>
              <li v-bind:class="[currentPage.includes('Chats') ? activeClass : '']">
                <router-link to="/dashboard/brian/Chats">
                  Chats
                </router-link>
              </li>
              <li v-bind:class="[currentPage.includes('Notifications') ? activeClass : '']">
                <router-link to="/dashboard/brian/Notifications">
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
import Navbar from "@/components/Dashboard/Navbar.vue";


export default {
  components: {
    Navbar,
  },
  data() {
    return {
      activeClass: "is-active"
    }
  },
  computed: {
    currentPage() {
      return this.$route.path;
    }
  }
}
</script>

<style lang="scss">
  .my-5 {
    margin: 2em 0;
  }

  .px-2 {
    padding: 0 1em;
  }
</style>