<template>
  <div>
      <div>
      <div class="project-cards flex justify-between">
          <div class="start stats">
              <p class="font-bold">Get started</p>
              <button class="button" @click="createProject">Create task</button>
          </div>
          <div class="start notify">
              <p class="font-bold">Notifications</p>
              <router-link to="/dashboard/notifications" class="button">View notifications</router-link>
          </div>
          <div class="start respond">
              <p class="font-bold">Chats</p>
              <router-link to="/dashboard/chats" class="button">Chats</router-link>
          </div>
      </div>
      <section class="projects-list">
            
            <div v-if="proj.length > 0">
              <div v-for="(project, i) in proj" :key="i">
                <ProjectCard @click="showProjectDetail(project)" :project="project" />
              </div>
            </div>
            <div class="text-center my-2 no-projects" v-else>
              <div class="flex justify-center items-center">
                <img src="../../../assets/illustrations/grow_grades.svg" alt="Create task">
                <b-button type="is-warning" size="is-medium" @click="createProject">Create first task</b-button>
              </div>
            </div>
      </section>
      <b-message class="p-absolute msg-notify" title="Processing" :active.sync="addingProject" aria-close-label="Close message">
            Hey just setting things up...
      </b-message>
    </div>
        <b-modal :active.sync="showNewProject">
          <NewProject :showNewProject="showProjectModal" :currentUser="loggedInUser"/>
        </b-modal>
        <ProjectDetails :projects="proj"/>
    </div>
</template>
<script>

import NewProject from '@/components/Dashboard/NewProject.vue'
import { mapState, mapGetters } from "vuex"
import ProjectDetails from "@/components/Dashboard/ProjectDetails.vue";
import  ProjectCard from "@/components/ProjectCard"
import { projectsCollection } from "../../../db";

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
      proj: [],
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
  firestore: {
    proj: projectsCollection
  },
  computed: {
    ...mapState({
      loggedInUser: state => state.user.user,
      gettingProjects: state => state.projects.gettingAllProj,
      projects: state => state.projects.projects,
      addingProject: state => state.projects.creatingProject
    }),
    ...mapGetters({
      viableProjects: 'projects/viableProjects',
      overdueProjects: 'projects/passedProjects',
      completeProjects: 'projects/completedProjects',
      pendingProjects: 'projects/pending',
      cancelledProjects: 'projects/cancelled'
    }),
    pProjects() {
      return this.proj.filter(p => p.status == 'pending')
    },
    cProjects() {
      return this.proj.filter(p => p.status == "completed")
    },
    paidP() {
      return this.proj.filter(p => p.paid == true)
    }
  },
  created() {
    this.$bind('proj', projectsCollection.where('creator', '==', this.loggedInUser.userId))
    .then(docs => {
      this.$buefy.snackbar.open({
        type: 'is-info',
        message: "You have "+docs.length+ " projects"
      })
    })
  }
}
</script>

<style lang="scss" scoped>
    .project-cards {

        .start {
            padding: 1em;
            
            border-radius: 5px;
            background-color: white;
        }


        .start {
            background: white;
            padding: .75em;
            height: 100px;
            width: 33%;

            .button {
                margin-top: 1em;
                border: solid 1.2px gray;

                padding: .55em .75em;
                border-radius: 4px;
                color: gray;
                font-size: .75rem;
            }

            

            &.stats {
                position: relative;
                margin-right: 14px;
                &::before {
                content: "";
                position: absolute;
                right: 0; 
                opacity: .9;
                top: 0;
                height: 100px;
                width: 100px;
                background: url('../../../assets/illustrations/data.svg') no-repeat center;
                }
            }

            &.notify {
                position: relative;
                margin-right: 14px;


                &::before {
                content: "";
                position: absolute;
                right: 0; 
                opacity: .9;
                top: 0;
                height: 100px;
                width: 100px;
                background: url('../../../assets/illustrations/team.svg') no-repeat center;
                }
            }

            &.respond {
                position: relative;

                &::before {
                content: "";
                position: absolute;
                right: 0; 
                opacity: .9;
                top: 0;
                height: 100px;
                width: 100px;
                background: url('../../../assets/illustrations/chat.svg') no-repeat center;
                }
            }
        }
    }

    .projects-list {
        margin-top: 1.25em;
        display: grid;
        grid-template-rows: 1fr;   

        .button {
            padding: .25em .65em;
            background: #FFC11E;
            border-radius: 2px;
            border: none;
            color: white;
            align-items: center;
            display: flex;
        }   

        .button .mr-1 {
            
            margin: auto 8px auto 0;
        }

        .mt-2 {
            margin-top: 2em;
        }
    }

    .dropdown {
        position: relative;
    }

    .proj {
        &:nth-child(n + 2) {
            margin-right: 14px;
        }
    }

    .p-absolute.msg-notify {
      width: 50%;
      position: absolute;
      bottom: 100px;
      right: 20px;
    }

    .no-projects {
      img {
        height: 350px;
        width: 350px;
        object-fit: cover;
      }

      button {
        margin-top: 3em;
      }
    }
</style>