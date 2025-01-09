<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'JtAutoHeightWrapper',
  inheritAttrs: true,
})
</script>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useResizeDetector } from '@jtis/vue-composables'
import { throttle } from '@jtis/optimize'

const props = withDefaults(
  defineProps<{
    minHeight?: number
    throttleMs?: number
  }>(),
  {
    minHeight: 300,
    throttleMs: 500,
  }
)

const height = ref(props.minHeight)
const throttleMs = ref(props.throttleMs)

const setHeight = () => {
  const h = el.value?.clientHeight ?? 0
  height.value = h < props.minHeight ? props.minHeight : h
}

const resizeCB = throttle(() => {
  setHeight()
}, throttleMs.value)

const { el } = useResizeDetector(resizeCB)

onMounted(() => {
  nextTick(() => {
    setHeight()
  })
})
</script>

<template>
  <div ref="el" class="jt-auto-height-wrapper">
    <slot :height="height" />
  </div>
</template>

<style scoped>
.jt-auto-height-wrapper {
  height: 100%;
}
</style>
