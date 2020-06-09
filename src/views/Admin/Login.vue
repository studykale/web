<template>
  <div class="h-100 bg-light">
      <div class="flex flex-column justify-center items-center p-2">
          <div class="mt-2 mb-2 text-center">
              <h2 class="title"><span class="text-red">StudyKale</span>.com</h2>
          </div>
          <div class="nodrop mt-2">
            <div class="card">
                <div v-if="submitStatus !== 'ERROR'" class="card-header">
                    <b-message title="For official Use" type="is-info" v-bind:closable="false">
                        Please don't sign in if you are not an authorized.
                    </b-message>
                </div>
                <div v-else>
                    <b-message title="Error" type="is-info" v-bind:closable="false">
                        Please check the credentials you used...
                    </b-message>
                </div>
                <div class="card-content">
                    <form @submit.prevent="createAdminUser">
                        <b-field label="Username"
                            :type="{ 'is-danger': usernameErrors.length > 0 }"
                            :message="usernameErrors"
                        >
                            <b-input v-model.trim="$v.username.$model" placeholder="john doe" maxlength="30"></b-input>
                        </b-field>
                         <b-field
                            label="Email"
                            :type="{ 'is-danger': emailErrors.length > 0 }"
                        >
                            <b-input
                                type="email"
                                placeholder="Your email"
                                required
                                v-model.trim="$v.email.$model"
                                >
                            </b-input>
                        </b-field>

                        <b-field label="Password" 
                            :type="{ 'is-danger': passwordErrors.length > 0 }"
                            :message="passwordErrors">
                            <b-input
                                type="password"
                                password-reveal
                                placeholder="Your password"
                                v-model.trim="$v.password.$model"
                                
                                required>
                            </b-input>
                        </b-field>
                        <button 
                            :disabled="submitStatus === 'PENDING'" 
                            :class="{ 'is-loading': creatingUser == true }" 
                            class="button is-fullwidth  is-info" 
                            type="submit">Continue</button>
                    </form>
                    <p class="text-center mt-2">
                        You can go <router-link class="" to="/">back</router-link>
                    </p>
                    <b-button tag="router-link"
                        outlined
                        :to="{ path: '/auth/signin', query: { admin: 'true', key: 'secret' }}"
                        type="is-link">
                        Login
                    </b-button>
                </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { validationMixin } from 'vuelidate';
const { required, minLength, email, maxLength } = require('vuelidate/lib/validators');

export default {
    mixins: [validationMixin],
    data() {
        return {
            username: '',
            email: '',
            password: '',
            submitStatus: null
        }
    },
    validations: {
        username: {
            required,
            min: minLength(3),
            max: maxLength(30)
        },
        email: {
            required,
            email
        },
        password: {
            required,
            min: minLength(8)
        }
    },
    methods: {
        ...mapActions('user', ['createAdminAccount']),
        createAdminUser() {
            let data = {
                username: this.username,
                email: this.email,
                password: this.password
            }         
            this.$v.$touch();
            if(this.$v.$invalid) {
                this.submitStatus = 'ERROR'
            } else {
                this.submitStatus = 'OKAY';
                this.submitStatus = 'PENDING';
                this.createAdminAccount(data);
                this.email = "";
                this.password = "";
                this.username = "";
                this.submitStatus = null;
                this.$v.$reset()
            }   
        }
    },
    computed: {
        ...mapState({
            creatingUser: state => state.user.status.signingup
        }),
        usernameErrors() {
            const errors = [];
            if(!this.$v.username.$dirty) {
                return errors;
            } 
             if(!this.$v.username.min) {
                errors.push("Please enter a valid username.")
            } else if(!this.$v.username.max) {
                errors.push('username is required')
            } else if(!this.$v.username.required) {
                errors.push('Username is required')
            }

            return errors;
        },
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
        passwordErrors () {
            const errors = [];
            if(!this.$v.password.$dirty) {
                return errors
            }
            if(!this.$v.password.required) {
            errors.push('A password is required...')
            }

            if(!this.$v.password.min) {
            errors.push("Please enter a minimum of 7 characters")
            }
            return errors
        }
    }
}
</script>

<style lang="scss" scoped>
    .text-red {
        color: #3F0B81;
    }

    
</style>