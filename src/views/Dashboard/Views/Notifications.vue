<template>
  <div>
      <div>
        <h2 class="title">
            Notifications
        </h2>
        <p>Get notified of your project here</p>
      </div>
      <div class="Notifications">
          <NotifyCard/>
          <NotifyCard/>
          <NotifyCard/>
      </div>
  </div>
</template>

<script>
import NotifyCard from "@/components/NotificationCard.vue";

export default {
    components: {
        NotifyCard
    }
}
</script>

<style lang="scss" scoped>
 .Notications {
        margin-top: 1em;
    }
</style>