<template>
    <div class="card">
        <div class="card-header">
            <div class="card-header-title">
                Hi, How would you rate our services?
            </div>
        </div>

        <form @submit.prevent="addReview">

            <div class="card-content">
                <b-field label="Your rate">
                    <b-rate
                        v-model="rate"
                        :icon-pack="packs"
                        :icon="icons"
                        :max="maxs"
                        :show-score="score"
                    >
                     </b-rate>
                </b-field>
            <b-field label="Message"
                >
                <b-input 
                validation-message="Please add a descriptive message to help us improve your experience..."
                required 
                minLength="5" 
                placeholder="What's your say?.." 
                v-model="message"
                 maxlength="800" 
                 type="textarea"></b-input>
            </b-field>
            <div class="flex">
                <button class="button is-primary is-extended" type="submit">Submit</button>
                <b-button class="ml-2" @click="closeReview" type="is-danger">Close</b-button>
            </div>
            </div>
        </form>
    </div>
</template>

<script>
import { currentUser, reviews, notifications, Timestamp } from '../db';

export default {
    data() {
        return {
            rate: 0,
            message: "",
            icons: 'star',
            packs: 'fas',
            maxs: 5,
            score: true
        }
    },
    methods: {
        addReview() {
            let r  = reviews.doc(currentUser.uid)
            r.set({
                name: currentUser.displayName,
                profile: currentUser.photoURL || null,
                rate: this.rate,
                message: this.message
            })

            let n = notifications.doc(this.tempId(5))

            n.set({
                name: 'Site review',
                description: "A site review has been made..",
                time: Timestamp.now(),
                read: false
            })

            this.$buefy.toast.open({
                  message: 'Thanks alot we will update...',
                  queue: false
            })
            this.message = ""
            this.closeReview()
        },
        closeReview() {
            this.$root.$emit('closeReview', { open: true })
        },
        tempId(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
    }
}
</script>

<style>

</style>