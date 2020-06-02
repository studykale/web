<template>
  <b-sidebar
      type="is-light"
      fullheight
      overlay
      right
      :open.sync="open"
    >
      <div class="p-1">
        <div>
            <p>Project title</p>
            <h4 class="font-bold subtitle">{{ title }}</h4>
        </div>
        <div>
            <p>Project type</p>
            <h4>{{ paperType }}</h4>
        </div>
        <div>
            <p>Description</p>
            <p>{{ description }}</p>
        </div>
        <div>
            <p>Files</p>
            <b-field>
                <div class="control">
                    <b-taglist attached>
                        <b-tag type="is-dark">npm</b-tag>
                        <b-tag type="is-info">0.5.1</b-tag>
                    </b-taglist>
                </div>
            </b-field>
        </div>
        <b-button @click="showId">Details</b-button>
      </div>    
    </b-sidebar>
</template>

<script>
export default {
    props: {
        open: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: "No title"
        },
        description: {
            type: String,
            default: "No description"
        },
        paperType: {
            type: String,
            default:"paper type"
        },
        id: String
    },
    methods: {
        showId() {
            console.log("id", this.id)
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>