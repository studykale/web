<template>

      <div class="card">
          <div class="card-content">
              <form @submit.prevent="loginUser">
                    
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

                            <router-link to="/auth/password-change-req" class="text-left text-purple d-block">Forgot Password</router-link>
                            <button 
                                :disabled="submitStatus === 'ERROR'" 
                                :loading="submitStatus === 'PENDING'"
                                class="button is-primary" type="submit">Login</button>
                        
                 
                </form>
          </div>
          <div class="card-footer">                         
            <p>Don't have an Account?
                <span>
                    <router-link to="/auth/signup">Sign Up</router-link>
                </span>
            </p>
        </div>
      </div>

</template>

<script>
import { mapActions } from "vuex";
import { validationMixin } from 'vuelidate';
const { required, minLength, email } = require('vuelidate/lib/validators');

export default {
    name: 'SignInCard',
    mixins: [validationMixin],
    props: {
        shadow: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            email: '',
            password: '',
            submitStatus: "NULL"
        }
    },
    validations: {
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
        ...mapActions('user', ['login']),
        loginUser () {
            let data = {
                email: this.email,
                password: this.password
            };
            this.$v.$touch();
            if(this.$v.$invalid) {
                this.submitStatus = "ERROR"
            } else {
                this.submitStatus = "PENDING";
                setTimeout(() => {
                    this.submitStatus = "OKAY"
                    this.login(data)
                    this.email = this.password = this.confirmation = "";
                    this.$v.$reset()
                }, 2000)
                
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
    .card {
        border: none;
        width: auto;
        min-width: 290px;

        form {
            .text-purple {
                margin: 0 0 1em;
            }
        }
        .card-footer {
            padding: .85em;
            text-align: center;
        }
    }
</style>