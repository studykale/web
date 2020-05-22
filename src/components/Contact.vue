<template>
  <div>
      <form @submit.prevent="sendContactInfo">
        <b-field label="Email" :type="{ 'is-danger': emailErrors.length > 0 }">
            <b-input 
            name="email" 
            @blur="$v.email.$touch()" 
            v-model="email" 
            placeholder="your@email.com" 
            expanded 
            type="email"></b-input>
        </b-field>

       <b-field 
       label="Subject" 
       :type="{ 'is-danger': subjectErrors.length > 0 }"
            :message="subjectErrors">
            <b-input 
            name="subject" 
            @blur="$v.subject.$touch()" 
            v-model="subject" 
            placeholder="My Subject" 
            expanded 
            minLength="5" 
            maxlength="20"></b-input>
        </b-field>

        <b-field  
        :type="{ 'is-danger': messageErrors.length > 0 }" 
        :message="messageErrors" 
        label="Message">
            <b-input 
            placeholder="My Message" 
            @blur="$v.message.$touch()" 
            v-model="message" 
            type="textarea"></b-input>
        </b-field>

        <b-field><!-- Label left empty for spacing -->
            <p class="control">
                <button :disabled="submitStatus == 'ERROR'" type="submit" class="button is-primary">
                  Send message
                </button>
            </p>
        </b-field>
      </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
const { required, email, maxLength } = require('vuelidate/lib/validators');
import { SnackbarProgrammatic as Snackbar } from 'buefy'
import db from "../db"

export default {
    name: 'Contact',
    mixins: [validationMixin],
    data() {
        return {
            email: "",
            subject: "",
            message: "",
            submitStatus: false
        }
    },
    validations: {
        email: {
            required,
            email
        }, 
        subject: {
            required,
            max: maxLength(50)
        },
        message: {
            required,
            min: maxLength(150)
        }
    },
    methods: {
        sendContactInfo() {
            this.$v.$touch();
            if(this.$v.$invalid) {
                this.submitStatus = "ERROR"
            } else  {
                this.submitStatus = "OK";

                db.collection('contactus').add({ message: this.message, email: this.email, subject: this.subject });

                Snackbar.open({
                    position: 'is-top-right',
                    type: 'is-success',
                    duration: 3000,
                    message: "Thank you for the message"
                })

                this.$v.$reset();
                 this.email = "";
                 this.subject = "";
                 this.message = "";
            }
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
        },
        subjectErrors () {
            const errors = [];
            if(!this.$v.subject.$dirty) {
                return errors;
            } else if(!this.$v.subject.required) {
                errors.push("A subject is required please...")
            } else if (!this.$v.subject.max) {
                errors.push("Please shorten your subject. Its too long.")
            } 

            return errors
        },
        messageErrors () {
            const errors = [];
            if(!this.$v.message.$dirty) {
                return errors;
            } else if(!this.$v.message.required) {
                errors.push("A message is required please...")
            } else if (!this.$v.message.min) {
                errors.push("Please shorten your message. Its too long.")
            } 

            return errors
        },
    }
}
</script>

<style scoped>
    
</style>