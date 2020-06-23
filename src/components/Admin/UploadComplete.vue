<template>
  <div class="card">
      <div class="card-header">
          <h3 class="title font-bold">
              Upload completed files...
          </h3>
      </div>
      <div class="card-content">
         <form @submit.prevent="uploadFiles">
             <b-field>
                <b-upload v-model="dropFiles" multiple drag-drop expanded>
                    <section class="section">
                    <div class="content has-text-centered">
                        <p>
                        <b-icon icon="upload" size="is-large"></b-icon>
                        </p>
                        <p>Drop your files here or click to upload</p>
                    </div>
                    </section>
                </b-upload>
            </b-field>

            <div class="tags">
                <span v-for="(file, index) in dropFiles" :key="index" class="tag is-primary">
                    {{file.name}}
                    <button class="delete is-small" type="button" @click="deleteDropFile(index)"></button>
                </span>
            </div>        
            <button :disabled="!fileUploaded" class="button is-fullwidth is-primary mt-2" type="submit">Upload</button>
        </form>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'UloadCompleteFiles',
    data() {
        return {
        dropFiles: []
        };
    },
    methods: {
        ...mapActions('projects', ['updateProjectCompleteFiles']),
        deleteDropFile(index) {
        this.dropFiles.splice(index, 1);
        },
        uploadFiles() {
            let data = {
                files: this.dropFiles
            }
            this.updateProjectCompleteFiles(data)
            this.dropFiles = []
        }
    }
}
</script>

<style>

</style>