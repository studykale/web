<template>
    <div class="chats">
      <div class="header">
          <ul>
              <li class="profile">
                  
                  <img  src="../../../assets/support.png" alt="Support staff">
                  <div class="user-info">
                      <p>Support team</p>
                      <small>We ensure you get answered with our always online team... </small>
                  </div>
              </li>
          </ul>
      </div>
      <div v-chat-scroll="{smooth: true, scrollonremoved:true, smoothonremoved: false}" class="messages">
          <div v-if="chats.length > 0">
            <div v-for="(message, i) in chats" :key="i" v-bind:class="{ 'msg-right' : message.respondent , 'msg-left': !message.respondent  }" class="msg">
                <div class="bubbles" v-bind:class="{ 'bubbles-dark': message.respondent , 'bubbles-light': !message.respondent }">
                    <p>{{ message.message }}</p>
                    <small>{{ message.time.toDate() | moment('from', 'now') }}</small>
                </div>
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
            text: "",
            me: null,
            receiver: null
        }
    },
    
    methods: {
        sendChat() {
            
            if(this.text.length > 2) {
                chats.add({
                    user: currentUser.displayName,
                    message: this.text,
                    uid: this.me,
                    read: false,
                    time: Timestamp.now(),
                    respondent: null
                })
                // .then(() => {
                this.text = ""
                // })
            }
        },
        
    },
    
    created() {
        this.$bind('chats', chats.where('uid', '==', currentUser.uid).orderBy('time')).then(() => {
            this.me = currentUser.uid;
        })
        
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
            max-height: 100%;
            overflow-y: scroll;

            .msg {
                margin: 20px 0;
            
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
                    margin: 5px 0;

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