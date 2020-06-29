<template>
  <div>
      <div class="m-2">
        <h2 class="title">
            Notifications
        </h2>
        <p>Get notified of projects and updates here</p>
      </div>
      <div class="Notifications">
          <div v-if="notifications.length > 0">
            <b-button class="mt-2 mb-2" :type="{'is-success': checkedNotifications.length > 0, 'is-light': checkedNotifications.length <= 0 }" @click="markSelected">Mark as read</b-button>
            <b-table
                :data="notifications"
                ref="table"
                paginated
                per-page="5"
                :checked-rows.sync="checkedNotifications"
                detailed
                striped
                bordered
                hoverable
                checkable
                detail-key="id"
                aria-next-label="Next page"
                aria-previous-label="Previous page"
                aria-page-label="Page"
                aria-current-label="Current page">

                <template slot-scope="props">
                    <b-table-column field="name" label="Name" sortable>
                        <template>
                            <a @click="toggle(props.row)">
                                {{ props.row.name }}
                            </a>
                        </template>
                    </b-table-column>

                    <b-table-column field="date" label="Date" sortable centered>
                        <span class="tag is-success">
                            {{ props.row.date.toDate() | moment('from', 'now') }}
                        </span>
                    </b-table-column>

                    <b-table-column field="read" label="Read">
                        <span>
                            <p>{{ props.row.read }}</p>
                        </span>
                    </b-table-column>
                </template>

                <template slot="detail" slot-scope="props">
                    <p>{{ props.row.description }}</p>
                </template>

                <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>
                            <b-icon
                                icon="emoticon-sad"
                                size="is-large">
                            </b-icon>
                        </p>
                        <p>Nothing here.</p>
                    </div>
                </section>
                </template>
            </b-table>
          </div>
          <div v-else>
              <div class="flex flex-column justify-center items-center">
                  <div class="no-notifications">
                      <img src="../../../assets/illustrations/results.svg" alt="">
                  </div>
                  <div class="dropdown-divider w-50"></div>
                <h2 >You don't have any notifications yet. You can still create a task</h2>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { notifications, currentUser } from '../../../db'
import { mapState } from "vuex"

export default {
    data() {
        return {
            notifications: [],
            checkedNotifications: []
        }
    },
    firestore: {
        notifications: notifications
    },
    methods: {
        markSelected() {
            if(this.checkedNotifications.length <= 0) {
                this.$buefy.toast.open({
                    message: "Sorry but you need to select at least one first"
                })
            }
            this.checkedNotifications.map(note => {
                notifications.doc(note.id).set({
                    read: true
                }, { merge: true })
            })
            this.$buefy.toast.open({
                message: "Success.."
            })
        }
    },
    computed: {
        ...mapState({
            loggedInUser: state => state.user.user
        })
    },
    created() {
        this.$bind('notifications', notifications.where('user', '==', currentUser.uid)).then(note => {
            let count = false;
            if(note) {
                note.map(n => {
                    if(!n.read) {
                        count = true
                    }
                })
                this.$root.$emit('notCount', count)
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.m-2 {
    margin: 1em;
}
 .Notications {
        margin-top: 1em;
    }

    .no-notifications {
        margin-top: 2em;
        img {
            height: 300px;
            width: 300px;
        }
    }
</style>