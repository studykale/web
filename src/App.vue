<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  // import { firebase } from "./db";

  export default {  
      name: 'App',
      metaInfo() {  
        return {
          // if no subcomponents specify a metaInfo.title, this title will be used
          title: 'Pro Essay service',
          // all titles will be injected into this template
          link: [
            {
              rel: 'sitemap',
              type: 'application/xml',
              title: 'Sitemap',
              href: 'https://studykale.com/sitemap.xml'
            }
          ],
          meta: [
            {
              name: 'title',
              content: 'Pro Essay service'
            },
            {
              name: 'msvalidate.01',
              content: '492FD9C02F7818C9C54FC658849FA77B'
            },
            {
              vmid: 'description',
              name: 'description',
              content: "Studykale offers professional essay service that's affordable for anyone. You now have more time to be creative. We are here to help with that!"
            },
            {
              vmid: 'keywords',
              name: 'keywords',
              content: "Essay service, Pro essay service, affordable, fast"
            },
          ]
      }
    },
    
  }
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

#app {
  font-family: "Muli", sans-serif;
}

.card {
  box-shadow: 0px 4px 4px 0px rgba(222, 222, 222, 0.25) !important;
}

.p-relative {
  position: relative;
}

.d-inline {
  display: inline-block;
}


.bg-light {
        background-color: transparent;
  }

  .p-1 {
    padding: 1em;
  }

 .inbox-grid {
    height: 100vh;
    display: grid;
    grid-template-columns:  22% 20% 1fr;
    grid-column-gap: 5px;
    grid-row-gap: 20px;
    justify-items: stretch;
    align-items: stretch;

    @media screen and (max-width: 768px){
      display: grid;
      grid-template-columns: 0.9fr 1.6fr 1.3fr 0.9fr;
      grid-template-rows: repeat(2, 0.3fr) 2.4fr;
      gap: 1em 1px;
      grid-template-areas: "categories-and\ from categories-and\ from categories-and\ from categories-and\ from" "people people people people" "messages messages messages messages";
    }
 }

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.text-center {
  text-align: center;
}


.text-xs {
  font-size: .75rem;
}

.text-sm {
  font-size: .875rem;
}

.text-base {
  font-size: 1rem;
}

.text-lg {
  font-size: 1.175rem;
}

.text-xl {
  font-size: 1.25rem;
}

.text-2xl {
  font-size: 1.5rem
}

.text-3xl {
  font-size: 1.875rem;
}

.text-4xl {
  font-size: 2.25rem;
}

.font-bold {
  font-weight: 700;
}

.font-extrabold {
  font-weight: 800;
}

.font-black {
  font-weight: 900;
}

.d-block {
  display: block;
}


.flex-column {
  flex-direction: column;
}


.items-center {
  align-items: center;
}

.content-center {
  align-content: center;
}

.flex-wrap {
  flex-wrap: wrap;
}


.leading-tight {
  line-height: 1.25; 
}

.leading-snug {
  line-height: 1.375;
}

.leading-normal {
  line-height: 1.5;
}

.leading-loose {
  line-height: 2;
}

.mt-2 {
  margin-top: 1.2em;
}


.mb-2 {
  margin-bottom: 1.4em;
}

.p-2 {
  padding: 1.4em;
}

.divider-auto {
  margin: 1em auto;
  height: 4px;
  width: 60%;
  background: #1111;
  border-radius: 2px;
}

.divider-left {
  margin: 1em 0;

  height: 4px;
  width: 30%;
  background: #1111;
  border-radius: 2px;
}

.mx-auto {
  margin: 0 auto;
}

.m-auto {
  margin: auto !important;
}

.mb-1 {
  margin-bottom: 1em;
}

.mb-3 {
  margin-bottom: 1.3em;
}


.mb-3sm {
  margin-bottom: 0.75rem;
}


.mt-3 {
  margin-top: 3em;
}

.my-5 {
  margin: 2em 0;
}

.my-3 {
  margin: 1.3em 0;
}

.text-purple {
    color: rebeccapurple !important;
  }

  .text-red {
    color: #FF005C !important;
  }

  .text-warning {
    color: #ffc11e;
  }

  .text-green {
    color: #00DC7D !important;
  }

.h-100 {
  min-height: 100vh;
  overflow: auto;
}

.py-5 {
  padding: 4em 0;
}

.w-500 {
  width: 500px;
}

.flex.reverse {
  flex-direction: row-reverse;
}

.w-90 {
  width: 90% !important;
}

.max-content {
  width: max-content;
}
.m-2 {
  margin: 1.2em;
}

.mr-2 {
  margin-right: 1.2em;
}

.drop .card {
  box-shadow: -1px 4px 16px 2px rgba(120, 121, 120, 0.26);
}

.no-drop .card {
  box-shadow: none !important;
}

.no-border .card {
  border: none !important;
}

.text-white {
  color: white !important;
}

.py-2 {
  padding: 1.2em 0;
}

.w-auto {
  width: auto !important;
}

.ml-3 {
  margin-left: 1.5em;
}

.ml-2 {
  margin-left: 0.25em;
}

.leading-9 {
 line-height: 2.25rem;
}

.text-gray-100 {
  color: #a0aec0;
}

.pl-4 {
  padding-left: 1rem;
}

.h-5 {
  height: 1.5em;
}

.px-3 {
  padding-right: 0.75rem;
  padding-left: 0.75rem;
}

.my-10 {
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
}

.mb-5 {
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
}

.h-48 {
  height: 12rem;
}

.w-48 {
  width: 12rem;
}


mx-a {
  margin: 0 auto;
}
.my-a {
  margin: auto 0;
}

// End display styles



// Text styling
.font-bold {
  font-weight: bold;
}



// end text styling


  .flex {
    display: flex;
  }

  .flex-row {
    flex-flow: row wrap;
  }

  .flex-row_reverse {
    flex-direction: row-reverse;
  }

  .flex-column {
    flex-direction: column;
  }

  .justify-around {
    justify-content: space-around;
  }

  .justify-start {
    justify-content: flex-start;
  }

  .justify-even {
    justify-content: space-evenly;
  }

  .justify-between {
    justify-content: space-between;
  }

  .justify-center {
    justify-content: center;
  }
  
  .justify-end {
    justify-content: flex-end;
  }

  .container {
    width: 90%;

    @media screen and (max-width: 640px) {
      max-width: calc(640px - 20vw);
    }

    @media screen and (max-width: 768px) {
      max-width: calc(768px - 20vw);
    }

    @media screen and (max-width: 1024px) {
      max-width: calc(1024px - 20vw);
    }
  }

  // grid
  .grid {
    display: grid;
    grid-gap: 10px;
  }


  // Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #761CEA;
$primary-invert: findColorInvert($primary);
$twitter: #4099FF;
$twitter-invert: findColorInvert($twitter);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert),
    "twitter": ($twitter, $twitter-invert)
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

</style>
