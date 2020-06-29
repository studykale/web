<template>
    <div class="card w-50 m-auto">
        <div class="card-header">
            <div class="card-header-title flex justify-around">
                <span>
                    Creating a new project
                </span>
                <span class="font-bold"> <span class="text-red">{{ calcPrice() }}</span> AUD</span>
            </div>
        </div>
        <div class="card-content">
            <form @submit.prevent="newProject">
                <b-steps
                v-model="activeStep"
                size="is-small"
                type="is-primary"
                    >
                     <b-step-item step="1" label="Project details">
                        <b-field label="Project name">
                        <b-input :name="projectName" required minLength="5" maxlength="55" v-model="projectName" placeholder="Project name" expanded/>
                        </b-field>
                        <b-field label="Project description">
                            <b-input :name="projectDescription" maxlength="300" v-model="projectDescription" type="textarea" expanded placeholder="Project description"/>
                        </b-field>
                    </b-step-item>
                    
                    <!-- Add more details. Paper type, Paper deadline, Number of pages. -->
                    <b-step-item class="my-2" step="2" label="Time to complete">
                        <b-field class="mt-2" label="Select datetime">
                            <b-datepicker
                                :name="deadline"
                                v-model="deadline"
                                placeholder="Select a date"
                                icon="calendar-today"
                                :timepicker="timepicker"
                                :min-date="minDatetime"
                                :max-date="maxDatetime"
                                >
                            </b-datepicker>
                            <!-- <b-datetimepicker v-model="datetime" inline></b-datetimepicker> -->
                        </b-field>
                        <b-field>
                            <template slot="label">
                                Pages
                                <b-tooltip type="is-dark" label="Standard page has 275 words">
                                    <alert-circle-icon size="1x" class="custom-class"></alert-circle-icon>
                                </b-tooltip>
                            </template>
                            <b-numberinput :name="orderPages" v-model="orderPages" min="1" :max="maxOrderPages" >
                            </b-numberinput>
                        </b-field>
                        <b-field label="Type of paper">
                            <b-select
                                :name="paperType"
                                required
                                v-model="paperType"
                                placeholder="Select One"
                                expanded>
                                <option v-for="(option, index) in typeOfPaper" v-bind:value="option.value" :key="index">
                                    {{ option.value }}
                                </option>
                            </b-select>
                        </b-field>
                    </b-step-item>
                    <!-- Upload documents -->
                    <b-step-item step="3" label="Extra files">
                        <section class="flex justify-center flex-column">
                            <b-field class="flex justify-center flex-column" label="Upload documents" message="Accepts pdfs and docs only.">
                                <b-upload class="w-100" 
                                    :name="dropFiles"
                                    v-model="dropFiles"
                                    multiple
                                    drag-drop
                                    accept="application/pdf, application/doc"
                                    type="is-success">
                                    <section class="section">
                                        <div class="content has-text-centered">
                                            <p>
                                                <b-icon
                                                    icon="upload"
                                                    size="is-large">
                                                </b-icon>
                                            </p>
                                            <p>Drop your files here or click to upload</p>
                                        </div>
                                    </section>
                                </b-upload>
                            </b-field>
                            <div class="tags">
                                <span v-for="(f, index) in dropFiles"
                                    :key="index"
                                    class="tag is-primary" >
                                    {{f.name}}
                                    <button class="delete is-small"
                                        type="button"
                                        @click="deleteDropFile(index)">
                                    </button>
                                </span>
                            </div>
                        </section>
                    </b-step-item>

                    <b-step-item step="4" label="Complete">
                        <h2 class="subtitle" v-if="projectName && paperType">Awesome the project is set.</h2>
                        <h2 class="subtitle" v-else>Please complete setting up the project</h2>
                        <hr class="dropdown-divider"/>
                        <div class="text-left">
                        <h2>Pages: {{ orderPages }}</h2>
                        <h2>{{ totalWords }} Words</h2>
                        <h4><span class="font-bold">Name: </span><span>{{ projectName || 'Please set a name' }}</span></h4>
                        <h4><span class="font-bold">Paper type: </span><span>{{ paperType || 'Please set the type otf paper' }}</span></h4>
                        
                        </div>
                        <button  class="button is-primary is-fullwidth" type="submit" @click="$parent.close()">Submit</button>
                    </b-step-item>
                </b-steps>
            </form>
        </div>
       </div>
