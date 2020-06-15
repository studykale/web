<template>
  <!-- <div class="project-card">
      <div class="p-title">
          <div class="flex justify-between">
              <div>
                <h3 class="font-bold">{{ project.name }}</h3>
                <h5>{{ project.paperType }}</h5>
              </div>
          </div>
          
      </div>
      <div class="dropdown-divider"></div>
      <div class="p-content">
          <p>{{ project.description }}</p>
      </div>
      <div class="link">
          <b-button @click="showSide(project.id)" class="text-green" type="is-text">View details</b-button>
      </div>
   
    <b-field class="mt-2" grouped group-multiline>
        <div class="control">
            <b-taglist attached>
                <b-tag type="is-dark">pages</b-tag>
                <b-tag type="is-info">{{ project.pages }}</b-tag>
            </b-taglist>
        </div>

        <div class="control">
            <b-taglist attached>
                <b-tag type="is-dark">status</b-tag>
                <b-tag type="is-primary">{{ project.status.progress || project.status }}</b-tag>
            </b-taglist>
        </div>
    </b-field>
    <p class="text-sm"><span class="text-red">Deadline</span> {{ dateFm(project.deadline) | moment('from')  }}</p>
  </div> -->
   <div>
      <div @click="showSide(project.id)" class="project-card">
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
  </div>
</template>

<script>

export default {
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
        showSide(id) {
            this.$root.$emit('projDetailOpen', { show: true, id: id  })
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