<template>
  <div class="p-2">
      <h3 class="title">Payments</h3>
      <div class="dropdown-divider">
      </div>
      <div class="card">
        <div class="card-header">
          <h2 class="card-header-title">
            User payments..
          </h2>
        </div>
        <div class="card-content">
          <p class="text-center">
            No payment info yet.
          </p>
        </div>
      </div>
  </div>
</template>

<script>
import { users } from '../../../../db'

export default {
  data() {
    return {
      payments: [],
      users: []
    }
  },
  created() {
    this.$bind('users', users).then(u => {
      
      u.forEach(user => {
        users.doc(user.id).collection('payments')
        .get()
        .then(results => {
          if(!results.empty) {
            results.forEach(r => {
              this.payments.push(r)
            })
          }
        })
        .catch(error => {
          this.$buefy.toast.open('Sorry we failed to fetch payment for user '+error.message)
        })
      })
    })
  }
}
</script>

<style lang="scss" scoped>  
  .card {
    width: 90%;
    margin: 2em auto;
  }

</style>