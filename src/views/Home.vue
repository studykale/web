<template>
  <div>
    <section class="hero home">
      <!-- Hero head: will stick at the top -->
      <navbar></navbar>

      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container flex justify-around flex-wrap flex-row">
          <div class="has-text-left content">
            <h1 class="title font-bold">Build your grades, Save time, with our essay service.</h1>
            <p class="subtitle">
              Use our writing service to have best scores.
              No matter what type of paper you need,
            </p>
            <div class="buttons">
              <b-button
                tag="router-link"
                to="/auth/signup"
                type="is-primary"
                rounded
                size="is-medium"
              >Get Started</b-button>
            </div>
          </div>
          <OrderCard />
        </div>
      </div>
    </section>
    <div>
      <section class="intro">
        <div class="container p-5">
          <div class="flex flex-row justify-between">
            <div class="side">
              <h2 class="title title-1">At studykale, we help you to meet your deadlines at affordable price.</h2>
              <p
                class="mt-2"
              >We help you get all your assignments done one place. Do not worry if you have no ideas or if you are overloaded with assignments, we are the solution and we will help get amazing grades.</p>
              <p>Get some sleep or even have your leisure time as you wish. Do not hesitate we are here to help you regardless of the short deadline. Our writers are punctual and can deliver strictly within the deadline.</p>

              <ul>
                <li>
                  <p class="title">All types of paper</p>
                  <p>Our writers handle all types of papers. Be it an essay, dissertation or research paper. Our professional writers create all forms of academic writing.</p>
                </li>
                <li>
                  <p class="title">Free preview and unlimited amendments.</p>
                  <p>Ask your writer to adjust your paper or make a preview any time you want.</p>
                </li>
                <li>
                  <p class="title">Plagiarism checker</p>
                  <p>The received paper will be totally original.</p>
                </li>
              </ul>
            </div>
            <div class="img">
              <img src="../assets/illustrations/track.svg" alt="Results to track on studykale" />
            </div>
          </div>
        </div>
      </section>
      <section class="features">
        <div class="container mx-a">
          <h2 class="title_main font-bold text-center">Our features</h2>
          <div class="flex flex-row justify-start">
            <div class="feature">
              <div class="main">
                <div class="feature__head">
                  <h2 class="title font-bold">24/7 Customer Support</h2>
                </div>
                <div class="feature__content">
                  <p>Your happiness is our aim. Our support team is always available to help you. Our support is very friendly and smart. We are available all time, day and wait. We are ready to respond to any issue as soon as possible. Make request whenever you want additional details. We are there for you.</p>
                </div>
              </div>
              <div class="feature__img">
                <img src="@/assets/illustrations/24-7.svg" alt="Studykale Feature image" />
              </div>
            </div>
            <div class="feature flex-row_reverse">
              <div class="main">
                <div class="feature__head">
                  <h2 class="title font-bold">Easy to start and set up</h2>
                </div>
                <div class="feature__content">
                  <p>
                    It is not a match. It is easy as you can see. Set up your free account using your email. Specify the type of paper, the deadline and the pages. We will handle your paper within the deadline.
                    We care about your privacy. Your privacy information will not be disclosed to the third party.
                  </p>
                </div>
              </div>
              <div class="feature__img">
                <img src="@/assets/illustrations/easystart.svg" alt="Illustration showing easy start" />
              </div>
            </div>
            <div class="feature">
              <div class="main">
                <div class="feature__head">
                  <h2 class="title font-bold">Get it right the first time</h2>
                </div>
                <div class="feature__content">
                  <p>We have professional writers who will make it right for you. We have great experience. No matter what type of paper you have, we can handle it and assure you to have best grades ever. You are able to communicate with the writer as the assignment is on progress. All our professional writers are available. Be safe and stay at home we are ready to handle your papers and assure you best score.</p>
                </div>
              </div>
              <div class="feature__img">
                <img src="@/assets/illustrations/results.svg" alt="Feature image showing results" />
              </div>
            </div>
            <div class="feature flex-row_reverse">
              <div class="main">
                <div class="feature__head">
                  <h2 class="title font-bold">We make it a team effort.</h2>
                </div>
                <div class="feature__content">
                  <p>We work as a team to make sure we satisfy our customers. We have assisted hundreds of students to achieve their grades. So we have great experience and we know exactly what students want in their academic papers. Do not stress yourself to handle difficult tasks.</p>
                </div>
              </div>
              <div class="feature__img">
                <img src="@/assets/illustrations/team.svg" alt="Feature image showing team work" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="reports">
        <div class="container mx-a">
          <h2 class="title text-center">Our testimonials</h2>
          <div>
            <b-carousel>
              <b-carousel-item v-for="(t, i) in testimonials" :key="i">
                <div class="item">
                  <p>{{t.testify}}</p>
                  <div class="flex flex-column">
                    <span class="rating">
                      <img src="@/assets/illustrations/star.svg" alt="Rating for work done for the essay service." />
                      {{ t.rating }}
                    </span>
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
                <p>We promise get results and a wonderful time. Its as simple as Getting started!!</p>

              </div>
              <div class="cta__actions">
                <button @click="goContact" class="contact">Contact Us</button>
                <button @click="goSignUp" class="start">Get started</button>
              </div>
            </div>
            <div class="cta__img">
              <img src="@/assets/illustrations/hero.svg" alt="Studykale get started hero essay service" />
            </div>
          </div>
        </div>
      </section>
    </div>

    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import OrderCard from "@/components/OrderCard.vue";
