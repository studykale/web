<template>
  <div class="container h-100 flex flex-column">
      <b-message class="bg-white" type="is-primary" v-if="addingProject">
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

              <b-dropdown-item value="cancelled" aria-role="listitem">
                  <div @click="projectType = 'Overdue'" class="media">
                      <b-icon class="media-left" type="is-warning" icon="history"></b-icon>
                      <div class="media-content">
                          <h3>Overdue</h3>
                          <small>Projects past deadline</small>
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
          <b-button  class="mb-1" type="is-primary" expanded icon-left="play-circle" @click="createProject">Create a new project</b-button>
          <b-button @click="() => { projectType = 'All' }"  class="mb-1" type="is-link" icon-left="list">All</b-button>
          <b-button @click="() => { projectType = 'Completed' }"  class="mb-1" type="is-link" icon-left="book">Completed</b-button>
          <b-button @click="() => { projectType = 'Cancelled' }"  class="mb-1" type="is-link" icon-left="eraser">Cancelled</b-button>
          <b-button @click="() => { projectType = 'Pending' }"  class="mb-1" type="is-link" icon-left="clock">Pending</b-button>
          <b-button @click="() => { projectType = 'Overdue' }"  type="is-link" icon-left="history">Overdue</b-button>
        </div>
        <div class="projects">
            <h2 class="title">{{ projectType || 'All Projects' }}</h2>
            <div v-if="projects.length > 0 && gettingProjects == false">
              <div v-if="projectType == 'All'">
                <div v-for="project in viableProjects" :key="project.id">
                  <ProjectCard :project="project"/>
                </div>
              </div>
              <div v-else-if="projectType == 'Completed'">
                <div v-if="completeProjects.length > 0">
                  <div v-for="project in completedProjects" :key="project.id">
                    <ProjectCard :project="project"/>
                  </div>
                </div>
                <div v-else>
                  <div class="card">
                    <div class="card-content">
                      <p>There aren't any completed projects yet.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else-if="projectType == 'Cancelled'">
                <div v-if="cancelledProjects.length > 0">
                  <div v-for="project in cancelled" :key="project.id">
                    <ProjectCard :project="project"/>
                  </div>
                </div>
                <div v-else>
                  <div class="card">
                    <div class="card-content">
                      <p>There aren't any cancelled projects yet.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else-if="projectType == 'Pending'">
                <div v-if="pendingProjects.length > 0">
                  <div v-for="project in pendingProjects" :key="project.id">
                    <ProjectCard :project="project"/>
                  </div>
                </div>
                <div v-else>
                  <div class="card">
                    <div class="card-content">
                      <p>There aren't any pending projects yet.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else-if="projectType == 'Overdue'">
                <div v-if="overdueProjects.length > 0">
                  <div v-for="project in overdueProjects" :key="project.id">
                    <ProjectCard :project="project"/>
                  </div>
                </div>
                <div v-else>
                  <div class="card">
                    <div class="card-content">
                      <p>There aren't any cancelled projects yet.</p>
                    </div>
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
      <ProjectDetails/>
  </div>
</template>

<script>

import NewProject from '@/components/Dashboard/NewProject.vue'
import { mapState, mapGetters } from "vuex"
import ProjectDetails from "@/components/Dashboard/ProjectDetails.vue";
import  ProjectCard from "@/components/ProjectCard"

export default {
  components: {
    NewProject,
    ProjectDetails,
    ProjectCard
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
      openSide: false,
    }
  },

  methods: {
    createProject() {
      //("modal")
      if(this.showNewProject) {
        this.showNewProject = false
      } else {
        this.showNewProject = true
      }
    },
  },
  computed: {
    ...mapState({
      loggedInUser: state => state.user.user,
      gettingProjects: state => state.projects.gettingAllProj,
      projects: state => state.projects.projects,
      addingProject: state => state.projects.addingProject
    }),
    ...mapGetters({
      viableProjects: 'projects/viableProjects',
      overdueProjects: 'projects/passedProjects',
      completeProjects: 'projects/completedProjects',
      pendingProjects: 'projects/pending',
      cancelledProjects: 'projects/cancelled'
    })
  },
  mounted() {
    this.$nextTick(() => {
      //("viable projects", this.viableProjects)
    })
  }
}
</script>

<style lang="scss" scoped>
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

  .head {
    display: none;
    width: 100%;
    margin: 2em 0;
      
    .float-right {
        float: right;
      }

    @media screen  and (max-width: 520px) {
      display: block;
    }
  }
</style>