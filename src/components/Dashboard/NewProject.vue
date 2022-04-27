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
                    <section>
                        <b-field class="file">
                        <b-upload v-model="file" expanded>
                            <a class="button is-primary is-fullwidth">
                            <b-icon icon="upload"></b-icon>
                            <span>{{ file.name || "Click to upload"}}</span>
                            </a>
                        </b-upload>
                        </b-field>
                        <b-field>
                        <b-upload v-model="dropFiles" multiple drag-drop expanded>
                            <section class="section">
                            <div class="content has-text-centered">
                                <p>
                                <b-icon icon="upload" size="is-large"></b-icon>
                                </p>
                                <p>Drop your files here or click to upload</p>
                            </div>
                            </section>
                        </b-upload>
                        </b-field>

                        <div class="tags">
                        <span v-for="(file, index) in dropFiles" :key="index" class="tag is-primary">
                            {{file.name}}
                            <button class="delete is-small" type="button" @click="deleteDropFile(index)"></button>
                        </span>
                        </div>
                    </section>
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
            projectDescription: "",
            file: {},
            dropFiles: []
        }
    },
    methods: {
        newProject() {
            
        },
         deleteDropFile(index) {
            this.dropFiles.splice(index, 1);
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