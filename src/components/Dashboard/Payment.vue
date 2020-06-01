<template>
  <div>
       <Rave
        style-class="paymentbtn"
        :email="customerEmail"
        :amount="amount"
        :reference="reference"
        :rave-key="raveKey"
        :callback="callback"
        :close="close"
        :redirectUrl="redirect"
        :paymentPlan="plan"
        :customerFirstname="fname"
        :customerLastname="lname"
        paymentOptions="card,barter,account,ussd, mpesa"
        :hostedPayment="hostedPayment"
        customTitle="Complete Payment"
        :currency="currency"
        :country="country"
        >
            <b-button class="flex" type="is-danger">
                <credit-card-icon size="1x" class="mr-2"></credit-card-icon>
                <span class="text-white">Pay</span>
            </b-button>
        </Rave>
  </div>
</template>

<script>
import Rave from 'vue-ravepayment';
import { CreditCardIcon } from 'vue-feather-icons'

export default {
    components: {
        Rave,
        CreditCardIcon
    },
    data () {
        const raveKey = process.env.VUE_APP_RAVE_KEY
        return {
            raveKey,
            customerEmail: 'studykale@gmail.com',
            amount: 200,
            plan: 2928,
            fname: 'Brian',
            lname: 'Mwangi',
            redirect: 'https://google.com',
            currency: 'USD',
            hostedPayment: 1,
            country: "KE"
        }
    },
    computed: {
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
            console.log(response)
        },
        close: function(){
            console.log("Payment closed")
        }
    }
}
</script>

<style lang="scss" scoped>
.paymentbtn {
        border: none;
        background: none
    }
</style>