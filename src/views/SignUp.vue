<template>
  <div class="h-100">
    <div class="p-2">
      <div>
        <div class="text-center logo flex leading-snug justify-center">
          <span>
            <h5 class="title">
              Study
            </h5>
          </span>
          <span>
            <h2 class="text-purple font-bold">
              Kale
            </h2>
          </span>
        </div>
        <div class="flex justify-center">
          <SignUpCard/>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>

import SignUpCard from "@/components/SignUp.vue"
import Footer from "@/components/Footer.vue";

export default {
  components: {
    SignUpCard,
    Footer
  }
}
</script>

<style scoped>
  .p-2 {
    padding: 1em;
  }


  .logo {
    padding: 2em;
  }
</style>