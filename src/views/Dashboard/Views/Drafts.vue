<template>
  <div class="drafts">
      <div class="card w-80">
        <div class="card-content">
          <h3 class="subtitle font-bold">Drafts</h3>
          <small>This contains projects you started but did not complete filling</small>
        </div>
      </div>
      <br>
      <div class="drafts__list">
        <div class="card" v-for="(draft, index)  in drafts" :key="index">
            <div class="pricing">
              <div class="bg-purple flex justify-center items-center">
                <clock-icon size="1.5x"></clock-icon>
              </div>
            </div>
            <div class="content">
              <div class="header">
                <small class="font-bold">Paper type</small>
                <h3>{{ draft.paperType }}</h3>
              </div>
              <div class="message">
                <div class="flex flex-row justify-between details">
                  <div class="leading-light">
                    <small class="font-bold">Pages</small>
                    <p class="text-info">{{ draft.pages }}</p>
                  </div>
                  <div class="leading-light">
                    <small class="font-bold text-success">Created</small>
                    <p class="text-info">{{ draft.createdAt | moment('dddd, MMMM Do') }}</p>
                  </div>
                  <div class="leading-light">
                    <small class="font-bold text-red">Deadline</small>
                    <p class="text-info">{{ draft.deadline | moment('dddd, MMMM Do') }}</p>
                  </div>
                </div>
                <div class="actions">
                  <button @click="convertToProject(index)">Convert to project</button>
                </div>
              </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ClockIcon } from 'vue-feather-icons'
export default {
  components: {
    ClockIcon
  },
  data() {
    return  {
      selected: null
    }
  },
  methods: {
    convertToProject() {
      console.log("draft selected")
    }
  },
  computed : {
    ...mapState({
      drafts: state => state.projects.draftProjects
    })
  }
}
</script>

<style lang="scss" scoped>
  .drafts {
    
    .card.w-80 {
      width: 80%;

      @media screen  and (max-width: 680px) {
        width: 100%;
      }
      
      .card-content {
        padding: 1em;

      }

      .card-content .font-bold {
        font-weight: bolder;
      }
    }

    &__list {

       .card {
          font-family: 'muli', sans-serif;
          padding: 1em;
          display: flex;
          border-radius: 4px;
          transition: .25s ease-out;
          box-shadow: 0 2px 3px lightgray;
          margin-bottom: 2em;
          width: auto;

          @media screen and (max-width: 680px) {
              flex-direction: column;
          }
        }

        .card:hover {
            box-shadow: 0 3px 6px 1px rgba(0, 0, 0, .25);
        }

        .card .pricing {
          margin-right: 10px;
          display: flex;

          @media screen  and (max-width: 680px){
            display: none;
          }
        }

        .card .bg-purple {
          height: 50px;
          width: 50px;
          background: mediumpurple;
          border-radius: 4px;
          color: white;
        }

        .card .content {
          display: block;
        }

        .card .content .header {
          line-height: .25;
        }

        .header h3 {
          margin-top: 10px !important;
        }

        .card .content .message {
          margin-top: 2em;
          background: transparent !important;

          @media screen and (max-width: 680px) {
            .flex {
              flex-direction: column;
            }
          }
        }

        .leading-tight {
          @media screen and (max-width: 680px) {
            margin-bottom: 12px;
          }
        }

        .text-info {
          color: rebeccapurple;
        }

        small {
          color: gray;
        }

        .flex {
          display: flex;
        }

        .flex-row {
          flex-direction: row;
        }

        .justify-between {
          justify-content: space-between;
        }

        .font-bold {
          font-weight: 700;
        }


        .text-red {
          color: red;
        }

        .text-success {
          color: green;
        }

        .message .details div:not(:last-of-type) {
          margin-right: 10px
        }

        .card .actions {
          margin: 10px auto;
          display: block;
        }

        .actions button {
          padding: 8px 15px;
          background: rebeccapurple;
          outline: none;
          border: none;
          color: white;
          font-family: 'muli';
        }
    }
  }

 
</style>