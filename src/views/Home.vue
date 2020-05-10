<template>
    <section class="hero home">
  <!-- Hero head: will stick at the top -->
    <Navbar/>

        <!-- Hero content: will be in the middle -->
    <div class="hero-body">
        <div class="container flex justify-around flex-wrap flex-row">
            <div class="has-text-left content">
                <h1 class="title font-bold">
                    Build your grades, Save time, with our essay service.
                </h1>
                <h4 class="subtitle">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos quis cum aliquid, ipsam tempora enim facere.
                </h4>
                <div class="buttons">
                    <b-button 
                        tag="router-link"
                        to="/auth/signup"
                        type="is-primary" 
                        rounded
                        size="is-medium">
                        Get Started
                </b-button>
                
            </div>
            </div>
                <OrderCard/>
            </div>
    </div>
    </section>
</template>

<script>
    import Navbar from "@/components/Navbar.vue";
    import OrderCard from "@/components/OrderCard.vue";

    export default {
        components: {
            Navbar,
            OrderCard
        }
    }
</script>

<style lang="scss" scoped>
.home {
    background: url('../assets/images/students-laptop.jpg');
    background-position: center;
    background-size: cover;

    position: relative;

    .hero-body {
        z-index: 9;
    }

    &::before {
        position: absolute;
        height: 100%;
        width: 100%;
        
        content: "";
        top: 0;
        left: 0;
        background: linear-gradient(to top right, rgba(205, 159, 252, 0.87), rgba(114, 103, 240, 0.849));
    }
}

.hero-body {
    .content {
        width: 50%;

        @media only screen and (max-width: 768px) {
            width: 100%;

            .title, .subtitle {

            text-align: center;
            }
        }
    }
    .title, .subtitle {
        color: white;
        line-height: 1.8;
    }

    .title {
        font-weight: 800;

        @media  (max-width: 480px) {
            text-align: center;
        }
    }

    .buttons {
        @media only screen and (max-width: 480px) {
            display: flex;
            justify-content: center;
        }
    }
}
</style>