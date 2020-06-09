<template>
  <div class="h-100 p-2 bg-light">
      <div class="container">
        <h2 class="title">Profile</h2>
        <p>View or change your profile information.</p>
        <div class="card w-100 mt-2">
          <div class="card-header p-1">
            <div class="w-full flex flex-row flex-wrap justify-between items-center">
              <p class="subtitle my-a">Brian</p>
              <b-button @click="openModal" type="is-danger"><span> <edit-icon size="1x" class="custom-class"></edit-icon> </span> Edit</b-button>
            </div>
          </div>
          <div class="card-content">
            <div class="flex flex-row flex-wrap">
              <div class="profile-img">
                <img src="https://avatars.dicebear.com/api/bottts/smile.svg" alt="Profile photo">
              </div>
              <div class="flex flex-column">
                <h3><span class="font-bold">Username</span>  Brian</h3>
                <h3><span class="font-bold">Email</span> brn@gmail.com</h3>
              </div>
            </div>
          </div>
        </div>
        <b-modal
          :active.sync="showModal"
          trap-focus
        >
          <div class="card mx-auto">
            <div class="card-header p-1">
              <h3 class="subtitle">Update profile</h3>
            </div>
            <div class="card-content">
              <form @submit.prevent="updateProfile">
                <b-field label="Username"
                  >
                  <b-input v-model="username" place maxlength="30" placeholder="Username"></b-input>
                </b-field>
                <b-field label="" class="file">
                  <b-upload v-model="file" accept="image/png, image/jpeg, image/jpg">
                      <a class="button is-primary">
                          <b-icon icon="upload"></b-icon>
                          <span>Click to upload</span>
                      </a>
                  </b-upload>
                  <span class="file-name" v-if="file">
                      {{ file.name }}
                  </span>
                </b-field>
                <button class="button is-fullwidth is-primary mr-2">Upload</button>
              </form>
            </div>
          </div>
        </b-modal>
      </div>
  </div>
</template>

<script>
import { EditIcon } from 'vue-feather-icons'

 export default {
   components: {
     EditIcon
   },
    data() {
        return {
            file: null,
            username: "",
            showModal: false
        }
    },
    methods: {
      openModal() {
        if(this.showModal) {
          this.showModal = false
        } else {
          this.showModal = true
        }
      },
      updateProfile() {
        let data = {
          file : this.file,
          username: this.username
        }

        console.log("date", data)
        this.file = null;
        this.username = "";
      }
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
      padding: 1em;
      margin-right: 2em;

      img {
        width: 80px;
        margin: auto;
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