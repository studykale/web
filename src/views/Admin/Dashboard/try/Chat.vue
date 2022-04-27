<template>
  <div class="projects">
      <div class="flex flex-row-single">
        <div id="chat" class="card mr-1">
          <div class="card-header">
            <div class="card-header-title flex flex-row">
                <b-field label="Select user to start a chat">
                    <b-select 
                    v-model="selectedUser"
                    expanded
                    placeholder="Select a name">
                        <option
                            v-for="option in users"
                            :value="option.id"
                            :key="option.id">
                            {{ option.username }}
                        </option>
                    </b-select>
                </b-field>
            </div>
          </div>
          <div class="card-content">
            <div v-if="byChats.length <= 0" class="flex items-center justify-center">
              <p>You dont have any chats from this user</p>
            </div>
            <div v-else>
              <ul class="messages" v-chat-scroll="{smooth: true, scrollonremoved:true, smoothonremoved: false}">
                <li class="message" v-for="(n, i) in byChats" :key="i">
                  <div class="msg" :class="{ 'light': n.respondent }">
                    <small v-if="n.respondent">Me</small>
                    <p>{{ n.message }}</p>
                    <small>{{ n.time.toDate() | moment('from', 'now')  }}</small>
                  </div>
                </li>
              </ul>  
            </div>
          </div>
          <div class="card-footer">
            
                <form @submit.prevent="replyChat">
                    <input placeholder="Start chat" v-model="text" required/>
                    <button type="submit" class="round">
                        <navigation-icon size="1.5x" class="purple"></navigation-icon>
                    </button>
                </form>
            
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
import { contactCollection, users, chats, Timestamp, currentUser } from '../../../../db'
import { NavigationIcon } from 'vue-feather-icons'


export default {
  components: {
    NavigationIcon
  },
  data() {
    return {
      queries: [],
      users: [],
      chats: [],
      selectedChats: [],
      selectedUser: null,
      isOpen:0,
      text: "",
      current: 1,
      perPage: 4,
      byChats: [],
      me: null
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
    
      return this.queries.slice(pageNumber * this.perPage, this.current * this.perPage)
    },
    byUser() {
      return this.chats.filter(c => c.uid == this.selectedUser)
    }
  },
  methods: {
    replyChat() {
      let name = this.users.find(u => u.id == this.selectedUser).username
      if(this.text.length > 2) {
        chats.add({
            user: name,
            message: this.text,
            uid: this.selectedUser,
            read: false,
            time: Timestamp.now(),
            respondent: this.me.uid
        })
        .catch(error => {
          this.$buefy.toast.open('Could not Send reply' + error)
        })
        // .then(() => {
        this.text = ""
        // })
      }
    }
  },
  watch: {
    selectedUser: {
      immediate: true,
      handler(newVal) {
        this.byChats = this.chats.filter(chats => chats.uid == newVal)
      },
    },
  },
  created() {
    this.$bind('users', users.where('role', '==', 'CLIENT')).then(users => {
      this.selectedUser = users[0].id
      this.me = currentUser
    }),
    this.$bind('chats', chats.orderBy('time'))
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

    .card-content {
      height: 100%;

      .messages {
        max-height: 350px;
        overflow-y: scroll;
      }

      .messages ul li {
        display: inline-block;
      }

      .message {
        border-radius: 4px;
        font-size: 1rem;
        max-width: 80%;
        display: flex;
        background: none;
      }
    }

    .card-footer {
      form {
        width: 100%;
        display: flex;
      }

      form input {
        width: 100%;
        padding: 1em;
        border: solid #0260E8;
        border-radius: 4px;
      }

      form button {
        border-radius: 50%;
        height: 50px;
        width: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #0260E8;
        outline: none;
        border: none;
        color: white;
        margin: auto 10px;
      }
    }
  }

  #contact {
    width: 80%;

    h2 {
      font-size: x-large;
      margin-bottom: 2em;
    }
  }

  .card-footer {
    padding: 5px;
    border-radius: 4px;
    border: none;
  }

  #chat {
    display: flex;
    flex-direction: column;
  }

  .msg {
    border-radius: 0 5px 5px 5px;
    background: #0260E8;
    padding: 1.2em;
    text-align: left;
    display: flex;
    flex-direction: column;
    color: white;
    
    @media screen and (max-width: 640px) {
      max-width: 90%;
    }
  }

  .light {
    background: #E5F0FF !important;
    color: #111 !important;
  }

  .msg-left {
    opacity: .85;
  }

  .msg-right {
    justify-content: flex-end;
  }

  .flex-row-single {
    flex-direction: row;
  }

  .mr-1 {
    margin-right: 15px;
  }
</style>