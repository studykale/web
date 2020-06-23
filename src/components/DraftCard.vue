<template>
  <div class="draft-card">
    <h3>{{ paperType }}</h3>
    <p>{{ pages }} pages</p>
    <small><b>Deadline</b> {{ convertToDate(deadline.seconds) }}</small>
    <b-button type="is-primary" size="is-small" class="mt-2">Update</b-button>
  </div> 
</template>

<script>
export default {
    props: ['paperType', 'pages', 'deadline'],
    methods: {
        convertToDate(d) {
            let date = new Date(null);
            date.setSeconds(d);
            return date.toDateString()
        }
    }
}
</script>

<style lang="scss" scoped>
    .draft-card {
        padding: .25em;
        border-radius: 2px;
        box-shadow: 0 4px 9px rgba(0, 0, 0, .15);
        width: 300px;
        border-left: 3px purple solid;
        position: relative;
        display: flex;
        flex-direction: column;
        margin-bottom: 1em;
        margin-right: 14px;
        background-color: white;
    }

    h3, p, small {
        margin: .25em;
        text-transform: capitalize;
    }

    p {
        margin-bottom: 14px;
        color: gray;
    }
</style>