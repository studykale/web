<template>
  <Layout>
    <div class="container">
      <div class="flex justify-around">
        <div class="w-50">
          <div class="text-4xl text-left">
            <h3 class="font-bold leading-tight mb-2 text-purple">Know more about Us</h3>
          </div>
          <div class="header-content">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio reprehenderit fugit velit nisi adipisci, doloremque beatae illum consequuntur odit iure quas inventore, exercitationem quos eaque accusamus. A deleniti possimus atque.</p>
          </div>
        </div>
      </div>

      <div id="#FAQS" class="faqs">
        <div class="flex justify-around">

        <div class="w-50">
          <div class="leading-snug my-5">
            <h5 class="subtitle text-left">
              FAQS
            </h5>
            <div>
              <b-collapse
                class="card"
                animation="slide"
                v-for="(collapse, index) of collapses"
                :key="index"
                :open="isOpen == index"
                @open="isOpen = index">
                <div
                    slot="trigger"
                    slot-scope="props"
                    class="card-header"
                    role="button">
                    <p class="card-header-title">
                        {{ collapse.title }}
                    </p>
                    <a class="card-header-icon">
                        <b-icon
                            :icon="props.open ? 'menu-down' : 'menu-up'">
                        </b-icon>
                    </a>
                </div>
                <div class="card-content">
                    <div class="content">
                        {{ collapse.text }}
                    </div>
                </div>

            </b-collapse>
            </div>
          </div>
        </div>
        </div>
      </div>


      <div id='contact' class="contact mt-5">
        <div class="flex flex-row justify-around">
          <div class="w-50">
            <div>
              <h5 class="subtitle mb-3">Contact Us</h5>
            </div>
            <Contact />
          </div>
        </div>
        
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "./Default.vue";
import Contact from "@/components/Contact.vue";

export default {
  components: {
    Layout,
    Contact
  },
  data() {
    return {
      isOpen: 0,
      collapses: [
        {
            title: 'How do I pay?',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam nam ab praesentium? Dicta?'
        },
        {
            title: "Can I cancel before work is started?",
            text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo?'
        },
        {
            title: 'Do you accept Cards?',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium alias officiis vitae earum, commodi sit.'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
  .text-purple {
    color: rebeccapurple;
  }


.header-content  {
  margin-bottom: 3em;

  @media screen and (min-width: 768px) {

    margin-bottom: 5em;
  }
}

.faqs  {
  .card {
    width: 100%;
  }
}
  .card {
    border-radius: 5px;
    margin-bottom: 20px;
  }

  .mt-5 {
    margin-top: 5em;
  }

  .w-50 {
    width: 100%;

    @media screen and (min-width: 520px) {
      width: 60%;
    }

    @media screen and (min-width: 768px) {
      width: 50%;
    }
  }
</style>