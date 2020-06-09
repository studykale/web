<template>
  <div class="h-100 flex justify-center flex-column mx-auto content-center w-50">
      <div class="mt-2 mx-a">
          <img src="@/assets/images/pic2.png"  alt="Payment request pic" class="object-fit  h-48 w-48">
      </div>
      <div class="mt-3">
            <h3 class="leading-loose text-center">
                Just one last step
            </h3>
            <div class="dropdown-divider w-50 mx-a"></div>
            <p class="mb-2 text-center">You have completed your project you can now complete payment</p>
            <div class="pay">
                <PayBtn :projectId="projectId" :paymentAmount="amount"/>
            </div>
      </div>
  </div>
</template>

<script>
import PayBtn from "@/components/Dashboard/Payment";

export default {
    
    name: 'pay',
    components: {
        PayBtn
    },
    data() {
        return {
            projectId: this.$route.params.pid,
            amount: parseInt(this.$route.params.payAmount)
        }
    }
}
</script>

<style lang="scss" scoped>
    .object-fit {
        object-fit: contain;
        object-position: center;
    }

    .mx-a {
        margin: 0 auto;
    }

    .w-50 {
        width: 80%;
        @media screen and (min-width: 480px) {
            width: 60%;
        }
    }

    .pay div:first-of-type {
        width: 50%;
        margin: 0 auto;
        
        @media screen and (min-width: 680px) {
            width: 25%;
        }
    }
</style>