<template>
  <div>
    <Navbar/>
    <section class="w-full flex hero flex-wrap flex-col-reverse md:flex-row">
      <div class="w-full md:w-1/2 text-white px-4 p-6 md:p-12 lg:p-20 lg:py-32 leading-snug">
        <div class="sm:text-center lg:text-left">
          <h2 class="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl font-display">
            Data to enrich your
            <br class="xl:hidden" />
            <span class="text-indigo-600">online business</span>
          </h2>
          <p class="mt-3 text-base text-gray-700 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
          </p>
          <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div class="rounded-md shadow">
              <router-link to="/login" class="w-full flex items-center justify-center px-8 py-3 border border-transparent rounded-sm shadow text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none  transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                Get started
              </router-link>
            </div>
            <div class="mt-3 sm:mt-0 sm:ml-3">
              <router-link to="/signup" class="w-full flex items-center justify-center px-8 py-3 border border-transparent rounded-sm shadow text-base leading-6 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none  focus:border-indigo-300 transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                Sign Up
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <figure class="w-full md:w-1/2 flex bg-center bg-no-repeat bg-cover aspect"></figure>
    </section>
    <section class="site-details ">
      <div class="py-12 bg-gray-900 site-details__inner md:py-20">
        <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 info">
          <div class="lg:text-center">
            <p class="text-base leading-6 text-indigo-600 font-semibold tracking-wide uppercase">Transactions</p>
            <h3 class="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-100 sm:text-4xl sm:leading-10 font-display">
              A better way to send money
            </h3>
            <p class="mt-4 max-w-2xl text-base leading-6 text-gray-400 lg:mx-auto">
              Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.
            </p>
          </div>
        </div>
        <div class="flex flex-wrap lg:mt-6">

        </div>
      </div>
    </section>
    <section class="md:py-5 lg:py-8">
      <div class="mt-10 container px-3">
        <ul class="md:grid md:grid-cols-2 md:col-gap-8 md:row-gap-10">
          <li>
            <div class="flex">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white feature-icon">
                  <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <h5 class="text-lg leading-6 font-medium text-gray-900">Competitive exchange rates</h5>
                <p class="mt-2 text-base leading-6 text-gray-500">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                </p>
              </div>
            </div>
          </li>
          <li class="mt-10 md:mt-0">
            <div class="flex">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white feature-icon">
                  <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <h5 class="text-lg leading-6 font-medium text-gray-900">No hidden fees</h5>
                <p class="mt-2 text-base leading-6 text-gray-500">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                </p>
              </div>
            </div>
          </li>
          <li class="mt-10 md:mt-0">
            <div class="flex">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white feature-icon">
                  <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <h5 class="text-lg leading-6 font-medium text-gray-900">Transfers are instant</h5>
                <p class="mt-2 text-base leading-6 text-gray-500">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                </p>
              </div>
            </div>
          </li>
          <li class="mt-10 md:mt-0">
            <div class="flex">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white feature-icon">
                  <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <h5 class="text-lg leading-6 font-medium text-gray-900">Mobile notifications</h5>
                <p class="mt-2 text-base leading-6 text-gray-500">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section>
      <div class="bg-gray-200 mt-5 flex justify-center">
        <div class="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-24 md:justify-between lg:px-8  lg:flex lg:items-center lg:justify-between">
          <h2 class="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 font-display">
            Ready to dive in?
            <br />
            <span class="text-indigo-600">Start your free trial today.</span>
          </h2>
          <div class="mt-8">
            <div class="inline-flex rounded-md shadow">
              <router-link to="login" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-sm text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                Get started
              </router-link>
            </div>
            <div class="ml-3 inline-flex rounded-md shadow">
              <router-link to="signup" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-sm text-indigo-600 bg-white hover:text-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                Learn more
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="mt-5">
      <div class="container sm:px-3 md:px-5 lg:px-5 lg:py-8">
        <div class="text-center my-5 leading">
          <h2 class="font-display text-indigo-600 text-4xl font-extrabold">
            Testimonials
          </h2>
        </div>
        <ul>
          <li>
            <div class="flex flex-col">
              <h2 class="leading-loose text-xl font-bold text-purple-700 text-center font-display">Workation</h2>
              <blockquote class="text-gray-700 mx-auto text-center md:w-50 lg:w-1/2 block">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, fugiat. Omnis facere minima iste possimus obcaecati voluptas reiciendis accusamus cum.
              </blockquote>
              <div class="flex flex-row justify-center my-5">
                <div class="h-12 w-12 mr-3 rounded-full bg-gray-500 md:h-11 md:w-11">
                </div>
                <div class="details flex flex-col leading-tight">
                  <h4 class="font-semibold text-purple-900">Jon Courson</h4>
                  <p class="font-normal">Student, Brooklyn</p>
                </div>
              </div>
            </div>
          </li>
          <li>
          
          </li>
        </ul>
      </div>
    </section>
    <Footer/>
  </div>
</template>

<script>
import Footer from "@/components/custom/Footer.vue";
import Navbar from "@/components/custom/Navbar.vue";

