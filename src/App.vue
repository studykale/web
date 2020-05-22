<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {  
  }
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

#app {
  font-family: "Muli", sans-serif;
}

.bg-light {
        background-color: #F2F8FD;
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
      grid-template-columns: 1fr;
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

.flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}


.justify-around {
  justify-content: space-around;
}

.justify-between {
  justify-content: space-between;
}

.justify-center {
  justify-content: center;
}

.justify-around {
  justify-content: space-around;
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

.flex-row {
  flex-direction: row;
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

.mb-3 {
  margin-bottom: 1.3em;
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

.h-100 {
  min-height: 100vh;
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
</style>
