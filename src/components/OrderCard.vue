<template>
  <section class="card">
      <div class="card__header">
          <div class="flex justify-between">
            <h3>Let's begin...</h3>
            <h3><b>{{ totalWords }}</b> words</h3>
          </div>
      </div>
      <div class="card__content">
          <form @submit.prevent="createDraft">
            <b-field label="Email">
                <b-input placeholder="your@email.com" type="email" v-model="orderEmail" required></b-input>
            </b-field>
            <b-field label="Type of paper">
                <b-select
                    v-model="orderPaperType"
                    placeholder="Select One"
                    expanded
                    required>
                    <option v-for="(option, index) in typeOfPaper" v-bind:value="option.value" :key="index">
                        {{ option.value }}
                    </option>
                </b-select>
            </b-field>
            <b-field>
                <template slot="label">
                    Pages
                    <b-tooltip type="is-dark" label="Standard page has 275 words">
                        <alert-circle-icon size="1x" class="custom-class"></alert-circle-icon>
                    </b-tooltip>
                </template>
                <b-numberinput v-model="orderPages" min="1" :max="maxOrderPages" >
                </b-numberinput>
            </b-field>
            
            <b-field label="Select a date">
                <b-datepicker
                    v-model="orderDeadline"
                    :min-date="minDate"
                    placeholder="Type or select a date..."
                    icon="calendar-today"
                    required
                    >
                </b-datepicker>
            </b-field>
            <div class="buttons">
                <button class="button is-danger is-fullwidth" :class="{ status: 'is-loading' }" type="submit">Continue</button>
            </div>
          </form>
      </div>
      <div class="card__footer">
      </div>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { AlertCircleIcon } from 'vue-feather-icons';

export default {
    name: 'OrderCard',
    components: {
        AlertCircleIcon
    },
    data() {
        const today = new Date()
        return {
            date: new Date(),
            minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
            maxOrderPages: 100,
            orderEmail: "",
            orderPaperType: "",
            pricePerPage: 30,
            currency: 'AUD',
            orderPages: 1,
            orderDeadline: new Date(),
            pageNumber: 1,
            words: 275,
            typeOfPaper: [{value: "Essay"}, {value: "Admission Essay"}, {value: "Annotated Bibliography"}, {value: "Argumentative Essay"}, {value: "Article Review"}, {value: "Book/movie Review"}, {value: "Business review"}, {value: "Case Study"}, {value: "Course Work"}, {value: "Creative writing"}, {value: "Critical Thinking"}, {value: "Presentation or Speech"},
                {value: "Research Paper"}, {value: "Research propasal"}, {value: "Term Paper"}, {value: "Thesis/Dissertion Paper"}, {value: "CV"}, {value: "Other"}
            ]
        }
    },
    methods: {
        ...mapActions('projects', ['addDraftProject']),
        createDraft() {
            let data = {
                email: this.orderEmail,
                paperType: this.orderPaperType,
                pages: this.orderPages,
                deadline: this.orderDeadline,
            }

            if((24 - this.orderDeadline.getHours()) > 0) {
                data.price = (this.orderPages * 30) + (this.orderPages * 5);
            } else {
                data.price = this.orderPages * 30
            }

            this.addDraftProject(data);
            this.orderDeadline = new Date();
            this.orderEmail = "";
            this.orderPaperType = "";
            this.orderPages = 1;

        }
    },
    computed: {
        ...mapState({
            status: state => state.projects.addingDraftProject
        }),
        totalWords() {
            return this.orderPages * this.words
        }
    }
}
</script>

<style lang="scss">
    .card {
        height: auto;
        width: 350px;
        border-radius: 7px;
        box-shadow: 0 10px 15px rgba(0, 0, 0, .25);

        @media only screen and (max-width: 768px) {
            margin: auto;
        }

        &__header {
            background: #E20338;
            padding: 1em 1em;
            text-align: left;
            border-top-right-radius: 7px;
            border-top-left-radius: 7px;

             h3 {
                 color: white;
             }
        }

        &__content {
            padding: .75em 1em;
        }
    }
</style>