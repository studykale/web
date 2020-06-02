<template>
  <div class="container h-100 flex flex-column">
      <b-message v-if="addingProject">
        Adding your project details...
      </b-message>
      <div class="head">
        <div class="float-right">
          <b-dropdown v-model="projectChoice" aria-role="list">
              <button class="button is-primary is-outlined" type="button" slot="trigger">
                  <template>
                      <b-icon icon="bookmark"></b-icon>
                      <span>Project options</span>
                  </template>
                  <b-icon icon="menu-down"></b-icon>
              </button>
              
              <b-dropdown-item value="new" aria-role="listitem">
                  <div @click="createProject" class="media">
                      <b-icon class="media-left" type="is-primary" icon="play"></b-icon>
                      <div class="media-content">
                          <h3>New project</h3>
                          <small>Start a new project</small>
                      </div>
                  </div>
              </b-dropdown-item>

              <b-dropdown-item value="complete" aria-role="listitem">
                  <div @click="projectType = 'Completed'" class="media">
                      <b-icon class="media-left" type="is-success" icon="book"></b-icon>
                      <div class="media-content">
                          <h3>Completed</h3>
                          <small>Projects that are already done</small>
                      </div>
                  </div>
              </b-dropdown-item>

              <b-dropdown-item value="pending" aria-role="listitem">
                  <div @click="projectType = 'Pending'" class="media">
                      <b-icon class="media-left" type="is-info" icon="clock"></b-icon>
                      <div class="media-content">
                          <h3>Pending</h3>
                          <small>Projects on work currently</small>
                      </div>
                  </div>
              </b-dropdown-item>

              <b-dropdown-item value="cancelled" aria-role="listitem">
                  <div @click="projectType = 'Cancelled'" class="media">
                      <b-icon class="media-left" type="is-danger" icon="eraser"></b-icon>
                      <div class="media-content">
                          <h3>Cancelled</h3>
                          <small>Cancelled projects</small>
                      </div>
                  </div>
              </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
      <div class="grid-container">
        <div class="nav">
          <h2 class="subtitle">Projects</h2>
          <hr class="dropdown-divider"/>
          <b-button class="mb-1" type="is-primary" expanded icon-left="play-circle" @click="createProject">Create a new project</b-button>
          <b-button class="mb-1" type="is-link" icon-left="book">View completed</b-button>
          <b-button class="mb-1" type="is-link" icon-left="eraser">View cancelled projects</b-button>
          <b-button type="is-link" icon-left="clock">View drafts</b-button>
        </div>
        <div class="projects">
            <h2 class="title">{{ projectType || 'All Projects' }}</h2>
            <div v-if="projects.length > 0 && gettingProjects == false">
              <div v-for="project in projects" :key="project.id">
                <div class="card w-100">
                  <div class="card-header">
                    <h3 class="card-header-title">
                      {{ project.name }}
                    </h3>
                    <b-taglist class="mr-2" attached>
                      <b-tag type="is-info" >{{ project.status }}</b-tag>
                      <b-tag type="is-danger">{{ project.pages }} pages</b-tag>
                    </b-taglist>
                  </div>
                  <div class="card-content">
                    <p>{{ project.description || "No description" }}</p>
                  </div>
                  <div class="card-footer flex justify-between">
                   <b-button type="is-danger" @click="() => { showProjectDetails(project.id) }">View</b-button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else-if="gettingProjects">
              <div>
                <b-skeleton width="20%" animated></b-skeleton>
                <b-skeleton width="40%" animated></b-skeleton>
                <b-skeleton width="80%" animated></b-skeleton>
              </div>
              <div class="mt-2">
                <b-skeleton width="20%" animated></b-skeleton>
                <b-skeleton width="40%" animated></b-skeleton>
                <b-skeleton width="80%" animated></b-skeleton>
              </div>
            </div>
            <div class="text-center my-2" v-else>
              <h2>You don't have any projects yet.</h2>
            </div>
        </div>
      </div>
      <b-modal :active.sync="showNewProject">
        <NewProject :showNewProject="showProjectModal" :currentUser="loggedInUser"/>
      </b-modal>
      <ProjectDetails :open="openSide" :description="singleProject.description" :title="singleProject.name" :paperType="singleProject.paperType" :id="singleProject.id"/>
  </div>
</template>

<script>

import NewProject from '@/components/Dashboard/NewProject.vue'
import { mapState, mapGetters } from "vuex"
import ProjectDetails from "@/components/Dashboard/ProjectDetails.vue";

export default {
  components: {
    NewProject,
    ProjectDetails
  },
  props: {
    showProjectModal: Boolean
  },
  data() {
    return {
      projectChoice: true,
      showNewProject: this.showProjectModal,
      projectType: "All",
      singleProject: {},
      openSide: false
    }
  },
  methods: {
    
    createProject() {
      console.log("modal")
      if(this.showNewProject) {
        this.showNewProject = false
      } else {
        this.showNewProject = true
      }
    },
    showProjectDetails(id) {
      if(this.openSide) {
        this.openSide = false;
      } else {
        this.openSide = true
      }
      console.log("id", id);
      this.singleProject = this.projectById(id)
      console.log("project details", this.projectById(id));
    }
  },
  computed: {
    ...mapState({
      loggedInUser: state => state.user.user,
      gettingProjects: state => state.projects.gettingAllProj,
      projects: state => state.projects.projects,
      addingProject: state => state.projects.addingProject
    }),
    ...mapGetters({
      projectById: "projects/projectById"
    })
  }
}
</script>

<style lang="scss" scoped>
    .head {
      width: 100%;
      margin: 2em 0;
      
      .float-right {
        float: right;
      }
    }

    .grid-container {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
      gap: 1px 20px;
      grid-template-areas: "nav projects projects projects" "nav projects projects projects" "nav projects projects projects";
    
      @media screen and (max-width: 520px) {
        display: flex;
        flex-direction: column;

        .nav {
          display: none;
          pointer-events: none;
          visibility: none;
        }
      }
    }

    .nav { 
    grid-area: nav; 
    padding: 1em; 

    .is-link {
      display: block;
      outline: none;
      background: none;
      color: #111;

      &:hover {
        color: rebeccapurple;
      }
    }
    }

  .projects { 
    grid-area: projects; 
    padding: 1em;
     
     h2 {
      padding: .5em;
  
      background: #ffffff; 
     }

    .card {
      margin-top: 1.4em;

      .card-header {
        

        @media screen and (max-width: 680px) {
          display: flex;
          flex-direction: column;

          .tags {
            margin: .25em .75rem;
          }
        }
      }
    }

    .card .card-subtitle {
      padding: 1em 0;
    }
  }

  .card-footer {
    padding: 1em .5em;
  }

  .dropdown-menu {
    .dropdown-item.is-active {
      background-color: white;
      color: rgb(70, 69, 69);
    }
  }

  .card.w-100 {
    width: 100% !important; 
  }
</style>