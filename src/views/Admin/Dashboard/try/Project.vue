<template>
  <div class="projects">
    <div class="mt-2">
      <div class="card border-top-blue">
        <div class="card-content">
          <h5 class="subtitle">Projects</h5>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A expedita quasi veritatis, doloremque libero corrupti ipsam recusandae fugit quo laudantium?</p>
          <b-button type="is-info" size="is-small" @click="showProject">Details</b-button>
        </div>
      </div>
      <div class="card mt-2">
        <div class="card-content">
          <b-table 
            :data="data" 
            :columns="columns" 
            :per-page="perPage"
            paginated
            pagination-position="bottom"
            current-page.sync="currentPage"
            hoverable
            :mobile-cards="true"
            :selected.sync="selected"
          >
          </b-table>
        </div>
      </div>
    </div>

    <div v-if="selected && showProjectModal" class="select-project">
      <div class="card">
        <div class="card-header flex flex-column">
          <p class="card-header-title">{{ selected.name }}</p>
          <p class="card-header-subtitle">{{ selected.type }}</p>
        </div>
        <div class="card-content">
          <p>{{ selected.description }}</p>
        </div>
        <div class="card-footer flex flex-column p-2">
          <b-field>
              <b-radio-button v-model="selected.status"
                  native-value="OnProgress"
                  type="is-info">
                  <coffee-icon size="1x" class="icon-blue"></coffee-icon>
                  <span>Started</span>
              </b-radio-button>

              <b-radio-button v-model="selected.status"
                  native-value="Completed"
                  type="is-success">
                  <check-icon size="1x" class="custom-class"></check-icon>
                  <span>Completed</span>
              </b-radio-button>

              <b-radio-button v-model="selected.status"
                  native-value="Cancelled"
                  type="is-danger">
                  <x-square-icon size="1.5x" class="custom-class"></x-square-icon>
                  <span>Cancel</span>
              </b-radio-button>
          </b-field>
          <b-button size="is-small" type="is-danger" @click="showProject">Close</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CoffeeIcon, CheckIcon, XSquareIcon } from 'vue-feather-icons'

export default {
  components: {
    CoffeeIcon,
    CheckIcon,
    XSquareIcon
  },
  data() {
    const data = [
                { 'id': 1, 'name': 'African Politics', 'type': 'Research Paper', 'deadline': '2016-10-15 13:43:27', 'status': 'Pending', 'description': 'This is my simple project description about the project you should prpbably view it before starting out. It help in knowing what to do and where to do it.'},
                { 'id': 2, 'name': 'History and Economics', 'type': 'Assessment', 'deadline': '2016-12-15 06:00:53', 'status': 'OnProgress', 'description': 'This is my simple project description about the project you should prpbably view it before starting out. It help in knowing what to do and where to do it.' },
                { 'id': 3, 'name': 'British Ecosystem', 'type': 'CV', 'deadline': '2016-04-26 06:26:28', 'status': 'OnProgress', 'description': 'This is my simple project description about the project you should prpbably view it before starting out. It help in knowing what to do and where to do it.'},
                { 'id': 4, 'name': 'MyCV', 'type': 'CV', 'deadline': '2016-04-10 10:28:46', 'status': 'OnProgress',  'description': 'This is my simple project description about the project you should prpbably view it before starting out. It help in knowing what to do and where to do it.'},
                { 'id': 5, 'name': 'Research and Festivities', 'type': 'Assessment', 'deadline': '2016-12-06 14:38:38', 'status': 'Completed', 'description': 'This is my simple project description about the project you should prpbably view it before starting out. It help in knowing what to do and where to do it.' }
            ]

    return {
        data,
        selected: data[1],
        showProjectModal: true,
        currentPage: 1,
        perPage: 3,
        checkboxCustom: 'Yes',
        columns: [
            {
                field: 'id',
                label: 'ID',
                width: '40',
                numeric: true,
                visible: false
            },
            {
                field: 'name',
                label: 'Name',
                searchable: true
            },
            {
                field: 'type',
                label: 'Paper Type',
            },
            {
                field: 'deadline',
                label: 'Deadline',
                centered: true
            },
            {
                field: 'status',
                label: 'Status',
                searchable: true
            }
        ]
    }
  },
  methods: {
    showProject() {
      if(this.showProjectModal) {
        this.showProjectModal = false;
      } else {
        this.showProjectModal = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.projects {
    margin: 2em;

    position: relative;

    .select-project {
      position: absolute;
      top: -15px;
      right: 0;
      box-shadow: 0 10px 15px 4px rgba(0, 0, 0, 0.25);
      z-index: 999;
      max-width: 350px; 
      .card {
        width: 100% !important; 

        .card-header p:nth-child(2) {
          padding: .2em .8em;
        }


        .p-2 {
          padding: 1em;
        }
      }
    }

    &.mt-2 {
      margin-top: 4em;
    }

    .card {
      border-radius: 4px;
      width: 80% !important;
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
</style>