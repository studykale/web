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
                        <b-input required minLength="5" maxLength="55" v-model="project.name" v-on:change="changed"></b-input>
                    </b-field>
                     <b-field label="Project description"
                        >
                        <b-input maxlength="300" type="textarea" v-model="project.description"  expanded placeholder="Project description" v-on:change="changed"></b-input>
                    </b-field>
                    <b-field class="mt-2" label="Select datetime">
                            <b-datepicker
                                :name="project.deadline.toDate()"
                                v-model="deadline"
                                v-on:change="changed"
                                placeholder="Select a date"
                                icon="calendar-today"
                                :min-date="project.deadline.toDate()"
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
import { projectsCollection, Timestamp } from '../db'

export default {
    props: ['id'],
    data() {
        return {
            changedValues: false,
            project: null
        }
    },
    name: 'UpdateProjectCard',
    methods: {
        ...mapActions('projects', ['updateProjects']),
        updateSingleProject() {
            projectsCollection.doc(this.id).set({
                name: this.project.name,
                description: this.project.description,
                deadline: Timestamp.fromDate(this.deadline)
            }, { merge: true })
            this.changedValues = false,
            this.closeModal = false
            this.$emit('complete')
        },
        changed() {
            this.changedValues = true;
        }
    },
    computed: {
        deadline: {
            get() {
                return this.project.deadline.toDate()
            },
            set(newDl) {
                return newDl
            }
        }
    },
    created() {
        this.$bind('project', projectsCollection.doc(this.id))
    }
}
</script>
