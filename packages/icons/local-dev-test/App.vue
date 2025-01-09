<script setup lang="ts">
import { JtIcon, AdaptAuto } from '../src/index'
</script>

<template>
  <div ref="el" class="main">
    <JtIcon :color="'red'" :size="36">
      <AdaptAuto />
    </JtIcon>
  </div>
</template>

<style scoped>
.main {
  width: 100%;
  height: 100%;
}
</style>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  width: 100vw;
  height: 100vh;
}
</style>
