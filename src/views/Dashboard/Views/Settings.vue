<template>
  <div class="bg-light h-100 p-2">
   <!-- <Nav/> -->
    <div class="container">
      <h2 class="title">
        Settings
      </h2>
      <div class="card w-100">
        <div class="card-header">
          <div class="card-header-title">
            Update Email
          </div>
        </div>
        <div class="card-content">
          <form @submit.prevent="updateUserEmail">
            <b-field 
            :type="{ 'is-danger': newEmailErrors.length > 0 }"
            horizontal 
            :message="newEmailErrors"
            label="Email">
              <b-input v-model="$v.newEmail.$model" placeholder="Your email" name="email" type="email" expanded></b-input>
            </b-field>
            <button class="button is-success mr-a" type="submit">Save</button>
          </form>
        </div>
      </div>
      <div class="card w-100">
        <div class="card-header">
          <div class="card-header-title">
           Update password
          </div>
        </div>
        <div class="card-content">
          <form @submit.prevent="updateUserPassword">
            <b-field 
            :message="newPasswordErrors"
            :type="{ 'is-danger': newPasswordErrors.length > 0 }"
            horizontal 
            label="Password">
              <b-input v-model="$v.newPassword.$model" placeholder="Your new password" name="password" type="password" expanded password-reveal></b-input>
            </b-field>
            <b-field
              :message="confirmPasswordErrors"
              :type="{ 'is-danger': confirmPasswordErrors.length > 0 }"
             horizontal label="Confirm Password" >
              <b-input v-model="$v.confirmPassword.$model" placeholder="Your new password" name="password" type="password" expanded password-reveal></b-input>
            </b-field>
            <button :disabled="passwordSubmitStatus === 'ERROR'" :class="{ 'is-loading': updatingPassword }"  class="button is-success id-fullwidth" type="submit">Save</button>
          </form>
        </div>
      </div>
      <div class="card w-100">
        <div class="card__header">
          <h2>
            Delete Account
          </h2>
        </div>
        <div class="card-content">
          <p>Please not that this action is irrevocable once done</p>
          <b-button type="is-danger">
            Delete my Account
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import PaymentBtn from "@/components/Dashboard/Payment";
// import Nav from "@/components/Dashboard/DashNav";\
const { required, sameAs, minLength, email } =  require('vuelidate/lib/validators');
import { validationMixin } from 'vuelidate'
import { mapActions, mapState } from "vuex"

export default {
    mixins: [validationMixin],
    data() {
      return {
        newPassword: "",
        confirmPassword: "",
        newEmail: "",
        passwordSubmitStatus : null,
        emailSubmitStatus : null,
      }
    },
    validations: {
      newEmail: {
        email,
        required
      },
      newPassword: {
        required,
        minLength: minLength(6)
      },
      confirmPassword: {
        required,
        same: sameAs('newPassword')
      }
    },
    methods: {
      ...mapActions('user', ['updateUserProfile']),
      updateUserEmail() {
        let data = {
          newEmail: this.newEmail,
          type: 'email'
        }
        this.$v.newEmail.$dirty = true;

        if(this.$v.$invalid) {
          this.emailSubmitStatus = "ERROR"
        } else {
          this.emailSubmitStatus =  "OKAY";
          this.emailSubmitStatus = "PENDING";

          this.updateUserProfile(data)
          this.newEmail = "";
          this.emailSubmitStatus = null
        }
      },
      updateUserPassword() {
        let data  = {
          type: 'password',
          password:  this.newPassword
        }
        
        if(this.$v.newPassword.$invalid || this.$v.confirmPassword.$invalid) {
          this.passwordSubmitStatus = "ERROR"
        } else {
          this.passwordSubmitStatus = "PENDING"
          this.updateUserProfile(data)
          this.confirmPassword = "";
          this.newPassword = "";
          this.passwordSubmitStatus = null;
        }
      }
    },
    computed: {
      ...mapState({
        updatingPassword: state => state.user.status.updatingPassword,
        updatingEmail : state =>  state.user.status.updatingEmail
      }),
      newEmailErrors() {
        const errors = [];
        if(!this.$v.newEmail.$dirty) {
          return errors
        }
        if(!this.$v.newEmail.required) errors.push("An replace email is required");
        if(!this.$v.newEmail.email) errors.push("A valid email is required.");

        return errors

      },
      newPasswordErrors() {
        const errors = [];
        if(!this.$v.newPassword.$dirty) {
          return errors
        }
        if(!this.$v.newPassword.required) {
          errors.push("Please enter the password to change to")
        }
        if(!this.$v.newPassword.minLength) {
          errors.push("The password needs have a minimum of six characters")
        }

        return errors
      },
      confirmPasswordErrors() {
        const errors = [];
        if(!this.$v.confirmPassword.$dirty) {
          return errors
        }
        if(!this.$v.confirmPassword.required) {
          errors.push('Please enter the confirmation password.')
        }
        if(!this.$v.confirmPassword.same) {
          errors.push("The passwords must be identical")
        }
        return errors
      }
    }
}
</script>

<style lang="scss" scoped>
    .card.w-100 {
      width: 80%;
      border-radius: 5px;
      margin-top: 2em;

      .card-content {
        display: flow-root;
      }

      .card-content button {
        float: right;
      }

      @media screen and (max-width: 520px) {
        width: 100%;
      }
    }

    .card__header h2 {
      color: white !important;
    }

    .mr-a {
      margin-right: auto;
    }
</style>