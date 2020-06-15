<template>
  <!-- <div class="container h-100 flex flex-column">
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
  </div> -->
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
      </section>
      <b-message class="p-absolute msg-notify" title="Info" v-if="addingProject" type="is-info">
            Adding your project
      </b-message>
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
</style>