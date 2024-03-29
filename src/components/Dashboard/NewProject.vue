<template>
    <div class="card w-50 m-auto">
        <div class="card-header">
            <div class="card-header-title flex justify-around">
                <span>
                    Creating a new project.
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
                     <b-step-item   step="1" label="Project details">
                        <b-field label="Project name">
                        <b-input :name="projectName" required minLength="5" maxlength="55" v-model="projectName" placeholder="Project name" expanded/>
                        </b-field>
                        <b-field label="Project description">
                            <b-input required :name="projectDescription" maxlength="300" v-model="projectDescription" type="textarea" expanded placeholder="Project description"/>
                        </b-field>
                    </b-step-item>
                    
                    <!-- Add more details. Paper type, Paper deadline, Number of pages. -->
                    <b-step-item class="my-2" step="2" label="Time to complete">
                        <b-field class="mt-2" label="Select date for Completion">
                            <b-datepicker
                                :disabled="disablePredefined"
                                required
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
                            <b-numberinput :disabled="disablePredefined" :name="orderPages" v-model="orderPages" min="1" :max="maxOrderPages" >
                            </b-numberinput>
                        </b-field>
                        <b-field label="Type of paper">
                            <b-select
                                :disabled="disablePredefined"
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
                    <b-step-item  step="3" label="Extra files">
                        <section class="flex justify-center flex-column">
                            <b-field class="flex justify-center flex-column" label="Upload documents" message="Accepts pdfs and docs only." expanded>
                                <b-upload
                                    :name="dropFiles"
                                    v-model="dropFiles"
                                    multiple
                                    drag-drop
                                    expanded
                                    accept=".xlsx, .xls, image/*, .doc, .docx, .ppt, .pptx, .txt, .pdf"
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

                    <b-step-item step="4" label="Payment">
                        <div class="flex justify-center flex-column">
                            <h2 class="subtitle text-center">Payment Information</h2>
                            <p v-if="token == null" class="text-center">Please add payment information</p>
                            <p class="has-text-success text-center" v-else>Successfully added.</p>
                            <br>
                            <stripe-element-card
                                ref="cardRef"
                                :pk="publishableKey"
                                @token="tokenCreated"
                            />
                            <p v-if="cardErrorMessage">{{ cardErrorMessage }}</p>
                            <b-button v-if="token == null" :loading="loadingToken" @click="generateToken" type="is-primary">Add Card</b-button>
                        </div>
                    </b-step-item>

                    <b-step-item step="5" label="Complete">
                        <div class="flex justify-center flex-column">
                            <div class="success_project" v-if="projectName && paperType">
                                <check-circle-icon size="4x" class="has-text-success mr-2"></check-circle-icon>
                                <p class="mt-2 subtitle">Successfully set up</p>
                            </div>
                            <b-message type="is-warning" title="Incomplete" v-else>
                                <alert-circle-icon size="1.5x" class="has-text-danger"></alert-circle-icon>
                                
                                Please complete setting up your project.
                            </b-message>
                            <p v-if="Object.keys(drafts).length > 0">Please note that draft made projects will be deleted...</p>
                        
                        </div>
                        <button :disabled="projectName.length <= 0 || paperType.length <= 0" class="button is-primary is-fullwidth" type="submit" @click="$parent.close()">Submit</button>
                    </b-step-item>
                    <template
                        slot="navigation"
                        slot-scope="{previous, next}">
                        <div class="m-2">
                            <b-button
                                class="mr-2"
                                type="is-danger"
                                :disabled="previous.disabled"
                                @click.prevent="previous.action">
                                Previous
                            </b-button>
                            <b-button
                                :class="{ 'd-none' : unverified}"
                                type="is-success"
                                :disabled="next.disabled"
                                @click.prevent="next.action">
                                Next
                            </b-button>
                        </div>
                    </template>
                </b-steps>
            </form>
        </div>
       </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { mapActions, mapState } from "vuex";
import { AlertCircleIcon, CheckCircleIcon } from 'vue-feather-icons';
import { draftsCollection } from '../../db';
import { NotificationProgrammatic as Notify } from "buefy"
import { StripeElementCard } from "@vue-stripe/vue-stripe"

// import { notifications, Timestamp, currentUser } from "../../db";

