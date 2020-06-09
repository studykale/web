<template>
  <div class="flex justify-center items-center h-100">
      <div class="no-drop">
        <div class="card">
            <div v-if="emailSent == true" class="card__header">
                <h3 class="subtitle text-white">
                    Email Sent.
                </h3>
                <p class="text-white">We will send an email with a link on how to change your password</p>
            </div>
            <b-message v-else-if="emailNotFound == true" label="No account found" type="is-info">
                No account was not found by that email...
            </b-message>
            <b-message  v-else>
                An email will be sent if an account exists.
            </b-message>
            <div class="card__content">
                <form @submit.prevent="sendPassChangeRequest">
                    <b-field label="Email">
                        <b-input v-model="email" placeholder="your@email.com" type="email"></b-input>
                    </b-field>
                    <button class="button is-danger is-fullwidth" :class="{ submitting : 'is-loading' }" type="submit">
                        Send
                    </button>
                </form>
            </div>
            <div class="card-footer py-2">
                <router-link to="signup" class="text-purple">Sign Up instead?</router-link>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import { auth } from '../db'

export default {
    data() {
        return {
            email: "",
            emailSent: false,
            emailNotFound: false,
            submitting: false
        }
    },
    methods: {
        sendPassChangeRequest() {
            this.submitting = true;
            auth.sendPasswordResetEmail(this.email)
            .then(() => {
                this.email = "";
                this.submitting = false;
                this.emailSent = true;
                //("sent")
            })
            .catch(error => {
                this.email = ""
                this.submitting = false;
                if(error.code == "auth/user-not-found") {
                    this.emailNotFound = true
                }

                //("error", error);
                //("error", error)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .card {
        width: auto;
        max-width: 290px;
    }
</style>