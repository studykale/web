<template>
  <Layout>
      <div class="container">
          <b-steps v-model="activeStep">
            <template v-for="(step, index) in steps">
                <b-step-item
                    v-if="step.displayed"
                    :key="index"
                    :label="step.label">
                    {{ step.content }}
                </b-step-item>
            </template>
        </b-steps>
      </div>
  </Layout>
</template>

<script>
import Layout from "./Default.vue";

export default {
    components: {
        Layout
    },
    data() {
        return {
            activeStep: 0,
        }
    },
    computed: {
        baseSteps() {
                return [
                    {
                        label: 'Creating a project',
                        content: 'Pictures: Lorem ipsum dolor sit amet.',
                        displayed: true,
                    },
                    {
                        label: 'Select completion date',
                        content: 'Music: Lorem ipsum dolor sit amet.',
                        displayed: true,
                    },
                    {
                        label: 'Make Payment',
                        content: 'Videos: Lorem ipsum dolor sit amet.',
                        displayed: true,
                    }
                ]
            },
            steps() {
                const steps = [...this.baseSteps]
                return steps
            },
    }
}
</script>

<style>

</style>