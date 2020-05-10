<template>
  <section class="card">
      <div class="card__header">
          <h3>Let's begin...</h3>
      </div>
      <div class="card__content">
          <form>
            <b-field label="Name">
                <b-input placeholder="your@email.com" type="email" v-model="orderEmail"></b-input>
            </b-field>
            <b-field label="Type of paper">
                <b-select
                    v-model="orderPaperType"
                    placeholder="Select One"
                    expanded>
                    <option v-for="(option, index) in typeOfPaper" v-bind:value="option.value" :key="index">
                        {{ option.value }}
                    </option>
                </b-select>
            </b-field>
            <b-field label="Pages">
                <b-numberinput v-model="orderPages" min="1" max="10" >
                </b-numberinput>
            </b-field>
            
            <b-field label="Select a date">
                <b-datepicker
                    v-model="orderDeadline"
                    :min-date="minDate"
                    placeholder="Type or select a date..."
                    icon="calendar-today"
                    >
                </b-datepicker>
            </b-field>
            <div class="buttons">
                <b-button type="is-primary" expanded>Continue</b-button>
            </div>
          </form>
      </div>
      <div class="card__footer">
      </div>
  </section>
</template>

<script>
export default {
    name: 'OrderCard',
    data() {
        const today = new Date()
        return {
            date: new Date(),
            minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
            orderEmail: "",
            orderPaperType: "",
            orderPages: 1,
            orderDeadline: new Date(),
            pageNumber: 1,
            wordsPerPage: 275,
            typeOfPaper: [{value: "Essay"}, {value: "Admission Essay"}, {value: "Annotated Bibliography"}, {value: "Argumentative Essay"}, {value: "Article Review"}, {value: "Book/moview Review"}, {value: "Business review"}, {value: "Case Study"}, {value: "Course Work"}, {value: "Creative writing"}, {value: "Critical Thinking"}, {value: "Presentation or Speech"},
                {value: "Research Paper"}, {value: "Research propasal"}, {value: "Term Paper"}, {value: "Thesis/Dissertion Paper"}, {value: "Other"}
            ]
        }
    },
    methods: {
        calcWordsTotal: () => {
            return this.pageNumber * this.wordsPerPage
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