<template>
  <div class="container">
      <section v-if="response == success">
        <button class="button block" @click="isActive = !isActive">Toggle</button>
        <b-message title="Success!!" type="success" :active.sync="isActive" aria-close-label="Close message">
            Project payment was successfull
            <b-button 
                tag="router-link"
                to="/dashboard"
                type="is-primary">
                Go back home
            </b-button>
        </b-message>
        </section>
        <section v-else>
             <button class="button block" @click="isActive = !isActive">Toggle</button>
            <b-message title="Failed!!" type="danger" :active.sync="isActive" aria-close-label="Close message">
                Project payment was successfull
                <b-button 
                tag="router-link"
                to="/dashboard"
                type="is-primary">
                Go back home
            </b-button>
            </b-message>
        </section>
  </div>
</template>

<script>
export default {
    data() {
        return {
            response: ""
        }
    },
    created() {
        this.response = this.$route.params.response
    }
}
</script>

<style>

</style>