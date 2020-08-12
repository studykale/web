<template>
  <div class="p-2">
      <h3 class="title">Payments</h3>
      <div class="dropdown-divider">
      </div>
      <div v-if="payments.length <= 0" class="card">
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
      <div v-else>
        <div class="card">
          <div class="card-header">
            <h2 class="card-header-title">Payment Info</h2>
          </div>
          <div class="card-content">
            <b-table :data="payments" :columns="columns"></b-table>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { payments } from '../../../../db'

export default {
  data() {
    return {
      payments: [],
      columns: [
        {
          field: "amount",
          label: "Amount",
        },
        {
          field: "summary",
          label: "Summary"
        },
        {
          field: "payment.fee.value",
          label: "Fee",
          numeric: true
        },
        {
          field: "payment_time",
          label: "Date"
        },
        {
          field: "payment.status",
          label: "Status"
        },
        {
          field: "payment.received_after_deduction.value",
          label: "Received"
        },
        {
          field: "payment.received_after_deduction.currency_code",
          label: "Currency"
        }
      ]
    }
  },
  created() {
    this.$bind('payments', payments).then(p => {
      console.log("p", p);
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