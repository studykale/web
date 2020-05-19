<template>
  <div>
      <form @submit.prevent="sendContactInfo">
        <b-field label="Email" :type="{ 'is-danger': emailErrors.length > 0 }">
            <b-input name="email" v-model.trim="$v.email.$model" placeholder="your@email.com" expanded type="email"></b-input>
        </b-field>

       <b-field label="Subject" :type="{ 'is-danger': hasSError }"
            :message="{ 'A subject is required': hasSError }">
            <b-input name="subject" placeholder="My Subject" expanded minLength="5" maxlength="50"></b-input>
        </b-field>

        <b-field  :type="{ 'is-danger': hasMError }"
            :message="{ 'Please enter your message': hasMError }" label="Message">
            <b-input placeholder="My Message" type="textarea"></b-input>
        </b-field>

        <b-field><!-- Label left empty for spacing -->
            <p class="control">
                <button type="submit" class="button is-primary">
                  Send message
                </button>
            </p>
        </b-field>
      </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
const { required, email } = require('vuelidate/lib/validators');
import { NotificationProgrammatic as Notification } from 'buefy'

export default {
    name: 'Contact',
    mixins: [validationMixin],
    data() {
        return {
            email: "",
            name: "",
            message: "",
            hasMError: false,
            hasSError: false
        }
    },
    validations: {
        email: {
            required,
            email
        }
    },
    methods: {
        sendContactInfo() {
            if(!this.subject) {
                this.hasSError = true
            }
            if(!this.message) {
                this.hasMError = true;
            }

            let data = {
                email: this.email,
                subject: this.subject,
                message: this.message
            }
            console.log("data", data)
            Notification.open({message: "Thank you we received your message.", type: "is-success"})

            this.hasSError = this.hasMError = false;
            this.subject = this.email = this.message = "";
        }
    },
    computed: {
        emailErrors () {
            const errors = [];
            if(!this.$v.email.$dirty) {
            return errors;
            } else if(!this.$v.email.email) {
            errors.push("Please enter a valid email address")
            } else if(!this.$v.email.required) {
            errors.push('Email is required')
            }

            return errors;
        }
    }
}
</script>

<style scoped>
    
</style>