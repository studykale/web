<template>
  <div class="projects">
    <div class="mt-2">
      <h2 class="head">Projects</h2>
      <div class="flex flex-row justify-around">
        <div class="statistics">
          <h3 class="font-bold">
            {{ proj.length }}
          </h3>
          <p>Projects submitted so far</p>
        </div>
        <div class="statistics">
          <h3 class="font-bold">
            {{ users.length }}
          </h3>
          <p>Users signed up</p>
        </div>
        <div class="statistics">
          <h3 class="font-bold">
            {{ complete.length }}
          </h3>
          <p>Projects completed</p>
        </div>
        <div class="statistics">
          <h3 class="font-bold">
            {{ incomplete.length }}
          </h3>
          <p>Incomplete projects.</p>
        </div>
      </div>
      
      <div class="my-2">
          <b-button type="is-info" @click="showProject">Details</b-button>
      </div>

      <div class="card mt-2">
        <div class="card__header">
        </div>
        <div class="card-content">
          <b-table 
            :data="proj" 
            :per-page="perPage"
            paginated
            pagination-position="bottom"
            current-page.sync="currentPage"
            hoverable
            :mobile-cards="true"
            :selected.sync="selected"
          >
            <template slot-scope="props">
              <b-table-column field="id" label="ID">
                    {{ props.row.id }}
                </b-table-column>
                <b-table-column field="name" label="Name">
                    {{ props.row.name }}
                </b-table-column>
                <b-table-column field="status" label="Status">
                    {{ props.row.status }}
                </b-table-column>
                <b-table-column field="pages" label="Pages">
                    {{ props.row.pages }}
                </b-table-column>
                <b-table-column field="status" label="Deadline">
                    {{ props.row.deadline.seconds ? formatDate(props.row.deadline.seconds) : 'today' }}
                </b-table-column>
            </template>
          </b-table>
        </div>
      </div>
    </div>

    <div v-if="selected && showProjectModal" class="select-project">
      <div class="card">
        <div class="card-header flex flex-column justify-between">
          <div class="flex flex-column">
            <p class="card-header-title">{{ selected.name }}</p>
            <p class="card-header-subtitle">{{ selected.paperType }} <span v-if="!selected.paid">
                <b-tag type="is-info">Not paid</b-tag>
              </span> </p>
          </div>
          <check-circle-icon v-if="selected.status == 'paid'" size="1.5x" class="text-green paid-icon"></check-circle-icon>
        </div>
        <div class="card-content p-small">
          <p>{{ selected.description }}</p>
          <div v-if="selected.files.length > 0" class="mt-2 flex flex-row">
            <div v-for="(file, i) in selected.files" :key="i">
              <a :href="file" target="_blank">
                <b-tag type="is-primary">{{ i + 1 }} file</b-tag>
              </a>
            </div>
          </div>
          <b-field class="mt-2">
              <b-radio-button v-model="projectStatus"
                  native-value="OnProgress"
                  type="is-info">
                  <coffee-icon size="1x" class="icon-blue"></coffee-icon>
                  <span>Started</span>
              </b-radio-button>

              <b-radio-button v-model="projectStatus"
                  native-value="Completed"
                  type="is-success">
                  <check-icon size="1x" class="custom-class"></check-icon>
                  <span>Completed</span>
              </b-radio-button>

              <b-radio-button v-model="projectStatus"
                  native-value="Cancelled"
                  type="is-danger">
                  <x-square-icon size="1.5x" class="custom-class"></x-square-icon>
                  <span>Cancel</span>
              </b-radio-button>
          </b-field>
        </div>
        <div class="card-footer flex flex-column p-2">
          <div class="owner">
            <div class="profile-info flex flex-column">
              <small class="font-bold">{{ projectOwner.username }}</small>
              <small>{{ projectOwner.email }}</small>
            </div>
          </div>
          <div class="dropdown-divider"></div>
          <b-button @click="uploadComplete" type="is-success" class="mb-2">Upload completed files</b-button>
          <b-button type="is-danger" @click="showProject">Close</b-button>
        </div>
      </div>
    </div>
    <b-modal :active.sync="showModalUpload" :width="640" scroll="keep">
      <UploadDocs />
    </b-modal>
  </div>
</template>

<script>
import { CoffeeIcon, CheckIcon, XSquareIcon, CheckCircleIcon } from 'vue-feather-icons'
import { mapState } from 'vuex';
import db, { users } from "../../../../db";
import UploadDocs from "@/components/Admin/UploadComplete";

export default {
  components: {
    CoffeeIcon,
    CheckIcon,
    CheckCircleIcon,
    XSquareIcon,
    UploadDocs
  },
  data() {
    return {
        proj: [],
        users: [],
        showProjectModal: true,
        showModalUpload: false,
        currentPage: 1,
        perPage: 3,
        checkboxCustom: 'Yes',
        selected: []
    }
  },
  firestore: {
    proj: db.collection('projects')
  },
  methods: {
    showProject() {
      if(this.showProjectModal) {
        this.showProjectModal = false;
      } else {
        this.showProjectModal = true
      }
    },
    showUploadModal() {
      this.showModalUpload = !this.showModalUpload
    },
    formatDate(s) {
      let date = new Date(null);
      date.setSeconds(s)

      return date.toDateString()
    },
    uploadComplete() {
      this.showModalUpload = !this.showModalUpload;
    }
  },
  computed: {
    ...mapState({
      gettingProjects: state => state.admin.status.gettingProjects,
      projects: state => state.admin.Projects
    }),
    projectStatus() {
      return this.selected.status
    },
    incomplete() {
     return this.proj.filter(p => p.status == "pending")
    },
    complete() {
      return this.proj.filter(p => p.status == "completed")
    },
    projectOwner() {
      return this.users.find(u => u.id === this.selected.creator)
    }
  },
  created() {
    this.selected = this.proj[0]
    this.$bind('users', users.where('role', '==', 'CLIENT'))
  }
}
</script>

<style lang="scss" scoped>
.projects {
    margin: 2em;

    position: relative;

    .head {
      margin-bottom: 1em;
      font-size: x-large;
      font-weight: bold;
    }

    .select-project {
      position: absolute;
      top: -15px;
      right: 0;
      box-shadow: 0 10px 15px 4px rgba(0, 0, 0, 0.25);
      z-index: 999;
      max-width: 350px; 
      .card {
        width: 100% !important; 
        border-radius: 4px;

        .card-header {
          position: relative;
        }

        .paid-button {
          position: absolute;
          top: .75em;
          right: .75em;
        }

        .card-header-title {
          padding: 0.75rem 0.75em 0 0.75em;
        }

        .card-header p:nth-child(2) {
          padding: .2em .75em .75em;
        }


        .p-2 {
          padding: 1em;
        }

        .card-content.p-small {
          padding: .85em !important;
        }
      }
    }

    .my-2 {
      margin: 2em 0;
    }

    &.mt-2 {
      margin-top: 4em;
    }

    .card {
      border-radius: 4px;
      width: auto !important;
    }

    .card.border-top-red {
      border-top: 2px solid #EE3D48;
    }

    .card.border-top-blue {
      border-top: 2px solid #5199FF;
    }

    .card.border-top-green {
      border-top: 2px solid #00CF91;
    }
  }

  .statistics {
    padding: .75em;
    border-radius: 4px;
    display: inline-block;
    width: 15em;
    background: #111;
    color: white;
    
    h3 {
      color: #6943d0;
      font-size: 2em;
    }
  }
</style>