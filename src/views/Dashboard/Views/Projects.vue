<template>
  <div class="container h-100 flex flex-column">
      <div class="head">
        <div class="float-right">
          <b-dropdown v-model="projectChoice" aria-role="list">
              <button class="button is-primary is-outlined" type="button" slot="trigger">
                  <template>
                      <b-icon icon="bookmark"></b-icon>
                      <span>Project options</span>
                  </template>
                  <b-icon icon="menu-down"></b-icon>
              </button>
              
              <b-dropdown-item value="new" aria-role="listitem">
                  <div class="media">
                      <b-icon class="media-left" type="is-primary" icon="play"></b-icon>
                      <div class="media-content">
                          <h3>New project</h3>
                          <small>Start a new project</small>
                      </div>
                  </div>
              </b-dropdown-item>

              <b-dropdown-item value="complete" aria-role="listitem">
                  <div class="media">
                      <b-icon class="media-left" type="is-success" icon="book"></b-icon>
                      <div class="media-content">
                          <h3>Completed</h3>
                          <small>Projects that are already done</small>
                      </div>
                  </div>
              </b-dropdown-item>

              <b-dropdown-item value="pending" aria-role="listitem">
                  <div class="media">
                      <b-icon class="media-left" type="is-info" icon="clock"></b-icon>
                      <div class="media-content">
                          <h3>Pending</h3>
                          <small>Projects on work currently</small>
                      </div>
                  </div>
              </b-dropdown-item>

              <b-dropdown-item value="cancelled" aria-role="listitem">
                  <div class="media">
                      <b-icon class="media-left" type="is-danger" icon="eraser"></b-icon>
                      <div class="media-content">
                          <h3>Cancelled</h3>
                          <small>Cancelled projects</small>
                      </div>
                  </div>
              </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
      <div class="grid-container">
        <div class="nav">
          <h2 class="subtitle">Projects</h2>
          <hr class="dropdown-divider"/>
          <b-button class="mb-2" type="is-primary" expanded icon-left="play-circle">Create a new project</b-button>
          <b-button class="mb-2" type="is-link" icon-left="book">View completed</b-button>
          <b-button class="mb-2" type="is-link" icon-left="eraser">View cancelled projects</b-button>
          <b-button type="is-link" icon-left="clock">View drafts</b-button>
        </div>
        <div class="projects">
          <h4>projects</h4>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projectChoice: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .head {
    width: 100%;
    margin: 2em 0;
    .float-right {
      float: right;
    }
  }

  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 1px 20px;
    grid-template-areas: "nav projects projects projects" "nav projects projects projects" "nav projects projects projects";
  }

  .nav { 
    grid-area: nav; 
    padding: 1em; 

    .is-link {
      display: block;
      outline: none;
      background: none;
      color: #111;

      &:hover {
        color: rebeccapurple;
      }
    }
  }

  .projects { grid-area: projects; background: lavender }
</style>