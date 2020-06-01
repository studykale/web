<template>
  <div>
    <div class="container">
      <div class="card mx-auto w-100">
        <div class="card-header">
          <h3 class="subtitle">
            Notifications
          </h3>
        </div>
      </div>
      <div class="flex flex-wrap justify-between">
        <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3">
              <div
                  slot="trigger" 
                  slot-scope="props"
                  class="card-header"
                  role="button"
                  aria-controls="contentIdForA11y3">
                  <p class="card-header-title">
                      You submitted a project today
                  </p>
                  <a class="card-header-icon">
                      <b-icon
                          :icon="props.open ? 'menu-down' : 'menu-up'">
                      </b-icon>
                  </a>
              </div>
              <div class="card-content">
                  <div class="content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                      <a>#buefy</a>.
                  </div>
              </div>
              <footer class="card-footer">
                  <a class="card-footer-item">Save</a>
                  <a class="card-footer-item">Edit</a>
                  <a class="card-footer-item">Delete</a>
              </footer>
          </b-collapse>
        <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3">
              <div
                  slot="trigger" 
                  slot-scope="props"
                  class="card-header"
                  role="button"
                  aria-controls="contentIdForA11y3">
                  <p class="card-header-title">
                      You submitted a project today
                  </p>
                  <a class="card-header-icon">
                      <b-icon
                          :icon="props.open ? 'menu-down' : 'menu-up'">
                      </b-icon>
                  </a>
              </div>
              <div class="card-content">
                  <div class="content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                      <a>#buefy</a>.
                  </div>
              </div>
              <footer class="card-footer">
                  <a class="card-footer-item">Save</a>
                  <a class="card-footer-item">Edit</a>
                  <a class="card-footer-item">Delete</a>
              </footer>
          </b-collapse>
          <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3">
              <div
                  slot="trigger" 
                  slot-scope="props"
                  class="card-header"
                  role="button"
                  aria-controls="contentIdForA11y3">
                  <p class="card-header-title">
                      You submitted a project today
                  </p>
                  <a class="card-header-icon">
                      <b-icon
                          :icon="props.open ? 'menu-down' : 'menu-up'">
                      </b-icon>
                  </a>
              </div>
              <div class="card-content">
                  <div class="content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                      <a>#buefy</a>.
                  </div>
              </div>
              <footer class="card-footer">
                  <a class="card-footer-item">Save</a>
                  <a class="card-footer-item">Edit</a>
                  <a class="card-footer-item">Delete</a>
              </footer>
          </b-collapse>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  
}
</script>

<style lang="scss" scoped>
  .card.w-100 {
    min-width: 60%;
    margin-top: 2em;
    .card-header {
      padding: 1em;
    }
  }

  .card {
    margin-bottom: 1em;
  }
  
</style>