export default {
  name: "Home",
  components: {
    Footer,
    Navbar
  }
};
</script>

<style lang="scss" scoped>
  .hero figure {
    background: url('../assets/images/brown.jpg') no-repeat;
    object-fit: contain;
    background-position: center;
    background-size: cover;
  }

  .aspect:after {
    content: "";
    padding-bottom: 55%;
    display: block;
  }

  .site-details {
    
    &__inner {
      clip-path: polygon(0 6%, 100% 0, 100% 95%, 0% 100%);
      position: relative;

      @media screen and (min-width: 678px) {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      }


      .info {
            z-index: 999;
            position: inherit;
      }

      &::before {
        position: absolute;
        content: "";
        height: 100%;
        width: 100%;
        opacity: .125;
        top: 0;
        right: 0;
        background-color: transparent;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='88' viewBox='0 0 88 88'%3E%3Cg fill='%2345d09e' fill-opacity='0.61'%3E%3Cpath fill-rule='evenodd' d='M29.42 29.41c.36-.36.58-.85.58-1.4V0h-4v26H0v4h28c.55 0 1.05-.22 1.41-.58h.01zm0 29.18c.36.36.58.86.58 1.4V88h-4V62H0v-4h28c.56 0 1.05.22 1.41.58zm29.16 0c-.36.36-.58.85-.58 1.4V88h4V62h26v-4H60c-.55 0-1.05.22-1.41.58h-.01zM62 26V0h-4v28c0 .55.22 1.05.58 1.41.37.37.86.59 1.41.59H88v-4H62zM18 36c0-1.1.9-2 2-2h10a2 2 0 1 1 0 4H20a2 2 0 0 1-2-2zm0 16c0-1.1.9-2 2-2h10a2 2 0 1 1 0 4H20a2 2 0 0 1-2-2zm16-26a2 2 0 0 1 2-2 2 2 0 0 1 2 2v4a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-4zm16 0a2 2 0 0 1 2-2 2 2 0 0 1 2 2v4a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-4zM34 58a2 2 0 0 1 2-2 2 2 0 0 1 2 2v4a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-4zm16 0a2 2 0 0 1 2-2 2 2 0 0 1 2 2v4a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-4zM34 78a2 2 0 0 1 2-2 2 2 0 0 1 2 2v6a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-6zm16 0a2 2 0 0 1 2-2 2 2 0 0 1 2 2v6a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-6zM34 4a2 2 0 0 1 2-2 2 2 0 0 1 2 2v6a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4zm16 0a2 2 0 0 1 2-2 2 2 0 0 1 2 2v6a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4zm-8 82a2 2 0 1 1 4 0v2h-4v-2zm0-68a2 2 0 1 1 4 0v10a2 2 0 1 1-4 0V18zM66 4a2 2 0 1 1 4 0v8a2 2 0 1 1-4 0V4zm0 72a2 2 0 1 1 4 0v8a2 2 0 1 1-4 0v-8zm-48 0a2 2 0 1 1 4 0v8a2 2 0 1 1-4 0v-8zm0-72a2 2 0 1 1 4 0v8a2 2 0 1 1-4 0V4zm24-4h4v2a2 2 0 1 1-4 0V0zm0 60a2 2 0 1 1 4 0v10a2 2 0 1 1-4 0V60zm14-24c0-1.1.9-2 2-2h10a2 2 0 1 1 0 4H58a2 2 0 0 1-2-2zm0 16c0-1.1.9-2 2-2h10a2 2 0 1 1 0 4H58a2 2 0 0 1-2-2zm-28-6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 26a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm16 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM36 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm16 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-8-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 68a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm16-34a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm16-12a2 2 0 1 0 0 4 6 6 0 1 1 0 12 2 2 0 1 0 0 4 10 10 0 1 0 0-20zm-64 0a2 2 0 1 1 0 4 6 6 0 1 0 0 12 2 2 0 1 1 0 4 10 10 0 1 1 0-20zm56-12a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 48a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-48 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0-48a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm24 32a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-4a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm36-36a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-4a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM10 44c0-1.1.9-2 2-2h8a2 2 0 1 1 0 4h-8a2 2 0 0 1-2-2zm56 0c0-1.1.9-2 2-2h8a2 2 0 1 1 0 4h-8a2 2 0 0 1-2-2zm8 24c0-1.1.9-2 2-2h8a2 2 0 1 1 0 4h-8a2 2 0 0 1-2-2zM3 68c0-1.1.9-2 2-2h8a2 2 0 1 1 0 4H5a2 2 0 0 1-2-2zm0-48c0-1.1.9-2 2-2h8a2 2 0 1 1 0 4H5a2 2 0 0 1-2-2zm71 0c0-1.1.9-2 2-2h8a2 2 0 1 1 0 4h-8a2 2 0 0 1-2-2zm6 66a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-4a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM8 86a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-4a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0-68A6 6 0 1 1 8 2a6 6 0 0 1 0 12zm0-4a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm36 36a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'/%3E%3C/g%3E%3C/svg%3E");
      }
    }
  }

  .feature-icon {
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    border-radius: 4px;
  }
</style>
