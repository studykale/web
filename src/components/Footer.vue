<template>
  <div>
      <footer class="footer">
          <div class="container">
              <div>
                  <div class="brand">
                      <router-link to="/" class="subtitle font-bold">
                          StudyWorks
                      </router-link>
                  </div>
                  <div class="links">
                      <ul>
                          <li>
                              <router-link to="/how-it-works">How It works</router-link>
                          </li>
                          <li>
                              <router-link to="/aboutus#contact">Talk to Us</router-link>
                          </li>
                          <li>
                              <router-link to="/aboutus#FAQ">FAQS</router-link>
                          </li>
                          <li>
                              <router-link to="/aboutus">FaceBook</router-link>
                          </li>
                          <li>
                              <router-link to="/aboutus">Twitter</router-link>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>

         
      </footer>
       <div class="full-width">
              <div class="text-left">
                  <p class="text-white">&copy; All rights reserved. 2020</p>
              </div>
        </div>
  </div>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style scoped lang="scss">
.footer {
    padding: 2em 1.6em 2em !important;
}
.footer .container div {
    display: flex;
    flex-direction: column;


    @media screen and (min-width: 520px) {
        flex-direction: row;
        justify-content: space-between;
    }


    .brand {
        line-height: 1.2;
    }

    .links {
        ul {
            display: flex;

            @media screen and (max-width: 480px) {
                flex-direction: column;
                line-height: 1.8;
                margin-top: 1em;
            }
            li:not(:last-of-type) {
                margin-right: 1em;
            }
            li a {
                color: #111;
            }
        }
    }
}

.full-width {
    width: 100%;
    background: #121212;
    padding: .85em .4em;

    p {
        color: white;
    }
}
</style>