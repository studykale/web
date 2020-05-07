<template>
  <div class="my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
    <p class="text-center text-3xl my-4 font-display">Sign Up.</p>
    <form class="w-full max-w-lg">
      <div class="flex flex-wrap -mx-3 mb-3">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
            Username
          </label>
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-sm py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="text">
          <p class="text-gray-600 text-xs italic">Some tips - as long as needed</p>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-3">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
            E-mail
          </label>
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-sm py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="email">
          <p class="text-gray-600 text-xs italic">Some tips - as long as needed</p>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-3">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
            Password
          </label>
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-sm py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="password">
          <p class="text-gray-600 text-xs italic">Some tips - as long as needed</p>
        </div>
      </div>
      <div class="md:flex md:items-center">
        <div class="w-full">
          <button class="shadow bg-indigo-600 hover:bg-teal-400 w-full focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-sm" type="button">
            Sign Up
          </button>
        </div>
        <div class="md:w-2/3"></div>
      </div>
    </form>
    <div class="text-center pt-2">
      <p>By Signing up you agree to our terms and conditions</p>
    </div>
    <div class="text-center pt-12 pb-12">
          <p>Already have an account? <router-link to="login" class="underline font-semibold">Sign In.</router-link></p>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>