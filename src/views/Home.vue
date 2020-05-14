<template>
    <div>

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
        <div class="container mt-5 mx-a w-90">
            <div>
                <h3 class="title">Our features</h3>
            </div>
            <div class="divider"></div>
            <div class="tile is-ancestor">
                <div class="tile is-4 is-vertical is-parent">
                    <div class="tile is-child box rocket">
                        <p class="title">Fast Response</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
                    </div>
                    <div class="tile is-child box plane">
                        <p class="title">Easy Use</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
                    </div>
                </div>
                <div class="tile is-parent ">
                    <div class="tile is-child box service">
                    <p class="title">Exceptional Deliveries and Content</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta orci, quis semper odio felis ut quam.</p>
                    <p>Suspendisse varius ligula in molestie lacinia. Maecenas varius eget ligula a sagittis. Pellentesque interdum, nisl nec interdum maximus, augue diam porttitor lorem, et sollicitudin felis neque sit amet erat. Maecenas imperdiet felis nisi, fringilla luctus felis hendrerit sit amet. Aenean vitae gravida diam, finibus dignissim turpis. Sed eget varius ligula, at volutpat tortor.</p>
                    <!-- <p>Integer sollicitudin, tortor a mattis commodo, velit urna rhoncus erat, vitae congue lectus dolor consequat libero. Donec leo ligula, maximus et pellentesque sed, gravida a metus. Cras ullamcorper a nunc ac porta. Aliquam ut aliquet lacus, quis faucibus libero. Quisque non semper leo.</p> -->
                    </div>
                </div>
                </div>
        </div>
        <div class="reviews">
            <h3 class="title">What people are saying?...</h3>
            <div class="divider bg-white"></div>

            <div class="flex flex-wrap flex-row justify-center">
                <div class="card">
                    <div class="card__header">
                        <div>
                            <div class="avatar">
                                <img src="https://source.unsplash.com/user/erondu" alt="User image">
                            </div>
                            <div class="user-details">
                                <h3>Maria Sanchex</h3>
                                <h5>University Of California</h5>
                            </div>
                        </div>
                        <div class="rating">
                            <b-rate v-model="rate1" icon-pack="fas" custom-text="4.6"></b-rate>
                        </div>
                    </div>
                    <div class="card-content">
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora rem beatae, eius quo temporibus quae cumque velit excepturi quis distinctio.</p>
                    </div>
                </div>

                <div class="card">
                    <div class="card__header">
                        <div>
                            <div class="avatar">
                                <img src="https://source.unsplash.com/user/erondu" alt="User image">
                            </div>
                            <div class="user-details">
                                <h3>Maria Sanchex</h3>
                                <h5>University Of California</h5>
                            </div>
                        </div>
                        <div class="rating">
                            <b-rate v-model="rate1" icon-pack="fas" custom-text="4.6"></b-rate>
                        </div>
                    </div>
                    <div class="card-content">
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora rem beatae, eius quo temporibus quae cumque velit excepturi quis distinctio.</p>
                    </div>
                </div>

                <div class="card">
                    <div class="card__header">
                        <div>
                            <div class="avatar">
                                <img src="https://source.unsplash.com/user/erondu" alt="User image">
                            </div>
                            <div class="user-details">
                                <h3>Maria Sanchex</h3>
                                <h5>University Of California</h5>
                            </div>
                        </div>
                        <div class="rating">
                            <b-rate v-model="rate1" icon-pack="fas" custom-text="4.6"></b-rate>
                        </div>
                    </div>
                    <div class="card-content">
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora rem beatae, eius quo temporibus quae cumque velit excepturi quis distinctio.</p>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script>
    import Navbar from "@/components/Navbar.vue";
    import OrderCard from "@/components/OrderCard.vue";
    import Footer from "@/components/Footer.vue";

    export default {
        components: {
            Navbar,
            OrderCard,
            Footer
        },
        data () {
            return {
                rate1: 4.6
            }
        }
    }
</script>

<style lang="scss" scoped>
.home {
    background: url('../assets/images/students-laptop.jpg');
    background-position: center;
    background-size: cover;

    position: relative;

    margin-bottom: 5em;

    .hero-body {
        z-index: 9;

        .title {
            line-height: 1.5;
            margin-bottom: 1.2em;
        }
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

.mt-5 {
    margin-top: 2.5em;
}

.mx-3 {
    margin: 0 1.5em;
}

.divider {
    height: 4px;
    width: 100%;
    background: rgb(92, 21, 163);
    border-radius: 2px;
    margin: 2em 0;

    @media screen and (min-width: 768px) {
        width: 25%;
    }
}

.rocket {
    background-color: rebeccapurple;
    p {
        color: white;
    }

    .title {
        color: mediumpurple;
    }
}

.plane {
        // background: url('../assets/images/sent.png') no-repeat right;
        // background-size: contain;
        // z-index: -10;

        background-color: orange;

        position: relative;
        p {
            color: white !important;
        }

        .title {
            color: rgb(243, 207, 141);
        }
}

.service {
        // background: url('../assets/images/success.png') no-repeat right;
        // background-size: contain;
        // z-index: -10;
        background-color: #E20338;
        position: relative;
        p {
            color: white !important;
        }

        .title {
            color: rgb(255, 152, 152);
        }
}

.reviews {
    height: auto;
    background-color: #0e0d11;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%234c4a4f' fill-opacity='0.29'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");

    width: 100%;
    margin-top: 2em;
    padding: 10em 1.5em;

    @media only screen and (min-width: 768px) {
        clip-path: polygon(0 10%, 100% 0, 100% 100%, 0% 100%);
    }

    .title {
        color: white;
        text-align: center;
        margin-bottom: 20px;
    }

    .divider {
        margin: auto;
    }

    .bg-white {
        background-color: #fff !important;
    }

    .card {
        margin: 1em 10px;
        &__header {
            padding: 10px;
            display: flex;
            flex-direction: column;
         

            div:first-of-type {
                display: inline-flex;
                margin-bottom: 10px;


                .avatar {
                    display: inline-block;
                }
                .avatar img {
                    height: 40px;
                    width: 40px;
                    border-radius: 50%;
                }
            }
        }
        .user-details {
            margin-left: 1.5em;
            display: block;
            
            h3 {
                font-weight: bold;
            }
        }

        .user-details h5 {
            font-style: italic;
            font-weight: 400;
            color: white;
        }

        .rating {
            margin-left: 60px;
        }
    }
}

.CTO {
    margin-top: -70px;
    height: 70vh;
    background: #F2F8FD;
    padding: 4em 1.5em;
    text-align: left;
}
</style>