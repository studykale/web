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

.flex {
  display: flex;
}

.justify-around {
  justify-content: space-between;
}

.flex-wrap {
  flex-wrap: wrap;
}

.flex-row {
  flex-direction: row;
}
</style>
