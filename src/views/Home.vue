<template>
    <section class="hero is-medium home">
  <!-- Hero head: will stick at the top -->
    <Navbar/>

        <!-- Hero content: will be in the middle -->
    <div class="hero-body">
        <div class="container has-text-left">
        <h1 class="title font-bold">
            Title
        </h1>
        <h2 class="subtitle">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos quis cum aliquid, ipsam tempora enim facere totam aliquam laudantium quibusdam ut magnam culpa molestias. Voluptatibus quibusdam expedita veritatis fugit commodi!
        </h2>
        <div class="buttons">
            <b-button tag="router-link"
                to="/pricing"
                type="is-primary" 
                rounded
                size="is-medium">
                Pricing
        </b-button>
        <b-button tag="router-link"
                to="/auth/signup"
                type="is-primary"
                outlined
                size="is-medium"
                rounded>
                Sign Up
        </b-button>
        </div>
        
        </div>
    </div>


    </section>
</template>

<script>
    import Navbar from "@/components/Navbar.vue";

    export default {
        components: {
            Navbar
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

    .subtitle {
        width: 50%;
        text-overflow: ellipsis;

        @media (max-width: 768px) {
            width: 75%;
        }

        @media (max-width: 480px) {
            width: 100%;
            text-align: center;
        }
    }
}
</style>