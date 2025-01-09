<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'JtIcon',
  inheritAttrs: false,
})
</script>
<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties, ExtractPropTypes } from 'vue'
import { parseUnit } from '@jtis/utils'

const props = withDefaults(
  defineProps<{
    size?: number
    color?: string
  }>(),
  {
    size: 16,
  }
)

const style = computed<CSSProperties>(() => {
  if (!props.size) return {}
  return {
    fontSize: parseUnit(props.size),
    '--color': props.color,
  }
})
</script>

<template>
  <i class="jt-icon" :style="style" v-bind="$attrs">
    <slot></slot>
  </i>
</template>
