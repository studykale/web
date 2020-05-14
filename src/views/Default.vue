<template>
    <div class="main">
        <Navbar type="is-dark"/>
            <div class="wrapper">
                <slot></slot>
            </div>
        <Footer/>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default {
    name: 'Layout',
    components: {
        Navbar,
        Footer
    }
}
</script>

<style lang="scss" scoped>
    .wrapper {
        padding: 2em 1em;
        min-height: calc(100vh - (15vh + 8vh));
    }
</style>