import Footer from "@/components/Footer.vue";
import { SnackbarProgrammatic as Snackbar } from "buefy"

export default {
  
  components: {
    navbar: Navbar,
    OrderCard,
    Footer
  },
  data() {
    return {
      rate1: 4.6,
      testimonials: [
        {
          rating: 4.2,
          testify:
            "“I started using studykale after I learnt about it from Facebook. So far I cannot complain. It is perfect in handling assignments. I have always been assisted regardless of the time or the type of paper. I have improved my grade too much.”"
        },
        {
          rating: 4.6,
          testify:
            "“I am able to spend my free time the way I want and I am satisfied with the grades. Thanks too much studykale. This is the best site ever. I am able to conduct my business and still have best scores.”"
        },
        {
          rating: 4.8,
          testify:
            "“thank you studykale for making me have the best results in the class. I did not expect that you are this perfect.”"
        },
        {
          rating: 4.5,
          testify:
            "“the writer finished the assignment earlier that deadline. He had great communication with me in solving the assignment. Am thankful”"
        }
      ]
    };
  },
  methods: {
    goContact() {
      this.$router.push("/aboutus#contact");
    },
    goSignUp() {
      this.$router.push("/auth/signup");
    }
  },
  created() {
    this.$crisp.load();

    this.$crisp.$on('loaded', () => {
      Snackbar.open({
        type: "is-primary",
        message: "Feel free to talk to us anytime using the chat box. On bottom right.",
        position: "is-bottom-left",
        duration: 2500,
      })
    })
  }
};
</script>

<style lang="scss" scoped>
.home {
  background: url("../assets/images/students-laptop.jpg") no-repeat;
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
    background: linear-gradient(
      to top right,
      rgba(205, 159, 252, 0.87),
      rgba(114, 103, 240, 0.849)
    );
  }
}

.hero-body {
  .content {
    width: 50%;

    @media only screen and (max-width: 768px) {
      width: 100%;

      .title,
      .subtitle {
        text-align: center;
      }
    }
  }
  .title,
  .subtitle {
    color: white;
    line-height: 1.8;
  }

  .title {
    font-weight: 800;

    @media (max-width: 480px) {
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

.intro {
  background-color: white;
  position: relative;
  padding: 4em 0;

  .title {
    font-size: 1.5rem;
  }

  .title.title-1 {
    font-size: 1.8rem;
  }

  .flex {
    @media screen and (max-width: 680px) {
      justify-content: center;
      align-content: center;
    }
  }

  .side {
    margin: 2em auto 2em 0;
    width: 60%;
    padding: 4em;

    @media screen and (max-width: 640px) {
      padding: 1.5em;
    }

    ul {
      margin: 2em 1em;
      
      li:not(:last-of-type) {
        margin-bottom: 15px;
      }
    }

    @media screen and (max-width: 520px) {
      width: 100%;
      margin-right: auto;
      margin-left: auto;
    }
  }

  .img {
    width: 450px;

    @media screen and (max-width: 520px) {
      width: 250px;
      margin: auto;
    }
  }
}

.features {
  width: 100%;
  height: auto;
  background: #f2f4f6;
  display: block;
  padding-top: 2em;

  border-top-left-radius: 250px;
  /* background-color: white; */
  border-top-right-radius: 250px;

  @media screen and (max-width: 520px) {
    border-top-left-radius: 50px;
    /* background-color: white; */
    border-top-right-radius: 50px;
  }

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
    letter-spacing: 0.25px;

    @media screen and (max-width: 520px) {
      width: 90%;
    }

    @media screen and (min-width: 520px) {
      width: 80%;
    }

    p {
      color: #58595b;
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
  background: linear-gradient(to bottom, #8e2de2, #4a00e0);
  width: 100%;
  height: auto;
  padding: 4em;

  .carousel .carousel-indicator.is-inside.is-bottom {
    display: none !important;
  }

  .container {
    padding: 0 0 2em 0;
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

      @media screen and (min-width: 540px) {
        width: 60%;
      }
    }
  }
}

.cta {
  background: white;
  padding: 2em;

  @media screen and (max-width: 540px) {
    padding: 0.75em;
  }

  .f-row {
    @media screen and (max-width: 540px) {
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
    letter-spacing: 0.25px;

    p {
      width: 100%;
      color: #58595b;
      font-size: 1rem;

      @media screen and (min-width: 540px) {
        width: 80%;
      }
    }
  }

  &__actions {
    margin: 2em 0 0;

    button.start,
    button.contact {
      padding: 1em 1.2em;
      outline: none;
      border-radius: 4px;
    }

    .start {
      color: #4a00e0;
      background-color: white;
      border: 2px solid #4a00e0;
      margin-left: 2em;
      transition: 250ms;

      &:hover {
        border-style: dashed;
      }
    }

    .contact {
      color: white;
      background-color: #4a00e0;
      transition: 0.25s;
      border: none;
      &:hover {
        opacity: 0.95;
      }
    }
  }

  &__img {
    @media screen and (max-width: 540px) {
      height: auto;
    }
    height: 250px;

    img {
      height: inherit;
    }
  }
}

.carousel-indicator.is-inside.is-bottom {
  display: none;
}
</style>