<template>
  <div class="bg-light h-100 p-2">
   <!-- <Nav/> -->
    <div class="container">
      <h2 class="title">
        Settings
      </h2>
      <div class="card w-100">
        <div class="card-header">
          <div class="card-header-title">
            Update Email
          </div>
        </div>
        <div class="card-content">
          <form>
            <b-field horizontal label="Email">
              <b-input placeholder="Your email" name="email" type="email" expanded></b-input>
            </b-field>
            <button class="button is-success mr-a" type="submit">Save</button>
          </form>
        </div>
      </div>
      <div class="card w-100">
        <div class="card-header">
          <div class="card-header-title">
           Update password
          </div>
        </div>
        <div class="card-content">
          <form>
            <b-field horizontal label="Password">
              <b-input placeholder="Your new password" name="password" type="password" expanded></b-input>
            </b-field>
            <b-field horizontal label="Confirm Password" >
              <b-input placeholder="Your new password" name="password" type="password" expanded></b-input>
            </b-field>
            <button class="button is-success id-fullwidth" type="submit">Save</button>
          </form>
        </div>
      </div>

      <div class="card w-100">
        <div class="card__header">
          <h2>
            Delete Account
          </h2>
        </div>
        <div class="card-content">
          <p>Please not that this action is irrevocable once done</p>
          <b-button type="is-danger">
            Delete my Account
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import PaymentBtn from "@/components/Dashboard/Payment";
// import Nav from "@/components/Dashboard/DashNav";

export default {
    components: {
      // PaymentBtn,
      // Nav
    }
}
</script>

<style lang="scss" scoped>
    .card.w-100 {
      width: 80%;
      border-radius: 5px;
      margin-top: 2em;

      .card-content {
        display: flow-root;
      }

      .card-content button {
        float: right;
      }

      @media screen and (max-width: 520px) {
        width: 100%;
      }
    }

    .card__header h2 {
      color: white !important;
    }

    .mr-a {
      margin-right: auto;
    }
</style>