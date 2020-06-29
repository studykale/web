<template>
  <div class="p-2">
    <h2 class="title">Reviews</h2>
    <p class="my-1">Please find client reviews here...</p>
    <div class="card w-100">
        <div class="card-content p-2">
            <b-table 
            :data="reviews"
            detailed
            striped
            hoverable
            detail-key="id"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page"
            >
                <template slot-scope="props">
                    <b-table-column field="name" label="Name" sortable>
                        <template>
                            <a class="text-green" @click="toggle(props.row)">
                                {{ props.row.name }}
                            </a>
                        </template>
                    </b-table-column>
                    <b-table-column field="rate" label="Rating" sortable>
                        <template>
                            <p>

                                {{ props.row.rate }}
                            </p>
                        </template>
                    </b-table-column>
                </template>
                <template slot="detail" slot-scope="props">
                    <p>{{ props.row.message }}</p>
                </template>
            </b-table>
        </div>
    </div>
  </div>
</template>

<script>
import { reviews } from '../../../../db'
export default {
    data() {
        return {
            reviews: []
        }
    },
    created() {
        this.$bind('reviews', reviews).then(r => {
            console.log("re", r)
        })
    }
}
</script>

<style>
 .card.w-100 {
     width: 100%;
 }

 .my-1 {
     margin: 1em 0;
 }
</style>