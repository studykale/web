<template>
  <Layout>
      <div class="container">
          <b-steps v-model="activeStep">
            <b-step-item
                label="Place an Order"
                :displayed="true"
                class="container w-50"
            >
                <div class="mt-2">
                    <div class="img">
                        <img src="../assets/illustrations/build.svg" alt="Easy start">
                    </div>
                    <h2 class="title">Place an Order</h2>
                    <div class="dropdown-divider"></div>
                    <p>Specify the type of paper, set the page limit, set the instructions and the deadline. We will the send your order to the qualified writer.</p>
                    <ul>
                        <li><p>You can decide to create a draft first from the home page. The project will be saved as a draft and can be converted to a complete project after you login.</p></li>
                        <li>
                            <p>You can also decide to register first and view how the process works out before posting a draft project. You will require to register first and login.</p>
                        </li>
                    </ul>
                </div>
            </b-step-item>
            <b-step-item
                label="Track Progress"
                :displayed="true"
                class="container w-50"
            >
                <div class="mt-2">
                    <div class="img">
                        <img src="../assets/illustrations/track.svg" alt="Easy start">
                    </div>
                    <h2 class="title">Track progress</h2>
                    <div class="dropdown-divider"></div>
                    <p>Check the completed part of the paper and ask the writer to make changes where necessary. Chat online with the writer through our online chat bot.</p>
                    
                </div>
            </b-step-item>
            <b-step-item
                label="Receive Paper"
                :displayed="true"
                class="container w-50"
            >
                <div class="mt-2">
                    <div class="img">
                        <img src="../assets/illustrations/feedback.svg" alt="Easy start">
                    </div>
                    <h2 class="title">Project completion</h2>
                    <div class="dropdown-divider"></div>
                    <p>Leave the feedback when you are satisfied with your paper. You can ask for revision in case you are not satisfied.</p>
                    <p class="font-bold text-red mt-2">
                        Do not hesitate anymore! Place an order and have everything catered for you
                    </p>
                    <p>Our writing service is very cheap. we have a sweet taste in the market. We are here today and we were there.</p> <p>We know what student needs and we are ready to help you prosper with academic papers. With the studykale you can get original samples of what you want. Our professional writers can create any form of academic writing. Let’s do it for you.</p>
                </div>
            </b-step-item>
        </b-steps>
      </div>
  </Layout>
</template>

<script>
import Layout from "./Default.vue";

export default {
    components: {
        Layout
    },
    data() {
        return {
            activeStep: 0,
        }
    },
    computed: {
        baseSteps() {
                return [
                    {
                        label: 'Creating a project',
                        content: 'To create a project. You need to login first. Or create a draft project from the draft window on the home page. After this sign up if you don`t have an account. Log in and you will find your draft project saved up ready to complete.',
                        displayed: true,
                    },
                    {
                        label: 'Select completion date',
                        content: 'Music: Lorem ipsum dolor sit amet.',
                        displayed: true,
                    },
                    {
                        label: 'Make Payment',
                        content: 'Videos: Lorem ipsum dolor sit amet.',
                        displayed: true,
                    }
                ]
            },
            steps() {
                const steps = [...this.baseSteps]
                return steps
            },
    }
}
</script>

<style lang="scss" scoped>

.w-50.container {
    width: 60% !important;

    @media screen and (max-width: 520px) {
        width: 100% !important;
        padding: 1em;
    }

    ul {
        list-style-type: disc;
        margin-top: 12px;

        li {
        line-height: 1.7;
            margin-bottom: 15px;
        }
    }

    .img {
        height: 350px;
        display: flex;
        justify-content: center;

        img {
            height: inherit;
            margin: auto;
        }
    }
}

</style>