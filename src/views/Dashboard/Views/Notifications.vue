<template>
  <div>
    
        <div class="p-2">
          <div class="inbox-grid">
            <div class="categories flex flex-column">
              <h3 class="subtitle">
                categories
              </h3>
              <br>
              <div class="links">
                <p class="font-bold mb-2 purple">
                  <span>
                    <mail-icon size="1.5x" class="icons"></mail-icon>
                  </span>
                  <span>
                    Unread
                  </span>
                </p>
                <p class="font-bold mb-2 blue">
                  <span>
                    <check-icon size="1.5x" class="icons"></check-icon>
                  </span>
                  <span>
                    Seen
                  </span>
                </p>
                <p class="font-bold mb-2 red">
                  <span>
                    <trash-2-icon size="1.5x" class="icons"></trash-2-icon>
                  </span>
                  <span>
                    Deleted
                  </span>
                </p>
              </div>
            </div>
            <div class="senders"></div>
            <div class="message"></div>
          </div>
        </div>
  </div>
</template>

<script>
import { CheckIcon, MailIcon, Trash2Icon } from 'vue-feather-icons'
export default {
  components: {
    CheckIcon,
    MailIcon,
    Trash2Icon
  }
}
</script>

<style lang="scss" scoped>
  .card.w-auto {
    min-width: 60%;
  }

  p {
    display: flex;

    span:nth-child(1) {
      margin-right: 1em;
    }

    &:hover {
      .icons {
        color: #51EAFF;
      }
    }
  }

  p.blue {
    &:hover {
      .icons {
        color: #35D073;
      }
    }
  }

  p.purple {
    &:hover {
      .icons {
        color: #00CF91;
      }
    }
  }

  p.red {
    &:hover {
      .icons {
        color: #FF005C;
      }
    }
  }

  .categories {
    background: #F0F6F4;
    border-radius: 5px;
    padding: 1.2em;

    .subtitle {
      text-transform: capitalize;
    }

    @media screen and (max-width: 768px) {
      grid-area: categories-and\ from;

      .links {
        display: flex;
        flex-direction: row;
        margin: 10px 8px;
      }
    }
  }

  .senders {
    background: #F2F8FD;
    border-radius: 5px;

    @media screen and (max-width: 768px) {
      grid-area: messages;
    }
  }

  .message {
    background: whitesmoke;
    border-radius: 5px;

    @media screen and (max-width: 768px) {
      grid-area: people;
    }
  }
</style>