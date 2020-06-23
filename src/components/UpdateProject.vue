<template>
  <div>
      <div class="card">
          <div class="card-header p-2">
              <p class="font-bold">
                  Update project details
              </p>
          </div>
          <div class="card-content">
              <form @submit.prevent="updateSingleProject">
                    <b-field label="Project name">
                        <b-input required minLength="5" maxLength="55" v-model="name" v-on:change="changed"></b-input>
                    </b-field>
                     <b-field label="Project description"
                        >
                        <b-input maxlength="300" type="textarea" v-model="description" expanded placeholder="Project description" v-on:change="changed"></b-input>
                    </b-field>
                    <b-field class="mt-2" label="Select datetime">
                            <b-datepicker
                                :name="deadline"
                                v-model="deadline"
                                v-on:change="changed"
                                placeholder="Select a date"
                                icon="calendar-today"
                                :min-date="deadline"
                                >
                            </b-datepicker>
                            <!-- <b-datetimepicker v-model="datetime" inline></b-datetimepicker> -->
                    </b-field>
                    <button class="button is-warning" type="submit">Update</button>
              </form>
          </div>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    props: {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        deadline: {
            type: Date,
            reqiured: true
        },
        closeModal: Boolean
    },
    data() {
        return {
            changedValues: false
        }
    },
    name: 'UpdateProjectCard',
    methods: {
        ...mapActions('projects', ['updateProjects']),
        updateSingleProject() {
            let data = {
                name: this.name,
                deadline: this.deadline,
                description: this.description
            }

            this.updateProjects(data)
            this.changedValues = false,
            this.closeModal = false
        },
        changed() {
            this.changedValues = true;
        }
    }
}
</script>
