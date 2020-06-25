<template>
  <Layout>
    <div class="container">
      <div class="flex justify-around">
        <div class="w-50">
          <div class="text-4xl text-left">
            <h3 class="font-bold leading-tight mb-2 text-purple">Know more about Us</h3>
          </div>
          <div class="header-content">
            <p>We are a team of friends and we patner to make other student work easier and ease of the workload. We are now dedicated to helping students get more time to meet and have fun.</p>
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
  metaInfo() {
    return {
      title: "About Us",
      meta: [
        {
          name: "description",
          vmid: "description",
          content: this.description
        }, {
          author: "Studykale",
          content: "This site was developed by studykale developers."
        },
        {
          name: "Keywords",
          content: "Study, Students, Exams, Essay service"
        }
      ]
    }
  },
  components: {
    Layout,
    Contact
  },
  data() {
    return {
      isOpen: 0,
      description: "Know more about how we help students.",
      collapses: [
        {
            title: 'How do I pay?',
            text: 'Payment process is safe and automatic. You only need to have a card. Once you add a task it will direct you to adding a new payment..'
        },
        {
            title: "Can I cancel before work is started?",
            text: 'You can still cancel before work is started but you`d better check our policies on this'
        },
        {
            title: 'Do you accept Cards?',
            text: 'Yes we do accept cards.'
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