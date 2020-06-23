<template>
<div>
    <b-sidebar
      fullheight
      overlay
      right
      mobile="fullwidth"
      :open.sync="openSide"
      class="sidebar"
    >
      <div class="p-1 p-relative">
          
        <div class="mb-2">
            <p>Project title</p>
            <h4 class="font-bold">{{ project.name }}</h4>
        </div>
        <div class="dropdown-divider"></div>
        <div class="mb-2">
            <p class="text-sm">Project type</p>
            <h4>{{ project.paperType }}</h4>
        </div>
        <div class="mb-2">
            <p class="text-sm">Description</p>
            <p>{{ project.description }}</p>
        </div>
        <div class="mb-2">
            <b-field grouped group-multiline>
                <div class="control">
                    <b-taglist attached>
                        <b-tag type="is-dark">Uploaded files</b-tag>
                        <b-tag type="is-info">{{ project.files ? project.files.length : 0 }}</b-tag>
                    </b-taglist>
                </div>
                <div class="control">
                    <b-taglist attached>
                        <b-tag type="is-dark">Pricing</b-tag>
                        <b-tag type="is-info">{{ project.price ? project.price : calcPrice(project) }}</b-tag>
                    </b-taglist>
                </div>
                <div class="control">
                    <b-taglist attached>
                        <b-tag type="is-dark">Status</b-tag>
                        <b-tag type="is-info">{{ project.status }}</b-tag>
                    </b-taglist>
                </div>
            </b-field>
        </div>
        <p class="mb-2">Completion <span class="text-red">{{ dateFm(project.deadline) }}</span></p>
        
        <div v-if="!project.paid" class="flex flex-wrap items-center">
            <Payment :projectId="projectId" :paymentAmount="project.price ? project.price : calcPrice(project)"/>
            <b-button @click="isProjectUpdateActive = !isProjectUpdateActive" type="is-warning">Update</b-button>
        </div>
        <div v-else>
            <div class="flex flex-row my-2"><span class="mr-1">Paid</span> <check-circle-icon size="1.5x" class="text-blue"></check-circle-icon></div>
            <b-button type="is-info" @click="showId" expanded>Update</b-button>
        </div>
        <x-circle-icon @click="closeSide" size="1x"  class="p-absolute icon"></x-circle-icon>
      </div>    
    </b-sidebar>
    <b-modal :active.sync="isProjectUpdateActive" :width="640" scroll="keep">
        <UpdateCard :closeModal="isProjectUpdateActive" :name="project.name" :description="project.description" :deadline="toDate(dateFm(project.deadline.seconds))"/>
    </b-modal>
</div>
  

</template>

<script>
import { mapGetters } from "vuex"
import Payment from "./Payment";
import { XCircleIcon, CheckCircleIcon } from 'vue-feather-icons'
import UpdateCard from "../UpdateProject";
export default {
    props: {
        projects: Array
    },
    template: {},
    components:{
        Payment,
        XCircleIcon,
        CheckCircleIcon,
        UpdateCard
    },
    data() {
        return {
            openSide: false,
            project: {},
            projectId: '',
            isProjectUpdateActive: false,
        }
    },
    methods: {
        updateSingleProject() {
            // //("id", this.projectId)
            this.isProjectUpdateActive = !this.isProjectUpdateActive;

        },
        dateFm(s) {
            if(new Date(s) && (typeof s !== Object) && s != null) {
                
                let t = new Date(null)
                t.setSeconds(s.seconds)
                return t.toDateString();
            } else if(s.seconds) {
                //("s", s.seconds)
                return new Date(s.seconds * 1000)
            }
        },
        toDate(d) {
            return new Date(d)
        },
        calcPrice(project) {
            
            let now = this.$moment(this.dateFm(project.createdAt));
            let end = this.$moment(this.dateFm(project.deadline));
            var duration = this.$moment.duration(now.diff(end));
            var days = Math.abs(duration.asHours());
            // //("days", days)
            if(days <= 24 ) {
                let p = parseInt(project.pages * 10 + project.pages * 3.2)
                // //("p", p);
                return p;
            } else {
                let r = parseInt(project.pages * 10);
                return r;
            }
        },
        closeSide() {
            if(this.openSide) {
                this.openSide = false
            } else {
                return
            }
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
            this.openSide = arg1.show;
            this.projectId = arg1.id;
            this.project = this.projects.find(p => p.name == arg1.id);
        }) 
       }) 
    }
}
</script>

<style lang="scss" scoped>
    .b-sidebar {
        
    
        .text-sm {
            color: gray;
            font-size: small;
        }
    }

    .payBtn div:first-of-type {
        width: 100% !important;
    }

    .p-absolute {
        position: absolute;


        &.icon {
            top: 10px;
            right: 15px;
        }
    }

    .text-blue {
        color: rgb(47, 151, 47);
    }

    .mr-1 {
        margin-right: 15px;
    }
</style>