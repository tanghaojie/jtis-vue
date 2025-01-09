<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { JtAutoHeightWrapper, JtWordCloudTunnel } from '../src/index'

const el = ref<InstanceType<typeof JtWordCloudTunnel>>()

let id = 0
onMounted(() => {
  const timer = window.setInterval(() => {
    el.value?.append({
      id: (id++).toString(),
      text: 'text',
    })
  }, 1000)
})
</script>

<template>
  <div ref="el" class="main">
    <JtAutoHeightWrapper v-slot="{ height }">
      <span> full-height: {{ height }}px</span>
      <JtWordCloudTunnel
        ref="el"
        :color="['#ffd077', '#3bc4c7', '#3a9eea', '#ff4e69', '#461e47']"
        :axisCount="6"
        :randomAngleRangePerAxis="60"
        :randomAxis="false"
        :scaleStep="0.15"
        :animation-duration="1000"
      ></JtWordCloudTunnel>
    </JtAutoHeightWrapper>
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
