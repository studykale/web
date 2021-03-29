<template>
  <div>
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
    </div>
    <div class="counter-height">
    <Footer/>
    </div>
  </div>
</template>

<script>

import SignUpCard from "@/components/SignUpCard.vue"
import Footer from "@/components/Footer.vue";

export default {
  components: {
    SignUpCard,
    Footer
  },
  created() {
    this.$crisp.do("chat:hide");
  }
}
</script>

<style scoped lang="scss">
  .p-2 {
    padding: 1em;
  }


  .logo {
    padding: 2em;
  }

  .counter-height {
    margin-top: -15vh;

    @media screen and (max-width: 520px) {
      margin-top: 1em;
    }
  }
</style>