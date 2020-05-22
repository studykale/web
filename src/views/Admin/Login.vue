<template>
  <div class="h-100 bg-light">
      <div class="flex flex-column justify-center items-center p-2">
          <div class="mt-2 mb-2 text-center">
              <h2 class="title"><span class="text-red">StudyKale</span>.com</h2>
          </div>
          <div class="nodrop mt-2">
            <div class="card">
                <div class="card-header">
                    <b-message title="For official Use" type="is-info" v-bind:closable="false">
                        Please don't sign in if you are not an authorized.
                    </b-message>

                </div>
                <div class="card-content">
                    <form>
                        <b-field label="Username">
                            <b-input placeholder="john doe" maxlength="30"></b-input>
                        </b-field>
                        <b-field label="Email">
                            <b-input type="email"
                                placeholder="your@email.com"
                                maxlength="30">
                            </b-input>
                        </b-field>

                        <b-field label="Password"
                            >
                            <b-input placeholder="your password" type="password" maxlength="30" password-reveal></b-input>
                        </b-field>
                        <button class="button is-fullwidth  is-info" type="submit">Sign In</button>
                    </form>
                    <p class="text-center mt-2">
                        You can go <router-link class="" to="/">back</router-link>
                    </p>
                </div>
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
    .text-red {
        color: #3F0B81;
    }

    
</style>