<template>
  <div>
      <div>
      <div class="project-cards flex justify-between wrap">
          <div class="start stats">
              <p class="font-bold">Get started</p>
              <button class="button" @click="createProject">Create task</button>
          </div>
          <div class="start notify">
              <p class="font-bold">Notifications</p>
              <router-link to="/dashboard/notifications" class="button">View notifications</router-link>
          </div>
          
      </div>
      <section class="projects-list">
            <div class="mb-2" v-if="drafts.length > 0">
              <h2 class="title font-bold">All drafts</h2>
              <p class="mb-2">All your drafted projects appear here.</p>
              <div class="d-inline" v-for="(draft, i) in drafts" :key="i">
                <DraftCard @makeProjFromDraft="draftToProject" :paperType="draft.paperType" :pages="draft.pages" :deadline="draft.deadline" :draftId="draft.id"/>
              </div>
            </div>
            <div v-if="proj.length > 0">
              <h2 class="title font-bold mb-2">All</h2>
              <p class="mb-2">All your projects appear here.</p>
              <div class="p-wrapper" v-for="(project, i) in proj" :key="i">
                <ProjectCard @click="showProjectDetail(project)" :project="project" />
              </div>
              <div id="completed" class="mt-2">
                  <h2 class="title">Completed Projects</h2>
                  <p>Your completed projects appear here</p>
                  <div class="p-wrapper" v-if="cProjects.length > 0">
                    <div v-for="(project, i) in cProjects" :key="i">
                      <ProjectCard @click="showProjectDetail(project)" :project="project"/>
                    </div>
                  </div>
                  <div class="flex justify-center items-center p-4" v-else>
                    <p class="text-center font-bold">It seems you don't have any completed projects. You can still create one</p>
                  </div>
              </div>

              <div id="pending" class="mt-2">
                  <h2 class="title">Pending Projects</h2>
                  <p>Your pending projects appear here.</p>
                  <div class="mt-2" v-if="pProjects.length > 0">
                    <div class="p-wrapper" v-for="(project, i) in pProjects" :key="i">
                      <ProjectCard @click="showProjectDetail(project)" :project="project"/>
                    </div>
                  </div>
                  <div class="flex justify-center items-center p-2" v-else>
                    <p class="font-bold text-center p-4">It seems you don't have any pending projects. You can still create one</p>
                  </div>
              </div>

              <div id="paid" class="mt-2">
                  <h2 class="title">Paid Projects</h2>
                  <p>Your projects that are on course appear here as per the deadlines set</p>
                  <div class="mt-2" v-if="paidP.length > 0">
                    <div class="p-wrapper" v-for="(project, i) in paidP" :key="i">
                      <ProjectCard @click="showProjectDetail(project)" :project="project"/>
                    </div>
                  </div>
                  <div class="flex justify-center items-center p-2" v-else>
                    <p class="font-bold text-center p-4">It seems you don't have any paid projects. If you have pending projects click any to continue with payment.</p>
                  </div>
              </div>
          
            </div>
            <div class="text-center my-2 no-projects" v-else>
              <div class="flex justify-center items-center flex-column">
                <img src="../../../assets/illustrations/growgrades.svg" alt="Create task">
                <b-button type="is-warning" size="is-medium" @click="createProject">Create first task</b-button>
              </div>
            </div>
      </section>
      <div v-if="reviewAllowed" class="p-absolute review">
        <ReviewCard @closeReview="closeReview"/>
      </div>
    </div>
        <b-modal :active.sync="showNewProject">
          <NewProject  :draft="selectedDraft" :showNewProject="showProjectModal" :currentUser="loggedInUser"/>
        </b-modal>
        <ProjectDetails @showReviewBox="addReview" :projects="proj"/>
    </div>
</template>
<script> 

import NewProject from '@/components/Dashboard/NewProject.vue'
import { mapState, mapGetters } from "vuex"
import ProjectDetails from "@/components/Dashboard/ProjectDetails.vue";
import  ProjectCard from "@/components/ProjectCard"
import ReviewCard from "@/components/Review";
import { projectsCollection, draftsCollection } from "../../../db";
import DraftCard from "../../../components/DraftCard";

export default {
  components: {
    NewProject,
    ProjectDetails,
    ProjectCard,
    DraftCard,
    ReviewCard
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
      drafts: [],
      openSide: false,
      reviewAllowed: false,
      selectedDraft: null
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
    addReview(option) {
      this.reviewAllowed = option
    },
    closeReview(payload) {
      console.log("payload", payload)
      this.reviewAllowed = payload.open;
    },
    draftToProject(id) {
      if(id) {
        this.selectedDraft = this.drafts.find(dr => dr.id == id)
      }
      if(this.showNewProject) {
        this.showNewProject = false
      } else {
        this.showNewProject = true
      }
    }
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
    },
    
  },
  created() {
    this.$bind('proj', projectsCollection.where('creator', '==', this.loggedInUser.userId))
    
    this.$bind('drafts', draftsCollection.where('email', '==', this.loggedInUser.email)).then(dr => {
      // let date = new Date(null);
      let today = new Date()
      
      for (let i = 0; i < dr.length; i++) {
        let d = dr[i]
        // let dline = date.setSeconds(d.deadline.seconds)
        
        // let dlineDate = new Date(dline)
        let time =  new Date(d.deadline.toDate()) - today
        if(time <= 0) {
          draftsCollection.doc(d.id).delete()
        }
      }    
    })
    
    // setTimeout(this.newReview, 20000),
    // this.$root.$on('closeReview', (arg) => {
    //   this.reviewAllowed = !arg
    // })
  }
}
</script>

<style lang="scss" scoped>
  .p-wrapper {
    display: inline-block;

  }

  .wrap {
    @media screen and (max-width: 450px) {
      flex-direction: column;
    }
    
    .start {
      width: 100% !important;
      margin-bottom: 1em;
    }
  }

  .p-4 {
    padding: 8em;
  }
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

    .p-absolute.review {
      box-shadow: 0 10px 15px 6px #c1c1c1;
      position: absolute;
      top: 20px;
      right: 20px;
    }
</style>