export default {
    mixins: [validationMixin],
    props: {
        showNewProject: Boolean,
        currentUser: Object,
        pType: String,
        completion: String,
        pages: String,
        draft: {
            type: Object
        }
    },
    components: {
        AlertCircleIcon,
        StripeElementCard,
        CheckCircleIcon,
    },
    data() {
        this.publishableKey = process.env.VUE_APP_PK
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
                    {
                        value: "Essay"
                    }, {value: "Admission Essay"}, {value: "Annotated Bibliography"}, {value: "Argumentative Essay"}, {value: "Article Review"}, {value: "Book/moview Review"}, {value: "Business review"}, {value: "Case Study"}, {value: "Course Work"}, {value: "Creative writing"}, {value: "Critical Thinking"}, {value: "Presentation or Speech"},
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
            pricePerPage: 25,
            currency: 'AUD',
            totalPrice: 0,
            disablePredefined: false,
            loaded: false,  
            loadingToken: false,
            cardErrorMessage: null,
            token: null     
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
                price: await this.calcPrice(),
                token: this.token
            }

            this.addProject(data)
            if(Object.keys(this.draft).length > 0) {
                draftsCollection.doc(this.draft.id).delete();
            }

            
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
                return this.orderPages * 26;
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
        },
        setLoaded() {
            this.loaded = true;
            let v = this;
            let randomId = this.randomId(8);
           
            window.paypal.Buttons({
                style: {
                    shape: 'pill',
                    color: 'blue',
                    layout: 'vertical',
                    label: 'paypal',
                    
                },
                createOrder: function(data, actions) {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: v.calcPrice()
                                }
                            }
                        ]
                    });
                },
                onApprove: function(data, actions) {
                    return actions.order.capture().then(function(details) {
                        console.log("details", details)
                        let data = {
                            genId: randomId,
                            name: v.projectName,
                            description: v.projectDescription,
                            deadline: v.deadline,
                            paperType: v.paperType,
                            pageNumber: v.orderPages,
                            files: v.dropFiles,
                            status: 'pending',
                            creator: v.currentUser.userId,
                            price: v.calcPrice()
                        }

                        v.addProject(data)
                        if(Object.keys(v.draft).length > 0) {
                            draftsCollection.doc(v.draft.id).delete();
                        }

                        
                        v.$parent.close();
                    });
                },
                onError: (err) => {
                    console.log("err", err);
                    Notify.open({
                        type: "is-warning",
                        position: "is-top-right",
                        message: "Sorry you need to complete payment before we first add your project."
                    })
                }
        }).render(this.$refs.paypal);
        },
        async generateToken(){
            console.log("Logging");
            this.loadingToken = true;
            await this.$refs.cardRef.submit();
            this.loadingToken = false;
        },
        tokenCreated(token) {
            console.log("created", token);
            // Send token to server
            this.token = token.id;
        }
    },
    computed: {
        ...mapState({
            addingProject: state => state.projects.addingProject,
            drafts: state => state.projects.draftProjects
        }),
        totalWords() {
            return 275 * this.orderPages;
        },
        unverified() {
            if(this.activeStep == 0 && (!this.projectName || this.projectName.length < 5 || !this.projectDescription)) {
                return true;
            } else if(this.activeStep == 1 && (!this.paperType)) {
                return true
            } else if(this.token == null && this.activeStep == 3) {
                return true;
            } else {
                return false;
            }
        },
    },
    created() {
        this.$root.$on('selectedDraft', (draftId) => {
            console.log("start")
            let newP = this.drafts.find(d => d.id == draftId);
            this.deadline = newP.deadline;
            this.orderPages = newP.pages;
            this.paperType = newP.paperType;
        })
        if(this.draft && Object.keys(this.draft).length > 0) {
            this.orderPages = this.draft.pages;
            this.paperType = this.draft.paperType;
            this.deadline = this.draft.deadline.toDate();
            this.disablePredefined = true;
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

    .details h4 {
        margin-bottom: .25em;
    }

    .w-50 {
        width: 100%;

        @media screen and (min-width: 768px) {
            width: 50% !important; 
        }
    }

    .d-none {
        display: none;
    }

    .w-100 {

        .upload-control {
            width: 100%;
        }
    }
    .paypal-btn {
        @media screen and (min-width: 400px) {
            width: 100%;
        }

        @media screen and (max-width: 400px) {
            width: 250px;
            margin: auto;
        }
    }
    .success_project {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 2em;   
    }
    

    .upload-draggable.is-success {
        width: 100% !important;
    }
</style>