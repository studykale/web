<template>
  <div>
       <Rave
       :is-production="true"
            style-class="paymentbtn"
            :email="loggedInUser.email"
            :amount="paymentAmount"
            :reference="projectId ? projectId : reference"
            :rave-key="raveKey"
            :callback="callback"
            :close="close"
            :redirectUrl="redirect"
            :paymentPlan="plan"
            :customerFirstname="loggedInUser.username"
            :customerLastname="loggedInUser.email.split('@')[0]"
            paymentOptions="card, barter, account, ussd, mpesa"
            :hostedPayment="hostedPayment"
            customTitle="Complete Payment"
            :currency="currency"
            :country="country"
            :metadata="meta"
        >
            <b-button class="flex" type="is-danger" expanded>
                <credit-card-icon size="1x" class="mr-2"></credit-card-icon>
                <span class="text-white">Pay ${{ paymentAmount }}</span>
            </b-button>
        </Rave>
  </div>
</template>

<script>
import Rave from 'vue-ravepayment';
import { CreditCardIcon } from 'vue-feather-icons'
import { mapState } from 'vuex';


export default {
    props:{
        projectId: String,
        paymentAmount: {
            type: Number,
            default: 50
        }
    },
    components: {
        Rave,
        CreditCardIcon
    },
    data () {
        const raveKey = process.env.VUE_APP_RAVE_KEY
        return {
            raveKey,
            customerEmail: this.loggedInUser.email,
            fname: this.loggedInUser.username,
            lname: this.loggedInUser.email.split("@")[0],
            currency: 'AUD',
            hostedPayment: 1,
            country: "KE",
            redirect: `https://us-central1-studykale-4466b.cloudfunctions.net/redirectToProject/${this.projectId}`
        }
    },
    computed: {
        ...mapState({
            loggedInUser: state => state.user.user
        }),
        reference(){
            let text = "";
            let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
            for( let i=0; i < 10; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
    
            return text;
        }
    },
    methods: {
        callback: function(response){
                var txref = response.data.txRef; // collect txRef returned and pass to a                    server page to complete status check.
                // //("This is the response returned after a charge", response);
                
                if (
                    response.data.chargeResponseCode == "00" ||
                    response.data.chargeResponseCode == "0"
                ) {
                    // redirect to a success page
                    this.$router.push(`/project-pay/${this.projectId}/successful?ref=${txref}`)
                } else {
                    // redirect to a failure page.
                    this.$router.push(`/project-pay/${this.projectId}/failed?ref=${txref}`)
                }
           },
        close: function(){
            this.$router.push('/dashboard/projects');
        }
    }
}
</script>

<style lang="scss" scoped>
.paymentbtn {
        border: none;
        background: none;
        display: flex;
        width: 100%;
    }
</style>