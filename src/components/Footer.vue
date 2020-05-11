<template>
  <div>
      <footer class="footer">
          <div class="container">
              <div class="flex flex-row flex-wrap justify-between">
                  <div class="brand">
                      <h2 class="subtitle">
                          StudyWorks
                      </h2>
                      <p>&copy; All rights reserved. 2020</p>
                  </div>
                  <div class="links">
                      <ul>
                          <li>
                              <router-link to="/aboutus">How It works</router-link>
                          </li>
                          <li>
                              <router-link to="/aboutus">Talk to Us</router-link>
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
  </div>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style scoped lang="scss">
.footer .container div {
    .brand {
        line-height: 1.2;
    }

    .links {
        ul {
            display: flex;
            li:not(:last-of-type) {
                margin-right: 1em;
            }
            li a {
                color: #111;
            }
        }
    }
}
</style>