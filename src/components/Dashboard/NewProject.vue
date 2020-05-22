<template>
    <div class="card w-auto">
        <div class="card-content">
            <form @submit.prevent="newProject">
            <b-steps
                size="is-small">
                
                <b-step-item label="Project" icon="account-key">
                    <b-field label="Project name">
                        <b-input required v-model="projectName" placeholder="Project name" expanded/>
                    </b-field>
                    <b-field label="Project description">
                        <b-input v-model="projectDescription" type="textarea" expanded placeholder="Project description"/>
                    </b-field>
                    <b-field label="Type of paper">
                        <b-select
                            v-model="paperType"
                            placeholder="Select One"
                            expanded>
                            <option v-for="(option, index) in typeOfPaper" v-bind:value="option.value" :key="index">
                                {{ option.value }}
                            </option>
                        </b-select>
                    </b-field>
                </b-step-item>

                <b-step-item label="Profile" icon="account">
                    <h2>Drop down item</h2>
                </b-step-item>

                <b-step-item label="Social" icon="account-plus" disabled>
                    <h3>Payment</h3>
                </b-step-item>

                <template
               
                slot="navigation"
                slot-scope="{previous, next}">
                <b-button
                    
                    type="is-danger"
                    :disabled="previous.disabled"
                    @click.prevent="previous.action">
                    Previous
                </b-button>
                <b-button
                    class="ml-3"
                    
                    type="is-success"
                    :disabled="next.disabled"
                    @click.prevent="next.action">
                    Next
                </b-button>
            </template>
            </b-steps>
            </form>
        </div>
       </div>
</template>

<script>
export default {
    data() {
        return {
            labelPosition: 'bottom',
             typeOfPaper: [{value: "Essay"}, {value: "Admission Essay"}, {value: "Annotated Bibliography"}, {value: "Argumentative Essay"}, {value: "Article Review"}, {value: "Book/moview Review"}, {value: "Business review"}, {value: "Case Study"}, {value: "Course Work"}, {value: "Creative writing"}, {value: "Critical Thinking"}, {value: "Presentation or Speech"},
                {value: "Research Paper"}, {value: "Research propasal"}, {value: "Term Paper"}, {value: "Thesis/Dissertion Paper"}, {value: "Other"}
            ],
            paperType: "",
            projectName: "",
            projectDescription: ""
        }
    },
    methods: {
        newProject() {
            
        }
    }
}
</script>

<style lang="scss" scoped>
    .card.w-auto {
        margin: 10px;

        .card-content {
            padding: .75rem;
        }
    }
</style>