</template>

<script>
// import { validationMixin } from "vuelidate";
import { mapActions, mapState } from "vuex";
import { AlertCircleIcon } from 'vue-feather-icons';
// import { notifications, Timestamp, currentUser } from "../../db";

export default {
    props: {
        showNewProject: Boolean,
        currentUser: Object,
        pType: String,
        completion: String,
        pages: String
    },
    components: {
        AlertCircleIcon
    },
    data() {
            const min = new Date()
            min.setDate(min.getDate())
            min.setHours(min.getHours() + 4)
            min.setMinutes(0)
            min.setSeconds(0)
            const max = new Date()
            max.setDate(max.getDate() + 7)
            max.setHours(24)
            max.setMinutes(0)
            max.setSeconds(0)
        return {
            activeStep: 0,
            labelPosition: 'bottom',
             typeOfPaper: [
                    {value: "Essay"}, {value: "Admission Essay"}, {value: "Annotated Bibliography"}, {value: "Argumentative Essay"}, {value: "Article Review"}, {value: "Book/moview Review"}, {value: "Business review"}, {value: "Case Study"}, {value: "Course Work"}, {value: "Creative writing"}, {value: "Critical Thinking"}, {value: "Presentation or Speech"},
                    {value: "Research Paper"}, {value: "Research propasal"}, {value: "Term Paper"}, {value: "Thesis/Dissertion Paper"}, {value: "Other"}
            ],
            paperType: "",
            projectName: "",
            projectDescription: "",
            dropFiles: [],
            minDatetime: new Date(),
            maxDatetime: max,
            timepicker: {
                incrementMinutes: 15,
                incrementHours: 4
            },
            deadline: new Date(),
            orderPages: 1,
            maxOrderPages: 100,
            pricePerPage: 1,
            currency: 'AUD',
            totalPrice: 0
        }
    },
    methods: {
        ...mapActions('projects', ['addProject']),
        async newProject() {
            let data = {
                genId: this.randomId(8),
                name: this.projectName,
                description: this.projectDescription,
                deadline: this.deadline,
                paperType: this.paperType,
                pageNumber: this.orderPages,
                files: this.dropFiles,
                status: 'pending',
                creator: this.currentUser.userId,
                price: await this.calcPrice()
            }

            this.addProject(data)
            this.$parent.close();
        },
         deleteDropFile(index) {
            this.dropFiles.splice(index, 1);
        },
        calcPrice() {
            let now = this.$moment(new Date());
            let end = this.$moment(this.deadline);
            var duration = this.$moment.duration(now.diff(end));
            var days = duration.asDays();
            
            if(days.toFixed() >= 0 ) {
                return this.orderPages * 1
            }
            return this.orderPages * this.pricePerPage;
        },
        randomId(length) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
    },
    computed: {
        ...mapState({
            addingProject: state => state.projects.addingProject
        }),
        totalWords() {
            return 275 * this.orderPages;
        }
    }
}
</script>

<style lang="scss" scoped>
    .card{
        margin: 20px;
        .text-center  {
            text-align: center;
        }

        .card-content {
            padding: .25rem;
        }

        form {
            .button {
                margin-top: 1.4em;
            }

            .upload-control {
                width: 100% !important;
            }
        }
    }

    .w-50 {
        width: 100%;

        @media screen and (min-width: 768px) {
            width: 50% !important; 
        }
    }

    .w-100 {

        .upload-control {
            width: 100%;
        }
    }
</style>