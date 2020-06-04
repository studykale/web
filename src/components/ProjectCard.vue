<template>
  <div class="project-card">
      <div class="p-title">
          <div class="flex justify-between">
              <div>
                <h3 class="font-bold">{{ project.name }}</h3>
                <h5>{{ project.paperType }}</h5>
              </div>
              <div>
                  <chevron-right-icon @click.prevent="showSide" size="2x" class="icon"></chevron-right-icon>
              </div>
          </div>
          
      </div>
      <div class="dropdown-divider"></div>
      <div class="p-content">
          <p>{{ project.description }}</p>
      </div>
      <div class="link">
          <a href="#">View details</a>
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
                <b-tag type="is-dark">cost</b-tag>
                <b-tag type="is-success">{{ project.price || "$20" }}</b-tag>
            </b-taglist>
        </div>

        <div class="control">
            <b-taglist attached>
                <b-tag type="is-dark">status</b-tag>
                <b-tag type="is-primary">{{ project.status }}</b-tag>
            </b-taglist>
        </div>
    </b-field>
    <p class="text-sm"><span class="text-red">Deadline</span> {{ project.deadline | moment('from', 'now')  }}</p>
  </div>
</template>

<script>

import VueScreenSize from 'vue-screen-size'
import { ChevronRightIcon } from 'vue-feather-icons';


export default {
    mixins: [VueScreenSize.VueScreenSizeMixin],
    props: {
       project: Object
    },
    components: {
        ChevronRightIcon,
    },
    methods: {
        dateFm(s) {
           return new Date(s * 1000);
        },
        showSide() {
            this.$root.$emit('projDetailOpen', { show: true, id: this.project.id  })
        }
    }
}
</script>

<style lang="scss" scoped>
    .project-card {
        margin-top: 2em;
        padding: 1.2em;
        background: white;
        border-radius: 5px;
        box-shadow: 0px 5px 11px 5px #6e9bde33;

        .p-title {
            margin-bottom: .75em;
        }

        .link {
            margin-top: 1em;
            a {
                color: rgb(33, 150, 33);
            }
        }

        ul {
            display: flex;
            margin-bottom: 1em;
            margin-top: 1em;
            
            li {
                border: 1.5px solid rgb(112, 112, 112);
                padding: 5px;
                margin-right: 5px;
                list-style-type: none;
                border-radius: 25px;
            }
        }

        .text-sm {
            font-size: .95rem;
        }

        .text-red {
            font-weight: 600;
            color: rgb(224, 56, 56);
        }
    }

    .icon {
        
        transition: .15s;
        &:hover {
            background-color: rgb(209, 193, 193);
            color: rebeccapurple;
        }
    }
</style>