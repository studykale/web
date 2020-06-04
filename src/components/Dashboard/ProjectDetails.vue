<template>
  <b-sidebar
      type="is-light"
      fullheight
      overlay
      right
      can-cancel
      :open.sync="openSide"
      class="sidebar"
    >
      <div class="p-1">
        <div class="mb-2">
            <p>Project title</p>
            <h4 class="font-bold">{{ project.name }}</h4>
        </div>
        <div class="dropdown-divider"></div>
        <div class="mb-2">
            <p>Project type</p>
            <h4>{{ project.paperType }}</h4>
        </div>
        <div class="mb-2">
            <p>Description</p>
            <p>{{ project.description }}</p>
        </div>
        <div class="mb-2">
            <b-field>
                <div class="control">
                    <b-taglist attached>
                        <b-tag type="is-dark">Uploaded files</b-tag>
                        <b-tag type="is-info">{{ project.files ? project.files.length : 0 }}</b-tag>
                    </b-taglist>
                </div>
            </b-field>
        </div>
        <p class="text-red mb-2">Dealine <span>{{ project.deadline | moment('from', 'now') }}</span></p>
        
        <div class="flex flex-wrap items-center">
            <Payment :projectId="project.id"/>
            <b-button @click="cancel" type="is-warning">Cancel project</b-button>
        </div>
      </div>    
    </b-sidebar>
</template>

<script>
import { mapGetters } from "vuex"
import Payment from "./Payment"
export default {
    components:{
        Payment
    },
    data() {
        return {
            openSide: false,
            project: {},
            projectId: '',
            canCancel: ['X', 'escape']
        }
    },
    methods: {
        showId() {
            console.log("id", this.project.id)
        },
        dateFm(s) {
            return new Date(s * 1000);
        },
        cancel() {
            console.log("cancel");
        }
    },
    computed: {
        ...mapGetters({
            projectById: "projects/projectById"
        }),
    },
    mounted() {
       this.$nextTick(() => {
          this.$root.$on('projDetailOpen', (arg1) => {
            this.openSide = arg1.show
            this.projectId = arg1.id
            this.project = this.projectById(arg1.id)
        }) 
       }) 
    }
}
</script>

<style lang="scss" scoped>
    .sidebar {
        .sidebar-content {
            width: 40%;
        }
    }
</style>