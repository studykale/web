<template>
    <div>

        <section class="hero home">
            <!-- Hero head: will stick at the top -->
            <navbar>
            </navbar>

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
        <div>
            <section class="features">
                <div class="container mx-a">
                    <h2 class="title_main font-bold text-center">
                    Our features
                    </h2>
                    <div class="flex flex-row justify-start">
                    <div class="feature flex-row_reverse">
                        <div class="main">
                        <div class="feature__head">
                            <h2 class="title font-bold">
                            Easy to start and set up
                            </h2>
                        </div>
                        <div class="feature__content">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima quisquam minus doloribus sed corrupti quidem veniam, alias quos ullam vero repellendus dicta? Ipsum, assumenda. Excepturi veniam debitis distinctio perferendis sunt.</p>
                        </div>
                        </div>
                        <div class="feature__img">
                        <img src="@/assets/illustrations/easy_start.svg" alt="Feature image">
                        </div>
                    </div>
                    <div class="feature">
                        <div class="main">
                        <div class="feature__head">
                            <h2 class="title font-bold">
                            Get it right the first time
                            </h2>
                        </div>
                        <div class="feature__content">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima quisquam minus doloribus sed corrupti quidem veniam, alias quos ullam vero repellendus dicta? Ipsum, assumenda. Excepturi veniam debitis distinctio perferendis sunt.</p>
                        </div>
                        </div>
                        <div class="feature__img">
                        <img src="@/assets/illustrations/results.svg" alt="Feature image">
                        </div>
                    </div>
                    <div class="feature flex-row_reverse">
                        <div class="main">
                        <div class="feature__head">
                            <h2 class="title font-bold">
                            We make it a team effort.
                            </h2>
                        </div>
                        <div class="feature__content">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima quisquam minus doloribus sed corrupti quidem veniam, alias quos ullam vero repellendus dicta? Ipsum, assumenda. Excepturi veniam debitis distinctio perferendis sunt.</p>
                        </div>
                        </div>
                        <div class="feature__img">
                        <img src="@/assets/illustrations/team.svg" alt="Feature image">
                        </div>
                    </div>
                    </div>
                </div>
            </section>
            <section class="reports">
                <div class="container mx-a">
                    <h2 class="title text-center">
                    Our testimonials
                    </h2>
                    <div>
                    <b-carousel >
                        <b-carousel-item v-for="(t, i) in testimonials" :key="i">
                        <div class="item">
                            <p>{{t.testify}}</p>
                            <div class="flex flex-column">
                            <p>{{ t.name }}, {{ t.school }}</p>
                            <span class="rating"><img src="@/assets/illustrations/star.svg" alt="Star"> {{ t.rating }}</span>
                            </div>
                        </div>
                        </b-carousel-item>
                    </b-carousel>
                    </div>
                </div>
            </section>
            <!-- CALL TO ACTION: In this case sign up an account. -->
            <section class="cta">
                <div class="container mx-a">
                    <div class="flex f-row">
                    <div class="flex flex-column justify-start">
                        <div class="cta__message">
                        <h2 class="title font-bold">Start Creating tasks</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui necessitatibus sint, earum perferendis nobis impedit.</p>
                        </div>
                        <div class="cta__actions">
                        <button @click="goContact" class="contact">
                            Contact Us
                        </button>
                        <button @click="goSignUp" class="start">
                            Get started
                        </button>
                        </div>
                    </div>
                    <div class="cta__img">
                        <img src="@/assets/illustrations/hero.svg" alt="Hero flying">
                    </div>
                    </div>
                </div>
            </section>
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
            'navbar': Navbar,
            OrderCard,
            Footer
        },
        data () {
            return {
                rate1: 4.6,
                testimonials: [
                    { 
                    name: "Brian Peterson",
                    school: "Murray University",
                    rating: 4.3,
                    testify: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error dolorem quos officiis iusto laboriosam ratione ullam unde totam nostrum natus."
                    },
                    { 
                    name: "Jane Blacker",
                    school: "Washington Academy",
                    rating: 4.6,
                    testify: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error dolorem quos officiis iusto laboriosam ratione ullam unde totam nostrum natus."
                    },
                    { 
                    name: "Michael Anderson",
                    school: "Murray University",
                    rating: 4.8,
                    testify: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error dolorem quos officiis iusto laboriosam ratione ullam unde totam nostrum natus."
                    }
                ],
            }
        },
        methods: {
            goContact() {
                this.$router.push('/aboutus#contact')
            },
            goSignUp() {
                this.$router.push('/auth/signup')
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

.features {
    width: 100%;
    height: auto;
    background: #F2F4F6;
    display: block;
    padding-top: 2em;

    .container {
      width: 80%;
    }

    .title_main.font-bold {
      text-align: center;
      font-weight: bolder;
      font-size: 1.9rem;
      margin-bottom: 1.5em;
    }

    &.flex-row {
      @media screen and (max-width: 724px) {
        flex-direction: column;
      }
    }

    .feature {
      display: flex;
      margin: 1em 0;



      @media screen and (max-width: 724px) {
        margin: 1em auto;
        width: 100%;
        flex-direction: column !important;
      }
    }

    .feature .feature__head {
      margin-bottom: 1.5em;

      .title {
        font-size: 1.6rem;
        color: #111;
      }
    }

    .feature .feature__content {
      line-height: 1.7;
      letter-spacing: .25px;

      @media screen and (max-width: 520px) {
        width: 90%;
      }

      @media screen and (min-width: 520px) {
        width: 80%;
      }

      p {
        color: #58595B;
        font-size: 1rem;
      }
    }

    .feature .feature__img {
      order: -1;
      height: 250px;
      width: 300px;

      @media screen and (max-width: 340px) {
        height: auto;

      }

      img {
        height: inherit;
        max-width: 300px !important;
      }
    }
  }

  .reports {
    background: linear-gradient(to bottom, #8E2DE2, #4A00E0);
    width: 100%;
    height: auto;

    .container {
      padding: 2em 0;
      margin: auto;
    }

    .title.text-center {
      font-weight: bolder;
      text-align: center;
      color: white;
      margin: 0 auto;
      position: relative;

      &::after {
        content: "";
        display: block;
        background: white;
        height: 2px;
        border-radius: 1px;
        width: 25%;
        margin: 1em auto;
      }
    }

    .item {
      .rating {
        margin: auto;
        color: white;

        img {
          height: 15px;
          width: 15px;
          margin-right: 10px;
        }
      }

      p {
        color: white;
        margin: 1em auto;
        text-align: center;
        width: 100%;

        @media screen and (min-width: 540px){
          width: 60%;
        }
      }
    } 
  }

  .cta {
    background: white;
    padding:2em;

    @media screen and (max-width: 540px) {
      padding: .75em;
    }

    .f-row {
      @media screen  and (max-width: 540px) {
        flex-direction: column-reverse;
      }
    }

    .title.font-bold {
      font-weight: bolder;
      color: #111;
      font-size: 1.6rem;
      margin-bottom: 1.2em;
    }

    &__message {
      line-height: 1.7;
      letter-spacing: .25px;

      p {
        width: 100%;
        color: #58595B;
        font-size: 1rem;
        

        @media screen and (min-width: 540px) {
          width: 80%;
        }
      }
    }

    &__actions {
      margin: 2em 0 0;

      button.start, button.contact {
        padding: 1em 1.2em;
        outline: none;
        border-radius: 4px;
      }

      .start {
        color: #4A00E0; 
        background-color: white;
        border: 2px solid #4A00E0;
        margin-left: 2em;
        transition: 250ms;

        &:hover {
          border-style: dashed;
        }
      }

      .contact {
        color: white;
        background-color: #4A00E0;
        transition: .25s;
        border: none;
          &:hover {
            opacity: .95;
          }
      }
    }

    &__img {
      @media screen and (max-width: 540px) {
        height: auto;
      }
      height:250px;

      img {
        height: inherit;
      }
    }
  }

  .carousel-indicator.is-inside.is-bottom {
    display: none;
    }
</style>