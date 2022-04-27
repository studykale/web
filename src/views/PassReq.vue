<template>
  <div class="flex justify-center items-center h-100">
      <div class="no-drop">
        <div class="card">
            <div class="card__header">
                <h3 class="subtitle text-white">
                    Change password
                </h3>
                <p class="text-white">We will send an email with a link on how to change your password</p>
            </div>
            <div class="card__content">
                <form @submit.prevent="passReq">
                    <b-field label="Email">
                        <b-input placeholder="your@email.com" type="email"></b-input>
                    </b-field>
                    <b-button class="is-danger" type="submit">
                        Send
                    </b-button>
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
export default {

}
</script>

<style lang="scss" scoped>
    .card {
        width: auto;
        max-width: 290px;
    }
</style>