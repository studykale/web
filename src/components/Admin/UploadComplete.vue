<template>
  <div class="card upload" style="width: 350px !important;">
      <div class="card-header">
          <h3 class="card-header-title font-bold">
              Upload completed files
          </h3>
      </div>
      <div class="card-content">
         <form @submit.prevent="uploadFiles">
             <b-field>
                <b-upload accept="application/pdf, application/msword" @input="addedFiles" v-model="dropFiles" multiple drag-drop expanded>
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
    props: ['selected'],
    data() {
        return {
        dropFiles: [],
        fileUploaded: false
        };
    },
    methods: {
        ...mapActions('projects', ['updateProjectCompleteFiles']),
        deleteDropFile(index) {
            this.dropFiles.splice(index, 1);
        },
        uploadFiles() {
            if(this.dropFiles.length <= 0) {
                this.$buefy.toast.open('Please select a file to upload')
            }
            let data = {
                id: this.selected.pid,
                files: this.dropFiles
            }
            console.log("data", data)
            if(data.id) {
                this.updateProjectCompleteFiles(data)
            } else {
                this.$buefy.dialog.prompt({
                message: `Please enter project id on the left side`,
                inputAttrs: {
                    placeholder: 'mLpYU4',
                    maxlength: 25,
                    required: true
                },
                trapFocus: true,
                onConfirm: (value) => {
                    data.id = value
                }
                })
                this.updateProjectCompleteFiles(data)
            }
            this.dropFiles = []
        },
        addedFiles(f) {
            if(f) {
                this.fileUploaded = true
            } else {
                this.fileUploaded = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .card.upload {
        width: 350px !important;
        margin: auto;
        display: flex;
        flex-direction: column;
    }
</style>