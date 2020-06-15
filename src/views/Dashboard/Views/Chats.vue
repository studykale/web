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
      <div class="messages">
          <div class="msg msg-right">
            <div class="bubbles bubbles-dark">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, aliquam.</p>
            </div>
          </div>
          <div class="msg msg-left">
              <div class="bubbles bubbles-light">
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat atque voluptate beatae corrupti incidunt maxime numquam at excepturi consequatur quia!</p>
              </div>
          </div>
      </div>
      <div class="text-view">
          <form>
              <input placeholder="Start chat"/>
              <button class="round">
                  <navigation-icon size="1.5x" class="purple"></navigation-icon>
              </button>
          </form>
      </div>
  </div>
</template>

<script>
import { NavigationIcon } from 'vue-feather-icons'

export default {
    components: {
        NavigationIcon
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