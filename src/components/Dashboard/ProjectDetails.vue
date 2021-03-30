<template>
  <div>
    <b-sidebar
      fullheight
      overlay
      right
      mobile="fullwidth"
      :open.sync="openSide"
      class="sidebar"
      type="is-white"
    >
      <div v-if="project.paid" class="w-100 has-background-success h-10"></div>
      <div v-else class="w-100 has-background-warning h-10"></div>

      <div class="p-1 p-relative">
        <div class="mb-2">
          <p>Project title</p>
          <h4 class="font-bold">{{ project.name }}</h4>
        </div>
        <div v-if="project.paid" class="flex flex-row paid">
          <span class="mr-1">Paid</span>
          <check-circle-icon size="1.5x" class="text-green"></check-circle-icon>
        </div>

        <div class="dropdown-divider"></div>
        <div class="mb-2">
          <p class="text-sm">Project type</p>
          <h4>{{ project.paperType }}</h4>
        </div>
        <div class="mb-2">
          <p class="text-sm">Description</p>
          <p>{{ project.description }}</p>
          <p class="mb-2 mt-2">
          Completion
          <span class="text-red has-text-weight-semibold">{{ dateFm(project.deadline) }}</span>
        </p>
        </div>
        
        <div class="mb-2">
          <b-field grouped group-multiline>
            <div class="control">
              <b-taglist attached>
                <b-tag type="is-dark">Uploaded files</b-tag>
                <b-tag type="is-info">{{
                  project.files ? project.files.length : 0
                }}</b-tag>
              </b-taglist>
            </div>
            <div class="control">
              <b-taglist attached>
                <b-tag type="is-dark">Pricing</b-tag>
                <b-tag type="is-info">{{
                  project.price ? project.price : calcPrice(project)
                }}</b-tag>
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
        <!-- This is a close icon for the sidebar incase the backdrop fails -->
        <x-circle-icon
          @click="closeSide"
          size="1x"
          class="p-absolute icon"
        ></x-circle-icon>
      </div>
      <div class="p-1 p-relative detail" v-if="project.status !== 'completed'">
        

        <div v-if="!project.paid" class="flex flex-wrap items-center">
          <!-- <Payment :projectId="project.pid" :paymentAmount="project.price ? project.price : calcPrice(project)"/> -->
          <b-button
            @click="updateProject"
            type="is-warning"
            >Update</b-button
          >
        </div>
        
        <div class="p-absolute bottom" v-else>
          <b-button
            @click="isProjectUpdateActive = !isProjectUpdateActive"
            type="is-warning"
            class="mb-3"
            >Update project</b-button
          >
        </div>
      </div>
      <div class="p-1 p-relative detail" v-else>
        <p class="text-green">
          Project is complete. Please find attached the completed files.
        </p>
        <div
          v-if="project.completeFiles && project.completeFiles.length > 0"
          class="mb-2"
        >
          <b-field label="Completed files">
            <div class="control">
              <b-taglist
                v-for="(file, i) in project.completeFiles"
                :key="i"
                attached
              >
                <b-tag rounded type="is-dark">
                  <a class="completeLink" :href="file" target="blank"
                    >File {{ i + 1 }}</a
                  >
                </b-tag>
              </b-taglist>
            </div>
          </b-field>
        </div>
        <b-button type="is-danger" class="mt-2" expanded @click="openReview"
          >Please leave us a review...</b-button
        >
      </div>
    </b-sidebar>
    <b-modal :active.sync="isProjectUpdateActive" :width="640" scroll="keep">
      <UpdateCard :id="project.id" @complete="complete" />
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import Payment from "./Payment";
import { XCircleIcon, CheckCircleIcon } from "vue-feather-icons";
import UpdateCard from "../UpdateProject";
export default {
  props: {
    projects: Array,
  },
  template: {},
  components: {
    // Payment,
    XCircleIcon,
    CheckCircleIcon,
    UpdateCard,
  },
  data() {
    return {
      openSide: false,
      project: {},
      projectId: "",
      isProjectUpdateActive: false,
    };
  },
  methods: {
    updateSingleProject() {
      // //("id", this.projectId)
      this.isProjectUpdateActive = !this.isProjectUpdateActive;
    },
    dateFm(s) {
      if (new Date(s) && typeof s !== Object && s != null) {
        let t = new Date(null);
        t.setSeconds(s.seconds);
        return t.toDateString();
      } else if (s.seconds) {
        //("s", s.seconds)
        return new Date(s.seconds * 1000);
      }
    },
    openReview() {
      this.$emit("showReviewBox", true);
      this.openSide = false;
    },
    toDate(d) {
      return new Date(d);
    },
    calcPrice(project) {
        if(this.openSide) {
            let now = this.$moment(this.dateFm(project.createdAt));
            let end = this.$moment(this.dateFm(project.deadline));
            var duration = this.$moment.duration(now.diff(end));
            var days = Math.abs(duration.asHours());

            if (days <= 24) {
                let p = parseInt(project.pages * 10 + project.pages * 3.2);

                return p;
            } else {
                let r = parseInt(project.pages * 10);
                return r;
            }
        }
      
    },
    closeSide() {
      if (this.openSide) {
        this.openSide = false;
      } else {
        return;
      }
    },
    complete() {
      this.isProjectUpdateActive = !this.isProjectUpdateActive;
    },
    updateProject() {
        this.isProjectUpdateActive = !this.isProjectUpdateActive
        this.closeSide();
    }
  },
  computed: {
    ...mapGetters({
      projectById: "projects/projectById",
    }),
    todate() {
      return this.project.deadline.toDate();
    },
  },
  created() {
    this.$nextTick(() => {
      this.$root.$on("projDetailOpen", (arg1) => {
        this.openSide = arg1.show;
        this.projectId = arg1.id;
        this.project = this.projects.find((p) => p.pid == arg1.id);
      });
    });
  },
};
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

.completeLink {
  color: white;

  &:hover {
    color: rgb(0, 132, 255);
  }
}

.detail {
  height: 100%;
}

.detail .bottom {
  bottom: 0;
}

.w-100 {
  width: 100%;
}

.h-10 {
  height: 10px;
}

.paid {
  margin-bottom: 2em;
}
</style>