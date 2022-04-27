<template >
<div>
  <b-table
            :data="data"
            ref="table"
            paginated
            per-page="5"
            detailed
            detail-key="id"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page">

            <template slot-scope="props">
                <b-table-column field="id" label="ID" width="40" numeric>
                    {{ props.row.id }}
                </b-table-column>

                <b-table-column field="user.first_name" label="First Name" sortable>
                    <template v-if="showDetailIcon">
                        {{ props.row.user.first_name }}
                    </template>
                    <template v-else>
                        <a @click="toggle(props.row)">
                            {{ props.row.user.first_name }}
                        </a>
                    </template>
                </b-table-column>

                <b-table-column field="user.last_name" label="Last Name" sortable>
                    {{ props.row.user.last_name }}
                </b-table-column>

                <b-table-column field="date" label="Date" sortable centered>
                    <span class="tag is-success">
                        {{ new Date(props.row.date).toLocaleDateString() }}
                    </span>
                </b-table-column>

                <b-table-column label="Gender">
                    <span>
                        <b-icon pack="fas"
                            :icon="props.row.gender === 'Male' ? 'mars' : 'venus'">
                        </b-icon>
                        {{ props.row.gender }}
                    </span>
                </b-table-column>
            </template>

            <template slot="detail" slot-scope="props">
                <article class="media">
                    <figure class="media-left">
                        <p class="image is-64x64">
                            <img src="/static/img/placeholder-128x128.png">
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <strong>{{ props.row.user.first_name }} {{ props.row.user.last_name }}</strong>
                                <small>@{{ props.row.user.first_name }}</small>
                                <small>31m</small>
                                <br>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Proin ornare magna eros, eu pellentesque tortor vestibulum ut.
                                Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                            </p>
                        </div>
                    </div>
                </article>
            </template>
        </b-table>
</div>

</template>

<script>
import { notifications } from '../db'

export default {
    data() {
        return {
            notifications: []
        }
    },
    created() {
        this.$bind('notifications', notifications)
    }
}
</script>

<style lang="scss" scoped>
    .notification-card {
        max-width: 350px;
        padding: 1em;
        background: white;
        border-radius: 4px;
        margin-top: 1em;

        .content p {
            font-size: .85rem;
        }

        .actions {
            margin-top: 1.5em;
        }
        .actions  button {
            border: none;
            padding: .5em;
            margin-right: 10px;
            border-radius: 2px;
            color: white;

            &.info {
                background: #1EC9E8;
            }

            &.danger {
                background: #FF005C;
            }
        }
    }
</style>