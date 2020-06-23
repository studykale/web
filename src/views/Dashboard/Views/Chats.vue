<template>
    <div class="chats">
      <div class="header">
          <ul>
              <li class="profile">
                  
                  <img src="https://source.unsplash.com/user/erondu" alt="Support staff">
                  <div class="user-info">
                      <p>Samantha</p>
                  </div>
              </li>
          </ul>
      </div>
      <div v-chat-scroll="{smooth: true, notSmoothOnInit: true}" class="messages">
          <div v-for="(message, i) in chats" :key="i" v-bind:class="{ 'msg-right' : message.id == currentUser , 'msg-left': message.id != currentUser.id  }" class="msg">
            <div class="bubbles" v-bind:class="{ 'bubbles-dark': message.id == currentUser.id , 'bubbles-light': message.id != currentUser.id }">
                <p>{{ message.message }}</p>
                <small>{{ message.time.toDate() | moment('from', 'now') }}</small>
            </div>
          </div>
      </div>
      <div class="text-view">
          <form @submit.prevent="sendChat">
              <input placeholder="Start chat" v-model="text" required/>
              <button type="submit" class="round">
                  <navigation-icon size="1.5x" class="purple"></navigation-icon>
              </button>
          </form>
      </div>
  </div>
</template>

<script>
import { NavigationIcon } from 'vue-feather-icons'
import { chats, currentUser, Timestamp } from '../../../db'

export default {
    components: {
        NavigationIcon
    },
    data() {
        return {
            chats: [],
            text: ""
        }
    },
    methods: {
        sendChat() {
            console.log("currentUser", currentUser)
            if(this.text.length > 2) {
                chats.doc(currentUser.uid).set({
                    user: currentUser.displayName,
                    message: this.text,
                    id: currentUser.uid,
                    read: false,
                    time: Timestamp.now()
                })
                this.text = ""
            }
        }
    },
    created() {
        this.$bind('chats', chats.doc(currentUser.uid).get().then(ch => {
            
            
            console.log("chats", ch.data())
        }))
    }
}
</script>

<style lang="scss" scoped>
    .chats {
        display: grid;
        grid-template-rows: auto 1fr auto;
        height: 100%;


        .header {
            background-color: white;
            padding: 1em;
            border-radius: 4px;

            ul {
                list-style: none;
                display: flex;

                .profile {
                    display: flex;
                    margin-right: 10px;
                    height: 35px;
                    width: 35px;

                    img {
                        height: inherit;
                        width: inherit;
                        object-fit: cover;
                        border-radius: 25px;
                        margin-right: 10px;
                    }
                }
            }

            .profile .user-info {
                margin: auto;
                p {
                    font-size: .75rem;
                    font-weight: bolder;
                }
            }
        }

        .messages {
            display: flex;
                flex-direction: column;
            padding: 10px;

            .msg {
                p {
                    font-size: .95rem;
                }
                
                .bubbles-light {
                    background-color: #ebe1fc;
                    color: #110c17;
                }

                .bubbles-dark {
                    background-color: #782FEF;
                    color: white;
                }

                &.msg-right {
                    display: flex;
                    justify-content: flex-start;
                    margin: 2em 0;

                    .bubbles {
                        max-width: 60%;
                        padding: .5em;
                        border-radius: 0px 4px 4px 4px;
                    }
                }

                &.msg-left {
                    display: flex;
                    justify-content: flex-end;

                    .bubbles {
                        max-width: 60%;
                        padding: .5em;
                        border-radius: 4px 0px 4px 4px;
                    }
                }
            }
        }

        .text-view {
            border-radius: 4px;
            background-color: #761CEA;
            padding: 1em;

            form {
                position: relative;
                display: flex;
            }

            input {
                border-radius: 4px;
                text-indent: 10px;
                background-color: white;
                border: none;
                width: 100%;
                padding: 1em;
            }

            form .round {
                border: none;
                background: white;
                height: 42px;
                width: 42px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 4px;
                color: purple;
                margin-left: 10px;
                margin-top: auto;
                margin-bottom: auto;
            }
        }
    }
</style>