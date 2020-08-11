<template>
  <div class="h-100 p-1 bg-light">
      <div class="container">
        <h2 class="title">Profile</h2>
        <p>View or change your profile information.</p>
        <div class="card w-100 mt-2">
          <div class="card-header p-1">
            <div class="w-full flex flex-row flex-wrap justify-between items-center">
              <p class="subtitle my-a">{{ loggedInUser.username }}</p>
              <b-button @click="openModal" type="is-danger"><span> <edit-icon size="1x" class="custom-class"></edit-icon> </span> Edit</b-button>
            </div>
          </div>
          <div class="card-content">
            <div class="flex flex-row flex-wrap">
              <div v-if="!loggedInUser.photoURL" class="profile-img">
                <img src="https://avatars.dicebear.com/api/bottts/smile.svg" alt="Profile photo">
              </div>
              <div v-else class="profile-img">
                <img :src="loggedInUser.photoURL" alt="Profile photo">
              </div>
              <div class="flex flex-column">
                <h3><span class="font-bold">Username</span>  {{ loggedInUser.username }}</h3>
                <h3><span class="font-bold">Email</span> {{ loggedInUser.email }}</h3>
              </div>
            </div>
          </div>
        </div>
        <b-modal
          :active.sync="showModal"
          trap-focus
          aria-role="dialog"
          :destroy-on-hide="true"
          @close="closeModal"
        >
          <div class="card mx-auto">
            <div class="card-header p-1">
              <h3 class="subtitle">Update profile</h3>
            </div>
            <div class="card-content">
              <form @submit.prevent="updateProfile">
                <div v-if="imageUrl == null">
                  <b-upload 
                    v-model="file"
                    @input="displayPhoto"
                    drag-drop>
                    <section class="section">
                        <div class="content has-text-centered">
                            <p>
                                <b-icon
                                    icon="upload"
                                    size="is-large">
                                </b-icon>
                            </p>
                            <p>Drop your files here or click to upload</p>
                        </div>
                    </section>
                  </b-upload>
                </div>
                <div v-else>
                  <img :src="imageUrl" alt="Preview">
                </div>
                <button :disabled="!fileUploaded" class="button is-fullwidth is-primary mt-2" type="submit">Upload</button>
              </form>
            </div>
          </div>
        </b-modal>
      </div>
  </div>
</template>

<script>
import { EditIcon } from 'vue-feather-icons'
import { mapState, mapActions } from "vuex"

 export default {
   components: {
     EditIcon
   },
    data() {
        return {
            file: null,
            username: "",
            fileUploaded: false,
            showModal: false,
            imageUrl : null
        }
    },
    methods: {
      ...mapActions('user', ['updateUserProfile']),
      openModal() {
        if(this.showModal) {
          this.showModal = false
        } else {
          this.showModal = true
        }
      },
      updateProfile() {
        let data = {
          type: "photo",
          image : this.file,
        }

        this.updateUserProfile(data)
        this.showModal = false;

        this.file = null;
        this.username = "";
        this.fileUploaded = false;
        this.imageUrl = false;
        this.$buefy.toast.open({
          position: 'is-top-right',
          message: "We are uploading please wait",
          duration: 5000,
          type: 'is-info'
        })
      },
      displayPhoto(f) {
        if(f.size / (1024 * 1024) < 2) {
          this.fileUploaded = true
          this.imageUrl = URL.createObjectURL(f);
        } else {
          this.$buefy.toast.open({ type: 'is-warning', message: "You file exceeded 3mb" })
        }
      },
      closeModal() {
        this.imageUrl = null;
        this.file = null;
        this.fileUploaded = null;
        this.$buefy.toast.open("You did not upload the image...")
      },
      
    },
    computed: {
      ...mapState({
        loggedInUser: state => state.user.user
      })
    }
}
</script>

<style lang="scss" scoped>
  .card.w-100 {
    width: 100%;

    @media screen and (min-width: 520px) {
      width: 80%;
    }

    .profile-img {
      display: flex;
      border: solid #23d160;
      justify-content: center;
      border-radius: 50%;
      height: 90px;
      width: 90px;
      background: #F2F8FD;
     
      margin-right: 2em;

      img {
        border-radius: 50%;
        object-fit: cover;
      }
    }

    .mr-2 {
      margin-right: 1em;
    }
  }

  .card-content {
    h3 {
      margin-bottom: 10px;
    }
  }

  .w-full {
    width: 100% !important;
  }

  .my-a {
    margin: auto 0 !important;
  }

  .mx-auto  {
    margin: 0 auto;
  }
</style>