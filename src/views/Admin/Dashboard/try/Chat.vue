<template>
  <div class="projects">
      <div class="flex flex-row">
        <div id="chat" class="card">
          <div class="card-header">
            <div class="card-header-title">
              Chats
            </div>
          </div>
          <div class="card-content">
              <p>Card content</p>
            </div>
        </div>
        <div id="contact">
          <h2 class="font-bold">
            Contact queries
          </h2>
          <b-collapse
            class="card"
            animation="slide"
            v-for="(collapse, index) of paginatedItems"
            :key="index"
            :open="isOpen == index"
            @open="isOpen = index">
            <div
                slot="trigger"
                slot-scope="props"
                class="card-header"
                role="button">
                <div class="flex flex-column">
                  <p class="font-bold">
                      {{ collapse.subject }}
                  </p>
                  <p class="card-header-subtitle">
                    {{ collapse.email }}
                  </p>
                </div>
                <a class="card-header-icon">
                    <b-icon
                        :icon="props.open ? 'menu-down' : 'menu-up'">
                    </b-icon>
                </a>
            </div>
            <div class="card-content">
                <div class="content">
                    {{ collapse.message }}
                </div>
            </div>
        </b-collapse>

         <b-pagination
            :total="total"
            :current.sync="current"
            :per-page="perPage"
          >
          </b-pagination>
        </div>
      </div>
  </div>
</template>

<script>
import { contactCollection } from '../../../../db'

export default {
  data() {
    return {
      queries: [],
      isOpen:0,
      current: 1,
      perPage: 4
    }
  },
  firestore: {
    queries: contactCollection
  },
  computed: {
    total() {
      return this.queries.length
    },
    paginatedItems() {
      let pageNumber = this.current - 1;
      console.log("queries", this.queries.slice(pageNumber * this.perPage, this.current * this.perPage))
      return this.queries.slice(pageNumber * this.perPage, this.current * this.perPage)
    }
  }

}
</script>

<style lang="scss" scoped>
  .projects {
    margin: 2em;

    .card {
      border-radius: 4px;
      width: 100% !important;
      margin-bottom: 1em;
    }

    .card-header {
      display: flex;
      flex-direction: row;
      padding: .6em;
    }
  }

  #contact {
    width: 80%;

    h2 {
      font-size: x-large;
      margin-bottom: 2em;
    }
  }

  #chat {
    display: flex;
    flex-direction: column;
  }
</style>