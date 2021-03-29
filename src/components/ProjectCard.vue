<template>
   
      <div @click="showSide(project)" class="project-card">
          <div class="head">
              <h2 class="title">{{ project.name }}</h2>
          </div>
          <div class="content">
            <p class="description">
                {{ project.description }}
            </p>
            <p class="date">
                <span><calendar-icon size="1.5x" class="custom-class"></calendar-icon></span>
                <span>{{ dateFm(project.deadline) }}</span>
            </p>
          </div>
      </div>
  
</template>

<script>
import  { CalendarIcon } from "vue-feather-icons"
export default {
    components: {
        CalendarIcon
    },
    props: {
       project: Object
    },
    methods: {
        
        dateFm(s) {
            if(new Date(s) && !s.seconds) {
                return new Date(s).toDateString();
            } else {
                
                return new Date(s.seconds * 1000).toDateString()
            }
        },
        showSide(project) {
            this.$root.$emit('projDetailOpen', { show: true, id: project.pid ? project.pid : project.name  })
        },
    }
}
</script>

<style lang="scss" scoped>
     .project-card {
        box-shadow: 0 2px 2px rgba(0, 0, 0, .25);
        border-radius: 4px;
        padding: .5em;
        border-top: solid 2px #FF005C;
        width: 300px;
        background-color: white;
        margin-bottom: 14px;

        margin-right: 7px;

        .head {
            margin-bottom: 14px;

            .title {
                font-size: 1rem;
                font-weight: 800;
                color: #111;
            }
        }

        .content {
            .description {
                color: #686868;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: .75rem;
            }

            .date {
                display: flex;
                margin-top: 14px;
                font-size: .75rem;

                span:not(:last-of-type) {
                    margin-right: 10px;
                }
            }
        }
    }
</style>