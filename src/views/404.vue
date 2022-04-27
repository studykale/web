<template>
  <div class="h-screen flex justify-center content-center 404 container px-3">
      <div class="my-10">
          <div class="flex justify-center mb-5">
              <img class="h-48 w-48" src="../assets/images/404.icon.svg" alt="404 Icon">
          </div>
          <div class="p-3">
              <h2 class="text-left text-3xl font-bold text-gray-800 leading-tight font-display">
                  We are sorry something happenend on our end...
              </h2>
                <p class="text-gray-500 ">
                    We might have encountered some headwind. <span class="ml-2 inline-block"><img src="../assets/images/wind.svg" class="h-5" alt="Wind"></span>
                </p>
          </div>
          <div class="mt-3 p-0 leading-9 p-3">
              <h5 class="text-indigo-600 font-bold text-lg font-display">What could have caused this?.</h5>
              <ul class="leading-normal pl-4 text-sm">
                <li class="mb-3sm">You tried accessing the dashboard without signing in</li>
                <li class="mb-3sm">You entered a url that does not exist</li>
                <li>Your internet might be down. Please check your internet connection..</li>
            </ul>
        </div> 
        <div class="flex justify-start my-5">
            <router-link class="px-5 py-3 border border-indigo-300 text-indigo-800 shadow-sm rounded-sm" to="/">Go Home</router-link>
        </div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>