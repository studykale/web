<template>
  <div>
      <div>
        <h2 class="title">
            Notifications
        </h2>
        <p>Get notified of your project here</p>
      </div>
      <div class="Notifications">
          <div v-if="notifications.length > 0">
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
                            {{ new Date(props.row.date).toLocaleDateString() }}
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
                <h2 >You don't have any notifications yet. You can still create a task <router-link to="/dashboard/projects">here</router-link></h2>

              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { notifications } from '../../../db'
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
    computed: {
        ...mapState({
            loggedInUser: state => state.user.user
        })
    },
    created() {
        this.$bind('notifications', notifications.doc(this.loggedInUser.userId))
    }
}
</script>

<style lang="scss" scoped>
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