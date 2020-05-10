<template>
    <div>
        <Navbar/>
            <slot></slot>
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

</style>