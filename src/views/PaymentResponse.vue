<template>
  <div class="h-100">
      <div class="flex items-center flex-column">
          <div v-if="$route.params.type != 'cancelled' || $route.query.PayRef">
            <div class="paymentImg">
                <img src="@/assets/images/success.png" alt="Payment Image">
            </div>
            <div>
                <h2 class=" my-1 text-center font-bold">
                    Your payment was successful...
                </h2>
                <div class="dropdown-divider mx-a"></div>
                <p class="text-clip text-center w-50">We have received your payment and the project will begin immediately</p>
            </div>
          </div>
          <div v-else>
              <div class="paymentImg">
                <img src="@/assets/images/payment-fail.svg" alt="Payment Image">
            </div>
            <div>
                <h2 class=" my-1 text-center font-bold">
                    Your payment was not successful...
                </h2>
                <div class="dropdown-divider mx-a"></div>
                <p class="text-clip text-center w-50">Don't worry we can still start the project. In dashboard view check the project details to make the payment...</p>
            </div>
          </div>
        <div v-if="updatingProject">
            <b-button :class="{ 'is-loading': updatingProject }" :disabled="updatingProject" class="mx-auto my-1">Please wait a moment</b-button>
        </div>
        <div v-else>
            <router-link to="/dashboard/projects" class="button is-outlined">Go to dashboard</router-link>
        </div>
      </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    data() {
        return  {
            ref: '',
            projectId: '',
            response: ''
        }
    },
    methods: {
        ...mapActions('projects', ['updateProjects']),
        setId() {
            this.projectId = this.$route.params.projectId
            this.ref = this.$route.query.PayRef;
        }
    },
    computed: {
        ...mapState({
            updatingProject: state => state.projects.updatingProject
        })
    },
    created() {
        this.setId()
        this.updateProjects({ pid: this.projectId, paymentUpdate: true, ref: this.ref })
    }
}
</script>

<style lang="scss" scoped>
    .my-2 {
        margin: 2em 0;
    } 

    .paymentImg {
        padding: 20px;
        display: flex;
        justify-content: center;

        img {
            height: 45vh;
        }
    }

    .my-1 {
        margin: 1em 0;
    }

    .text-clip {
        text-overflow: clip;
    }

    .w-50 {
        width: 80%;
        margin: auto;

        @media screen and (min-width: 680px) {
            width: 60%;
        }
    }

    .mx-a {
        margin-left: auto;
        margin-right: auto;
        width: 25%;
    }
</style>