<template>
  
    <div class="card">
        <div class="card__header">
            <b-message size="is-small" type="is-warning" aria-close-label="Close message">
                Wrong email, password combination
            </b-message>
        </div>
        <div class="card-content">
            <b-field label="Username"
            >
                <b-input placeholder="john doe" maxlength="30"></b-input>
            </b-field>
            <b-field label="Email"
            >
                <b-input placeholder="your@email.com" type="email"></b-input>
            </b-field>
            <b-field label="Password"
            >
                <b-input placeholder="Your password" type="password" minLength="8" maxlength="16"></b-input>
            </b-field>
            <b-button class="is-success" type="submit" expanded>Sign Up</b-button>
        </div>
        <div class="links">
            <p>Already have an account? 
                <span>
                    <router-link to="/auth/signin">Sign In</router-link>
                </span>
            </p>
            <p>By Signing Up you agree to our <span class="terms">Terms and Conditions</span></p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            hasError: true
        }
    }
}
</script>

<style scoped>

    .card {
        border: none;
        border-radius: 0;
        box-shadow: none;
        display: inline-block;
    }


    .links {
        padding: .75em;
        text-align: center;
    }

    .terms {
        color: mediumpurple;
    }
</style>