<template>
  <div>
      <div class="m-2">
        <h2 class="title">
            Notifications
        </h2>
        <p>Get notified of projects and updates here</p>
      </div>
      <div class="Notifications m-2">
        <div v-if="notifications.length > 0">
          <p>Notifications</p>
        </div>
        <div v-else>
          <div class="flex flex-column justify-center items-center">
              <div class="no-notifications">
                  <img src="../../../../assets/illustrations/results.svg" alt="">
              </div>
              <div class="dropdown-divider w-50"></div>
            <h2 >You don't have any notifications yet. You can still create a task</h2>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { notifications } from '../../../../db';

export default {
  data() {
    return {
      notifications: []
    }
  },
  created() {
    this.$bind('notifications', notifications.where('rvr' == null))
  }
}
</script>

<style lang="scss" scoped>
.m-2 {
    @media screen and (min-width: 450px) {
        margin: 1em;
    }
    margin: .25em;
}
 .Notications {
        margin-top: 1em;
    }

    .no-notifications {
        margin-top: 2em;
        img {
            height: 300px;
            width: 300px;
        }
    }
    .pl-2 {
        padding-left: 25px;
    }
</style>