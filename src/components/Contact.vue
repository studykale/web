<template>
  <div>
        <b-field label="Email">
            <b-input name="subject" placeholder="your@email.com" expanded type="email"></b-input>
        </b-field>

       <b-field label="Subject">
            <b-input name="subject" placeholder="My Subject" expanded minLength="5" maxlength="50"></b-input>
        </b-field>

        <b-field  label="Message">
            <b-input placeholder="My Message" type="textarea"></b-input>
        </b-field>

        <b-field><!-- Label left empty for spacing -->
            <p class="control">
                <button class="button is-primary">
                  Send message
                </button>
            </p>
        </b-field>
  </div>
</template>

<script>
export default {
    name: 'Contact'
}
</script>

<style scoped>
    
</style>