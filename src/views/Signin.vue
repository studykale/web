<template>
  <div class="h-100 flex justify-content items-center">
  <div class="p-2 mx-auto">
    <div>
      <div class="text-center logo flex leading-snug justify-center">
        <span>
          <h5 class="title">
            Study
          </h5>
        </span>
        <span>
          <h2 class="text-purple font-bold">
            Works
          </h2>
        </span>
      </div>
      <div class="flex justify-center">
            <SignInCard/>
    </div>
    </div>
  </div>
  </div>
</template>

<script>
import SignInCard from "@/components/SignIn.vue";

export default {
    components: {
        SignInCard
    }
}
</script>

<style scoped>
    .logo {
        padding: 2em;
    }

    
</style>