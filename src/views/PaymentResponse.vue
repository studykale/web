<template>
  <div class="h-100">
      <div class="flex justify-center">
          <h2 class="title text-red">
            Your payment was {{ type }}
          </h2>
          <b-button tag="router-link" type="is-link" to="/dashboard/projects/" extended>Continue home</b-button>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return  {
            type: ''
        }
    },
    methods: {
        getTextRef() {
            console.log("textRef",this.route.query.ref)
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.type = this.$route.params.type;
        })
    }
}
</script>

<style>

</style>