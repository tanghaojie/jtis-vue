<script setup lang="ts">
import { ref, reactive, onMounted, watchEffect, inject, withDefaults, computed } from 'vue'
import { useClipboard } from '@/clipboard'
import { useResizeDetector } from '@/dom'

const { isSupported, copy, copied, clipboard, rwPermission, read } = useClipboard(true)
const { el } = useResizeDetector(function () {
  console.log('resize')
})
</script>

<template>
  <div ref="el" class="main">
    <div>Clipboard Support: {{ isSupported }}</div>
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
