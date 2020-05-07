<template>
    <div class="bg-white  h-screen">

        <div class="w-full flex flex-wrap">

            <!-- Login Section -->
            <div class="w-full md:w-1/2 flex flex-col">

                <div class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
                    <router-link to="/" class="bg-black text-white font-bold text-xl p-4">Logo</router-link>
                </div>

                <div>
                    <SignInForm/>
                </div>
            </div>

            <!-- Image Section -->
            <div class="w-1/2 shadow-2xl">
                <img class="object-cover w-full h-screen hidden md:block" src="https://source.unsplash.com/IXUM4cJynP0">
            </div>
        </div>
    </div>
</template>

<script>
import SignInForm from "@/components/SignInForm.vue";

export default {
    components: {
        SignInForm
    }
}
</script>

<style>

</style>