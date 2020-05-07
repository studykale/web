<template>
  <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
      <p class="text-center text-3xl font-display">Password Change.</p>
      <form class="flex flex-col pt-3 md:pt-8" onsubmit="event.preventDefault();">
          <div class="flex flex-col pt-4">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="email">
                    Email
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-sm py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="email">
              
          </div>

          <input type="submit" value="Send" class="bg-indigo-600 text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8 rounded-sm">
      </form>
      <div class="text-center mt-2">
          <p>We will send an email with details.</p>
      </div>
      <div class="text-center pt-12 pb-12">
          <p>Go back to <router-link to="login" class="underline font-semibold">SignIn.</router-link></p>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>